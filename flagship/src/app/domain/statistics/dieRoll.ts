
export enum DieType {
    Red = "Red",
    Blue = "Blue",
    Black = "Black",
    Any = "Any"
}

export interface IDieRoll {
    pHit: number;
    pDoubleHit: number;
    pHitCrit: number;
    pCrit: number;
    pAccuracy: number;
    pBlank: number;
    type: DieType;
    modifications: number;
}

export class DieRoll implements IDieRoll {

    public baseProbability: IDieRoll;
    public modifications = 0;
    constructor(public type: DieType, public pHit: number,
        public pDoubleHit: number, public pHitCrit: number,
        public pCrit: number, public pAccuracy: number,
        public pBlank: number) {
        this.baseProbability = {
            type: this.type,
            pHit: this.pHit,
            pDoubleHit: this.pDoubleHit,
            pHitCrit: this.pHitCrit,
            pCrit: this.pCrit,
            pAccuracy: this.pAccuracy,
            pBlank: this.pBlank,
            modifications: 0
        };
    }

    clone(): DieRoll {
        let roll = new DieRoll(this.type, this.baseProbability.pHit,
            this.baseProbability.pDoubleHit, this.baseProbability.pHitCrit,
            this.baseProbability.pCrit, this.baseProbability.pAccuracy,
            this.baseProbability.pBlank);
        roll.pHit = this.pHit;
        roll.pDoubleHit = this.pDoubleHit;
        roll.pCrit = this.pCrit;
        roll.pHitCrit = this.pHitCrit;
        roll.pAccuracy = this.pAccuracy;
        roll.pBlank = this.pBlank;
        roll.modifications = this.modifications;
        return roll;
    }

    validate() {
        let totalProbability = this.pBlank + this.pAccuracy +
            this.pCrit + this.pDoubleHit + this.pHit + this.pHitCrit;

        if (totalProbability !== 1) {
            console.log(`Die validation error! ${this.type} die got P = ${totalProbability}`);
        }
    }

    recordModification() {
        this.modifications += 1;
    }

    expectedDamage(): number {
        return this.pHit + this.pCrit + (this.pHitCrit * 2) + (this.pDoubleHit * 2);
    }

    damageVariance(): number {
        let mean = this.expectedDamage();
        let single = Math.pow(1 - mean, 2);
        let double = Math.pow(2 - mean, 2);
        let miss = Math.pow(0 - mean, 2);
        return (this.pHit * single) +
            (this.pCrit * single) +
            (this.pHitCrit * double) +
            (this.pDoubleHit * double) +
            (this.pBlank * miss) +
            (this.pAccuracy * miss);
    }

    expectedAccuracies(): number {
        return this.pAccuracy;
    }

    accuracyVariance(): number {
        return this.pAccuracy * Math.pow(1 - this.expectedAccuracies(), 2);
    }

    expectedCriticals(): number {
        return this.pCrit + this.pHitCrit;
    }

    criticalVariance(): number {
        let single = Math.pow(1 - this.expectedCriticals(), 2);
        return (this.pCrit * single) + (this.pHitCrit * single);
    }

    modificationScore(): number {
        return Math.abs(this.pAccuracy - this.baseProbability.pAccuracy) +
            Math.abs(this.pHit - this.baseProbability.pHit) +
            Math.abs(this.pCrit - this.baseProbability.pCrit) + 
            Math.abs(this.pBlank - this.baseProbability.pBlank) +
            Math.abs(this.pDoubleHit - this.baseProbability.pDoubleHit) +
            Math.abs(this.pHitCrit - this.baseProbability.pHitCrit);
    }

    static RedDieRoll(): DieRoll {
        return new DieRoll(DieType.Red,
            0.25, 0.125, 0, 0.25, 0.125, 0.25);
    }

    static BlueDieRoll(): DieRoll {
        return new DieRoll(DieType.Blue,
            0.5, 0, 0, .25, .25, 0);
    }

    static BlackDieRoll(): DieRoll {
        return new DieRoll(DieType.Black,
            0.5, 0, 0.25, 0, 0, 0.25);
    }
}
