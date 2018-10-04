/**
 * Tests for array manipulation methods
 * Created by Alexey S. Kiselev
 */

// Import Mocha tool for tests
let chai = require('chai'),
    expect = chai.expect,
    {describe, it} = require('mocha');

chai.should();

describe('Array manipulation methods', () => {
    describe('Sample', () => {
        let Sample = require('../lib/array_manipulation/sample').default;
        it('requires at least one correct argument', () => {
            let zeroParams = () => {
                let sample = new Sample();
                return sample.getSample();
            };
            zeroParams.should.throw(Error);

            let oneParam =  () => {
                let sample = new Sample();
                return sample.getSample([1, 2, 3, 4, 5]);
            };
            oneParam.should.not.throw(Error);

            let badParam1 =  () => {
                let sample = new Sample();
                return sample.getSample(1);
            };
            badParam1.should.throw(TypeError);

            let badParam2 = () => {
                let sample = new Sample();
                return sample.getSample([1, 2, 3], -1);
            };
            badParam2.should.throw(Error);

            let badParam3 = () => {
                let sample = new Sample();
                return sample.getSample([1, 2, 3], 'a');
            };
            badParam3.should.throw(Error);

            let goodParams = () => {
                let sample = new Sample();
                return sample.getSample([1, 2, 3, 4], 2);
            };
            goodParams.should.not.throw(Error);
        });
        it('returns the same type as input with the length of k', () => {
            let sample = new Sample(),
                input_array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
                input_string = 'abcdefghijklmnopqrst',
                input_object = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6};
            expect(sample.getSample(input_array, 2)).to.be.a('array');
            sample.getSample(input_array, 2).length.should.equal(2);
            expect(sample.getSample(input_string, 2)).to.be.a('string');
            sample.getSample(input_string, 2).length.should.equal(2);
            expect(sample.getSample(input_object, 2)).to.be.a('object');
            Object.keys(sample.getSample(input_string, 2)).length.should.equal(2);
        });
        it('should generate different results each time for k/n < 0.2', () => {
            let sample = new Sample(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                samples = {};
            for(let i = 0; i < 1000; i += 1) {
                samples[sample.getSample(input_str, 4)] = 1;
            }
            expect(Object.keys(samples).length).to.be.at.least(995);
        });
        it('should select each element with the same probability for k/n < 0.2', function(done) {
            this.timeout(480000);
            let sample = new Sample(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                letters = {},
                temp;
            // generate letters dict
            for(let letter of input_str) {
                letters[letter] = 0;
            }
            // generate samples
            for(let i = 0; i < 10000000; i += 1) {
                temp = sample.getSample(input_str, 5);
                for(let ch of temp) {
                    letters[ch] += 1;
                }
            }
            let valueToCompare = 5 * 10000000 / 62;
            for(let key of Object.keys(letters)) {
                expect(letters[key]).to.be.closeTo(valueToCompare, 0.015 * valueToCompare);
            }
            done();
        });
        it('should generate different results each time for k/n > 0.2', () => {
            let sample = new Sample(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                samples = {};
            for(let i = 0; i < 1000; i += 1) {
                samples[sample.getSample(input_str, 16)] = 1;
            }
            expect(Object.keys(samples).length).to.be.at.least(995);
        });
        it('should select each element with the same probability for k/n > 0.2', function(done) {
            this.timeout(480000);
            let sample = new Sample(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                letters = {},
                temp;
            // generate letters dict
            for(let letter of input_str) {
                letters[letter] = 0;
            }
            // generate samples
            for(let i = 0; i < 10000000; i += 1) {
                temp = sample.getSample(input_str, 16);
                for(let ch of temp) {
                    letters[ch] += 1;
                }
            }
            let valueToCompare = 16 * 10000000 / 62;
            for(let key of Object.keys(letters)) {
                expect(letters[key]).to.be.closeTo(valueToCompare, 0.015 * valueToCompare);
            }
            done();
        });
        it('should keep correct order by default and shouldn\'t with shuffle', function(done) {
            this.timeout(480000);
            let sample = new Sample(),
                input_arr = [],
                temp,
                correctOrders = 0;

            // function for checking correct order
            let checkOrder = (input) => {
                for(let i = 1; i < input.length; i += 1) {
                    if(input[i] < input[i - 1]) {
                        return false;
                    }
                }
                return true;
            };

            // populate input array
            for(let i = 1; i <= 20000; i += 1) {
                input_arr[i - 1] = i;
            }
            for(let j = 0; j < 20000; j += 1) {
                temp = sample.getSample(input_arr, 1000);
                if(checkOrder(temp)) {
                    correctOrders += 1;
                }
            }
            expect(correctOrders).to.be.equal(20000);

            correctOrders = 0;
            for(let j = 0; j < 20000; j += 1) {
                temp = sample.getSample(input_arr, 1000, {shuffle: true});
                if(checkOrder(temp)) {
                    correctOrders += 1;
                }
            }
            expect(correctOrders).to.be.at.most(50);
            done();
        });
        it('should return the input with k greater then input length', () => {
            let sample = new Sample(),
                input = [1, 2, 3, 5, 6, 7, 8, 9, 5],
                temp,
                checkInput = (input, arrToCompare) => {
                    for(let i = 0; i < input.length; i += 1) {
                        if(input[i] !== arrToCompare[i]) {
                            return false;
                        }
                    }
                    return true;
                };
            temp = sample.getSample(input, input.length + 5);
            expect(input.length).to.be.equal(temp.length);
            expect(checkInput(input, temp)).to.be.equal(true);
        });
        it('should not mutate the original input', function(done) {
            this.timeout(480000);
            let sample = new Sample(),
                input_arr = [],
                temp,
                correctOrders = 0;

            // function for checking correct order
            let checkOrder = (input) => {
                for(let i = 1; i <= input.length; i += 1) {
                    if(input[i - 1] !== i) {
                        return false;
                    }
                }
                return true;
            };

            // populate input array
            for(let i = 1; i <= 20000; i += 1) {
                input_arr[i - 1] = i;
            }

            for(let j = 0; j < 20000; j += 1) {
                temp = sample.getSample(input_arr, 1000);
                if(checkOrder(input_arr)) {
                    correctOrders += 1;
                }
            }
            expect(correctOrders).to.be.equal(20000);

            correctOrders = 0;
            for(let j = 0; j < 20000; j += 1) {
                temp = sample.getSample(input_arr, 5000);
                if(checkOrder(input_arr)) {
                    correctOrders += 1;
                }
            }
            expect(correctOrders).to.be.equal(20000);
            done();
        });
    });
    describe('Shuffle', () => {
        let Shuffle = require('../lib/array_manipulation/shuffle').default;
        it('requires at least one correct argument', () => {
            let zeroParams = () => {
                let shuffle = new Shuffle();
                return shuffle.getPermutation();
            };
            zeroParams.should.throw(Error);

            let oneParam =  () => {
                let shuffle = new Shuffle();
                return shuffle.getPermutation([1, 2, 3, 4, 5]);
            };
            oneParam.should.not.throw(Error);

            let badParam1 =  () => {
                let shuffle = new Shuffle();
                return shuffle.getPermutation(1);
            };
            badParam1.should.throw(TypeError);

            let badParam2 =  () => {
                let shuffle = new Shuffle();
                return shuffle.getPermutation({1: 2, 3: 4, 5: 6});
            };
            badParam2.should.throw(TypeError);
        });
        it('returns the same type as input with the same length', () => {
            let shuffle = new Shuffle(),
                input_array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
                input_string = 'abcdefghijklmnopqrst';
            expect(shuffle.getPermutation(input_array)).to.be.a('array');
            shuffle.getPermutation(input_array).length.should.equal(input_array.length);
            expect(shuffle.getPermutation(input_string)).to.be.a('string');
            shuffle.getPermutation(input_string).length.should.equal(input_string.length);
        });
        it('should generate different results each time', () => {
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                samples = {},
                temp;
            for(let i = 0; i < 100000; i += 1) {
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                temp = shuffle.getPermutation(input_str);
                samples[temp] = 1;
            }
            expect(Object.keys(samples).length).to.be.at.least(99990);
        });
        it('should place each element on each position with the same probability', function(done) {
            this.timeout(480000);
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyz',
                letters = {},
                temp;
            // generate letters dict
            for(let letter of input_str) {
                letters[letter] = {};
                for(let i = 0; i < input_str.length; i += 1) {
                    letters[letter][i] = 0;
                }
            }
            // generate samples
            for(let i = 0; i < 10000000; i += 1) {
                input_str = 'abcdefghijklmnopqrstuvwxyz';
                temp = shuffle.getPermutation(input_str);
                for(let j = 0; j < temp.length; j += 1) {
                    letters[temp[j]][j] += 1;
                }
            }
            let valueToCompare = 10000000 / 26;
            for(let key of Object.keys(letters)) {
                for(let j = 0; j < letters[key].length; j += 1) {
                    expect(letters[key][j]).to.be.closeTo(valueToCompare, 0.015 * valueToCompare);
                }
            }
            done();
        });
        it('should select each element only once', function (done) {
            this.timeout(480000);
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyz',
                letters = {},
                checkLetters = (input) => {
                    let keys = Object.keys(input);
                    for(let i = 0; i < keys.length; i += 1) {
                        if(input[keys[i]] > 1) {
                            return false;
                        }
                    }
                    return true;
                },
                temp;

            for(let i = 0; i < 100000; i += 1) {
                letters = {};
                input_str = 'abcdefghijklmnopqrstuvwxyz';
                temp = shuffle.getPermutation(input_str);
                for(let j = 0; j < temp.length; j += 1) {
                    if(letters[temp[j]]) {
                        letters[temp[j]] += 1;
                    } else {
                        letters[temp[j]] = 1;
                    }
                }
                expect(temp.length).to.be.equal(input_str.length);
                expect(checkLetters(letters)).to.be.equal(true);
            }
            done();
        });
    });
    describe('Derange', () => {
        let Shuffle = require('../lib/array_manipulation/shuffle').default;
        it('requires at least one correct argument', () => {
            let zeroParams = () => {
                let shuffle = new Shuffle();
                return shuffle.getDerangement();
            };
            zeroParams.should.throw(Error);

            let oneParam =  () => {
                let shuffle = new Shuffle();
                return shuffle.getDerangement([1, 2, 3, 4, 5]);
            };
            oneParam.should.not.throw(Error);

            let badParam1 =  () => {
                let shuffle = new Shuffle();
                return shuffle.getDerangement(1);
            };
            badParam1.should.throw(TypeError);

            let badParam2 =  () => {
                let shuffle = new Shuffle();
                return shuffle.getDerangement({1: 2, 3: 4, 5: 6});
            };
            badParam2.should.throw(TypeError);
        });
        it('returns the same type as input with the same length', () => {
            let shuffle = new Shuffle(),
                input_array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
                input_string = 'abcdefghijklmnopqrst';
            expect(shuffle.getDerangement(input_array)).to.be.a('array');
            shuffle.getDerangement(input_array).length.should.equal(input_array.length);
            expect(shuffle.getDerangement(input_string)).to.be.a('string');
            shuffle.getDerangement(input_string).length.should.equal(input_string.length);
        });
        it('should generate different results each time', () => {
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                samples = {},
                temp;
            for(let i = 0; i < 100000; i += 1) {
                input_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                temp = shuffle.getDerangement(input_str);
                samples[temp] = 1;
            }
            expect(Object.keys(samples).length).to.be.at.least(99990);
        });
        it('should place each element on each position with the same probability', function(done) {
            this.timeout(480000);
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyz',
                letters = {},
                temp;
            // generate letters dict
            for(let letter of input_str) {
                letters[letter] = {};
                for(let i = 0; i < input_str.length; i += 1) {
                    letters[letter][i] = 0;
                }
            }
            // generate samples
            for(let i = 0; i < 10000000; i += 1) {
                input_str = 'abcdefghijklmnopqrstuvwxyz';
                temp = shuffle.getDerangement(input_str);
                for(let j = 0; j < temp.length; j += 1) {
                    letters[temp[j]][j] += 1;
                }
            }
            let valueToCompare = 10000000 / 26;
            for(let key of Object.keys(letters)) {
                for(let j = 0; j < letters[key].length; j += 1) {
                    expect(letters[key][j]).to.be.closeTo(valueToCompare, 0.015 * valueToCompare);
                }
            }
            done();
        });
        it('should select each element only once', function (done) {
            this.timeout(480000);
            let shuffle = new Shuffle(),
                input_str = 'abcdefghijklmnopqrstuvwxyz',
                letters = {},
                checkLetters = (input) => {
                    let keys = Object.keys(input);
                    for(let i = 0; i < keys.length; i += 1) {
                        if(input[keys[i]] > 1) {
                            return false;
                        }
                    }
                    return true;
                },
                temp;

            for(let i = 0; i < 100000; i += 1) {
                letters = {};
                input_str = 'abcdefghijklmnopqrstuvwxyz';
                temp = shuffle.getDerangement(input_str);
                for(let j = 0; j < temp.length; j += 1) {
                    if(letters[temp[j]]) {
                        letters[temp[j]] += 1;
                    } else {
                        letters[temp[j]] = 1;
                    }
                }
                expect(temp.length).to.be.equal(input_str.length);
                expect(checkLetters(letters)).to.be.equal(true);
            }
            done();
        });
        it('should not has fixed points', function (done) {
            this.timeout(480000);
            let shuffle = new Shuffle(),
                input_arr = [],
                checkDerangement = (input) => {
                    for(let i = 0; i < input.length; i += 1) {
                        if(input[i] === i + 1) {
                            return false;
                        }
                    }
                    return true;
                },
                temp;

            // Initialize input array
            for(let i = 0; i < 12; i += 1) {
                input_arr[i] = i + 1;
            }

            for(let i = 0; i < 1000000; i += 1) {
                input_arr = [];
                for(let i = 0; i < 12; i += 1) {
                    input_arr[i] = i + 1;
                }
                temp = shuffle.getDerangement(input_arr);
                expect(temp.length).to.be.equal(12);
                expect(checkDerangement(temp)).to.be.equal(true);
            }
            done();
        });
    });
});