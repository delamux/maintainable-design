import { TemplateWarning } from './TemplateWarning';

export class ParsedTemplate {
	constructor(
		readonly text: string,
		readonly warnings: ReadonlyArray<TemplateWarning>
	) {}

	static create(text: string, warnings: ReadonlyArray<TemplateWarning>): ParsedTemplate {
		if (text == null) {
			return new ParsedTemplate('', [new TemplateWarning('Text is not defined')]);
		}

		return new ParsedTemplate(text, warnings);
	}

	containsWarnings(): boolean {
		return this.warnings.length > 0;
	}

	addWarnings(warnings: TemplateWarning[]): ParsedTemplate {
		return new ParsedTemplate(this.text, this.warnings.concat(warnings));
	}
}
