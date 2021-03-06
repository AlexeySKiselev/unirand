// @flow

/**
 * Rayleigh distribution
 * This is continuous distribution
 * https://en.wikipedia.org/wiki/Rayleigh_distribution
 * @param sigma <number> - scale parameter, sigma > 0
 * @returns Rayleigh distributed value
 * Created by Alexey S. Kiselev
 */

import type { MethodError, RandomArray } from '../types';
import type { IDistribution } from '../interfaces';
import prng from '../prng/prngProxy';

class Rayleigh implements IDistribution {
    sigma: number;

    constructor(sigma: number): void {
        this.sigma = Number(sigma);
    }

    /**
     * Generates a random number
     * @returns a Rayleigh distributed number
     */
    random(): number {
        let epsilon = 0.00000001;
        let u: number = Math.min((prng.random(): any) + epsilon, 1 - epsilon);
        return this._random(u);
    }

    /**
     * Generates next seeded random number
     * @returns {number}
     */
    next(): number {
        let epsilon = 0.00000001;
        let u: number = Math.min((prng.next(): any) + epsilon, 1 - epsilon);
        return this._random(u);
    }

    _random(u: number): number {
        return this.sigma * Math.sqrt(-2 * Math.log(u));
    }

    /**
     * Generates Rayleigh distributed numbers
     * @param n: number - Number of elements in resulting array, n > 0
     * @returns Array<number> - Rayleigh distributed numbers
     */
    distribution(n: number): RandomArray {
        let rayleighArray: RandomArray = [],
            epsilon = 0.00000001,
            random: RandomArray = (prng.random(n): any),
            u: number;
        for(let i: number = 0; i < n; i += 1){
            u = Math.min(random[i] + epsilon, 1 - epsilon);
            rayleighArray[i] = this._random(u);
        }
        return rayleighArray;
    }

    /**
     * Error handling
     * @returns {boolean}
     */
    isError(): MethodError {
        if(!this.sigma) {
            return {error: 'Rayleigh distribution: you should point "sigma" (scale) numerical value'};
        }
        if(this.sigma <= 0) {
            return {error: 'Rayleigh distribution: parameter "sigma" (scale) must be a positive value'};
        }
        return { error: false };
    }

    /**
     * Refresh method
     * @param newSigma: number - new parameter "sigma"
     * This method does not return values
     */
    refresh(newSigma: number): void {
        this.sigma = Number(newSigma);
    }

    /**
     * Class .toString method
     * @returns {string}
     */
    toString(): string {
        let info = [
            'Rayleigh Distribution',
            `Usage: unirand.rayleigh(${this.sigma}).random()`
        ];
        return info.join('\n');
    }

    /**
     * Mean value
     * Information only
     * For calculating real mean value use analyzer
     */
    get mean(): number {
        return this.sigma * Math.sqrt(Math.PI / 2);
    }

    /**
     * Median value
     * Information only
     * For calculating real median value use analyzer
     */
    get median(): number {
        return this.sigma * Math.sqrt(2 * Math.log(2));
    }

    /**
     * Mode value - value, which appears most often
     * Information only
     * For calculating real mode value use analyzer
     */
    get mode(): number {
        return this.sigma;
    }

    /**
     * Variance value
     * Information only
     * For calculating real variance value use analyzer
     */
    get variance(): number {
        return Math.pow(this.sigma, 2) * (4 - Math.PI) / 2;
    }

    /**
     * Entropy value
     * Information only
     * For calculating real entropy value use analyzer
     */
    get entropy(): number {
        return 1.28860783245076643030325605 + Math.log(this.sigma / 1.4142135623730950488016887242097);
    }

    /**
     * Skewness value
     * Information only
     * For calculating real skewness value use analyzer
     */
    get skewness(): number {
        return 2 * Math.sqrt(Math.PI) * (Math.PI - 3) / Math.pow(4 - Math.PI, 1.5);
    }

    /**
     * Kurtosis value
     * Information only
     * For calculating real kurtosis value use analyzer
     */
    get kurtosis(): number {
        return - (6 * Math.pow(Math.PI, 2) - 24 * Math.PI + 16) / Math.pow(4 - Math.PI, 2);
    }

    /**
     * All parameters of distribution in one object
     * Information only
     */
    get parameters(): {} {
        return {
            mean: this.mean,
            median: this.median,
            mode: this.mode,
            variance: this.variance,
            entropy: this.entropy,
            skewness: this.skewness,
            kurtosis: this.kurtosis
        };
    }
}

module.exports = Rayleigh;
