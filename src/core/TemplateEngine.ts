import { TemplateWarning } from './TemplateWarning';
import { ParsedTemplate } from './ParsedTemplate';

export class TemplateEngine {
	constructor(
		private readonly templateText: string,
		private readonly variables: Map<string, string>
	) {}

	parse(): ParsedTemplate {
		if (this.variables == null) {
			return this.templateWithWarningsAboutNonDefinedVariables();
		}

		const parsedTemplate = this.templateWithReplacedVariables();

		return this.addWarningsAboutNonReplacedVariables(parsedTemplate);
	}

	private templateWithWarningsAboutNonDefinedVariables() {
		return ParsedTemplate.create(this.templateText, [new TemplateWarning('Variables is not defined')]);
	}

	private templateWithReplacedVariables() {
		let parsedText = this.templateText;
		const warnings: TemplateWarning[] = [];

		this.variables.forEach((value, key) => {
			const variable = this.variableTemplate(key);
			if (!parsedText.includes(variable)) {
				warnings.push(new TemplateWarning(`Variable ${key} not found`));
			}
			parsedText = parsedText.replace(variable, value);
		});

		return ParsedTemplate.create(parsedText, warnings);
	}

	private variableTemplate(key: string) {
		return `\$\{${key}\}`;
	}

	private addWarningsAboutNonReplacedVariables(parsedTemplate: ParsedTemplate) {
		const nonReplacedVariablesRegex = this.nonReplacedVariableTemplate();

		const matches = parsedTemplate.text.match(nonReplacedVariablesRegex);
		if (!matches) {
			return parsedTemplate;
		}

		const warnings: TemplateWarning[] = [];

		matches.forEach((match) => {
			const variableName = match.substring(2, match.length - 1);
			warnings.push(new TemplateWarning(`Variable ${variableName} could not be replaced`));
		});

		return parsedTemplate.addWarnings(warnings);
	}

	private nonReplacedVariableTemplate() {
		return /\$\{[a-zA-Z0-9]+\}/g;
	}
}
