// @flow
/**
 * Created by Alexey S. Kiselev
 */

import fs from 'fs';
import DistributionFactory from './core/distributionFactory';
import AnalyzerFactory from './core/analyzerFactory';
import type { RandomArray } from './core/types';

class RandomJS {
    analyze: any;
    utils: any;

    constructor(): void {
        this.analyze = null;
        this.utils = null;

        fs.readdirSync(__dirname + '/core/methods').forEach((file: string) => {
            /**
             *  Add a "random" method which contains different distribution methods
             *  Uses a factory pattern for creating instances of distributions classes
             *  @returns Object corresponds to distribution
             */
            Object.defineProperty(this, file.slice(0,-3),{
                __proto__: null,
                get: () => {
                    return (...params): DistributionFactory => {
                        return new DistributionFactory(file, ...params);
                    };
                }
            });
        });

        /**
         * Add random array analyser
         * This method is long in constructor and short in methods
         * TODO: implement method short in constructor and long in methods
         * Use Analyzer factory to create method
         */
        Object.defineProperty(this, 'analyze', ({
            __proto__: null,
            value: (randomArray: RandomArray, options?: { [string]: any }): AnalyzerFactory => {
                return new AnalyzerFactory(randomArray, options);
            }
        }: Object));

        /**
         * Utils
         * Contains implementation for Gamma, Digamma functions, etc.
         */
        Object.defineProperty(this, 'utils', ({
            __proto__: null,
            value: require(__dirname + '/core/utils/utils')
        }: Object));
    }

    help(): void {
        let help = require('./core/help');
        console.log('Available Distribution methods:');
        Object.keys(help).forEach((method: string): void => {
            console.log(method + ': ' + help[method]);
        });
    }
}

// Add methods extractor
const randomjs = new RandomJS();
const methods = {
    analyze: randomjs.analyze,
    utils: randomjs.utils
};
fs.readdirSync(__dirname + '/core/methods').forEach((file: string) => {
    let rand_method = file.slice(0,-3);
    methods[rand_method] = Object.getOwnPropertyDescriptor(randomjs, rand_method).get();
});

module.exports = methods;

// TODO: Create a check-values external function
// TODO: Generators
// TODO: Regression
// TODO: Prediction
// TODO: Shuffle
// TODO: Games
// TODO: Pseudorandom generator
// TODO: add Proxy to random generators
// TODO: add F-distribution
// TODO: add zipf distribution
// TODO: add utils