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
		this.variables.forEach((value, key) => {
			const regex = `\$\{${key}\}`;
			parsedText = parsedText.replace(regex, value);
		});

		return new ParsedTemplate(parsedText, []);
	}
}

class TemplateWarning {
	constructor(private readonly message: string) {}
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

	it('Parsed template with variables not being foeund', () => {
		const templateText = '${user}';
		const variables = new Map<string, string>();
		variables.set('user', 'john');
		variables.set('age', '35');
		const aDate = new Date().toString();
		variables.set('date', aDate);
		const parsedTemplate = new TemplateEngine(templateText, variables).parseNew().text;
		expect(parsedTemplate).toBe('john');
	});
});
