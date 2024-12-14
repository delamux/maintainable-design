import { Navigator } from './Navigator';

type RawCommand = 'L' | 'R' | 'F';

export enum Command {
	left = 'left',
	right = 'right',
	forward = 'forward',
}

export class Rover {
	constructor(private navigator: Navigator) {}

	run(rawCommands: string) {
		this.ensureIsValidCommand(rawCommands);
		this.transformRawCommandsToCommand(rawCommands).forEach(this.runSingleCommand);
		return this.formattedLocation();
	}

	private ensureIsValidCommand = (rawCommands: string) => {
		if (!rawCommands || !rawCommands.match(/^[LRF]+$/)) {
			throw new Error('Invalid command');
		}
	};

	private transformRawCommandsToCommand = (rawCommands: string) =>
		rawCommands.split('').map((rawCommand: RawCommand): Command => {
			if (rawCommand === 'L') return Command.left;
			if (rawCommand === 'R') return Command.right;
			if (rawCommand === 'F') return Command.forward;
		});

	private runSingleCommand = (command: Command) => {
		this.navigator = this.navigator[command]();
	};

	private formattedLocation = () => {
		return this.navigator.formattedLocation();
	};
}
