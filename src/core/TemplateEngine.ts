import { TemplateWarning } from './TemplateWarning';
import { ParsedTemplate } from './ParsedTemplate';

export class TemplateEngine {
	constructor(
		private readonly templateText: string,
		private readonly variables: Map<string, string>
	) {}

	parseNew(): ParsedTemplate {
		let parsedText = this.templateText;
		const warnings: TemplateWarning[] = [];
		if (this.variables == null) {
			warnings.push(new TemplateWarning('Variables is not defined'));
			return ParsedTemplate.create(parsedText, warnings);
		}

		this.variables.forEach((value, key) => {
			const variable = `\$\{${key}\}`;
			if (!parsedText.includes(variable)) {
				warnings.push(new TemplateWarning(`Variable ${key} not found`));
			}
			parsedText = parsedText.replace(variable, value);
		});

		const parsedTemplate = ParsedTemplate.create(parsedText, warnings);

		return this.addWarningsAboutNonReplacedVariables(parsedTemplate);
	}

	private addWarningsAboutNonReplacedVariables(parsedTemplate: ParsedTemplate) {
		const nonReplacedVariablesRegex = /\$\{[a-zA-Z0-9]+\}/g;

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
}
