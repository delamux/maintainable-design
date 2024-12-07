/*
'This is a template with zero variables' -> 'This is a template with zero variables'
'This is a template with a ${variable}', {variable: 'foo'} -> ''This is a template with a foo''
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'}
    -> 'This is a template with a foo and bar'

Edge cases:
- Variables not being found in the template
- Non replaced variables
- Null text & null dictionary
*/

class TemplateEngine {
	constructor(
		private readonly templateText: string,
		private readonly variables: Map<string, string>
	) {}
	parseNew(): ParsedTemplate {
		let parsedText = this.templateText;
		const warnings: TemplateWarning[] = [];
		this.variables.forEach((value, key) => {
			const variable = `\$\{${key}\}`;
			if (!parsedText.includes(variable)) {
				warnings.push(new TemplateWarning(`Variable ${key} not found`));
			}
			parsedText = parsedText.replace(variable, value);
		});

		const parsedTemplate = new ParsedTemplate(parsedText, warnings);
		const nonReplacedVariablesRegex = /\$\{[a-zA-Z0-9]+\}/g;

		const matches = parsedTemplate.text.match(nonReplacedVariablesRegex);
		if (!matches) {
			return parsedTemplate;
		}

		const nonReplacedWarnings: TemplateWarning[] = [];

		matches.forEach((match) => {
			const variableName = match.substring(2, match.length - 1);
			nonReplacedWarnings.push(new TemplateWarning(`Variable ${variableName} could not be replaced`));
		});

		return new ParsedTemplate(parsedTemplate.text, parsedTemplate.warnings.concat(nonReplacedWarnings));
	}
}

class TemplateWarning {
	constructor(readonly message: string) {}
}

class ParsedTemplate {
	constructor(
		readonly text: string,
		readonly warnings: ReadonlyArray<TemplateWarning>
	) {}

	containsWarnings(): boolean {
		return this.warnings.length > 0;
	}
}

describe('The Template Engine', () => {
	it('parses template without data', () => {
		const templateText = 'This is a template with zero variables';
		const variables = new Map<string, string>();
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew().text;
		expect(parsedTemplate).toBe('This is a template with zero variables');
	});

	it('parsed text with one variable', () => {
		const templateText = 'This is a template with a ${variable}';
		const variables = new Map<string, string>();
		variables.set('variable', 'foo');
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew().text;
		expect(parsedTemplate).toBe('This is a template with a foo');
	});

	it('parsed text with multiple variables', () => {
		const templateText = 'This is a template with a ${variable} and ${anotherVariable}';
		const variables = new Map<string, string>();
		variables.set('variable', 'foo');
		variables.set('anotherVariable', 'bar');
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew().text;
		expect(parsedTemplate).toBe('This is a template with a foo and bar');
	});

	it('Parsed template with variables not being found', () => {
		const templateText = '${user}';
		const variables = new Map<string, string>();
		variables.set('user', 'john');
		variables.set('age', '35');
		const aDate = new Date().toString();
		variables.set('date', aDate);
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew();
		expect(parsedTemplate.text).toBe('john');
		expect(parsedTemplate.containsWarnings()).toBe(true);
		expect(parsedTemplate.warnings[0].message).toBe('Variable age not found');
		expect(parsedTemplate.warnings[1].message).toBe('Variable date not found');
	});

	it('Warns about non replaced variables', () => {
		const templateText = '${user} ${age}';
		const variables = new Map<string, string>();
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew();
		expect(parsedTemplate.text).toBe('${user} ${age}');
		expect(parsedTemplate.containsWarnings()).toBe(true);
		expect(parsedTemplate.warnings[0].message).toBe('Variable user could not be replaced');
		expect(parsedTemplate.warnings[1].message).toBe('Variable age could not be replaced');
	});
});
