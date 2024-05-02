export type Score = { totalScore: number; frameIndex: number };

export class BowlingGame {
	private rolls: number[] = [];
	private readonly maxScorePerFrame = 10;
	private readonly maxRollsPerFrame = 2;

	public roll(pins: number) {
		this.rolls.push(pins);
	}

	calculateScoreNew() {
		const score = this.frames().reduce(this.calculateScorePerFrame, {
			totalScore: 0,
			frameIndex: 0,
		});

		return score.totalScore;
	}

	private calculateScorePerFrame = ({ totalScore, frameIndex }: Score) => {
		if (this.isStrikeInFrame(frameIndex)) {
			return {
				totalScore: totalScore + this.maxScorePerFrame + this.strikeBonus(frameIndex),
				frameIndex: this.nextRoll(frameIndex),
			};
		}

		if (this.isSpareFrame(frameIndex)) {
			return {
				totalScore: totalScore + this.maxScorePerFrame + this.spareBonus(frameIndex),
				frameIndex: this.nextFrame(frameIndex),
			};
		}

		return {
			totalScore: totalScore + this.sumOfPinsInFrame(frameIndex),
			frameIndex: this.nextFrame(frameIndex),
		};
	};

	private nextRoll(frameIndex: number) {
		return frameIndex + 1;
	}

	private nextFrame(frameIndex: number) {
		return frameIndex + this.maxRollsPerFrame;
	}

	private isStrikeInFrame(frameIndex: number) {
		return this.rolls[frameIndex] === this.maxScorePerFrame;
	}

	private strikeBonus(frameIndex: number) {
		return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
	}

	private isSpareFrame(frameIndex: number) {
		return this.sumOfPinsInFrame(frameIndex) === 10;
	}

	private spareBonus(frameIndex: number) {
		return this.rolls[frameIndex + this.maxRollsPerFrame];
	}

	private sumOfPinsInFrame(frameIndex: number) {
		return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
	}

	private frames() {
		const numberOfFrames = 10;
		return Array.from({ length: numberOfFrames }).map((_, i) => i);
	}
}
