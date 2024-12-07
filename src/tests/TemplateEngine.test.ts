/*
'This is a template with zero variables' -> 'This is a template with zero variables'
'This is a template with a ${variable}', {variable: 'foo'} -> ''This is a template with a foo''
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'}
    -> 'This is a template with a foo and bar'
*/

class TemplateEngine {
	constructor(
		private readonly templateText: string,
		private readonly variables: Map<string, string>
	) {}

	parse(): string {
		let parsedTemplate = this.templateText;
		this.variables.forEach((value, key) => {
			parsedTemplate = parsedTemplate.replace('${' + key + '}', value);
		});

		return parsedTemplate;
	}
}

describe('The Template Engine', () => {
	it('parses template without data', () => {
		const templateText = 'This is a template with zero variables';
		const variables = new Map<string, string>();
		const parsedTemplate = new TemplateEngine(templateText, variables).parse();
		expect(parsedTemplate).toBe('This is a template with zero variables');
	});

	it("should return 'This is a template with a foo' passing one variables", () => {
		const templateText = 'This is a template with a ${variable}';
		const variables = new Map<string, string>();
		variables.set('variable', 'foo');
		const parsedTemplate = new TemplateEngine(templateText, variables).parse();
		expect(parsedTemplate).toBe('This is a template with a foo');
	});
});
