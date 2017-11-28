/** Tests
 * For Visualization uses "d3node-barchart" package
 * Created by Alexey on 24.08.2017.
 */

// Import Mocha tool for tests
let chai = require('chai'),
    expect = chai.expect,
    {describe, it} = require('mocha');

chai.should();

// TODO: after implementation analyser add more test for each distribution for comparing real parameters with expected ones

// Uniform distribution
describe('Uniform distribution',() => {
    let Uniform = require('../lib/methods/uniform');
    it('requires two numerical arguments', () => {
        let zeroParams = () => {
            let uniform = new Uniform();
            if(uniform.isError())
                throw new Error(uniform.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let uniform = new Uniform(1);
            if(uniform.isError())
                throw new Error(uniform.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let uniform = new Uniform('a', 'b');
            if(uniform.isError())
                throw new Error(uniform.isError());
        };
        badParams.should.throw(Error);

        let goodParams = () => {
            let uniform = new Uniform(0, 1);
            if(uniform.isError())
                throw new Error(uniform.isError());
        };
        goodParams.should.not.throw(Error);
    });
    it('should have mean value for min = 1 and max = 3 equals to 2',() => {
        let uniform = new Uniform(1, 3);
        expect(uniform.mean).to.be.a('number');
        uniform.mean.should.equal(2);
    });
    it('should have mean value for initial min = 1 and max = 3 equals to 3 after .refresh(2, 4) method',() => {
        let uniform = new Uniform(1, 3);
        uniform.refresh(2, 4);
        uniform.mean.should.equal(3);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let uniform = new Uniform(1, 5);
        expect(uniform).to.have.property('random');
        expect(uniform).to.respondsTo('random');
        expect(uniform).to.have.property('distribution');
        expect(uniform).to.respondsTo('distribution');
        expect(uniform).to.have.property('refresh');
        expect(uniform).to.respondsTo('refresh');
        expect(uniform).to.have.property('isError');
        expect(uniform).to.respondsTo('isError');
    });
    it('should return different values each time and these values should be 1 <= <values> <= 5', () => {
        let uniform = new Uniform(1, 5),
            value1 = uniform.random();
        expect(uniform.random()).to.be.a('number');
        expect(uniform.random()).to.be.within(1, 5);
        uniform.random().should.not.equal(value1);
    });
    it('should generate an array with random values between 1 and 5 with length of 500', () => {
        let uniform = new Uniform(1, 5),
            randomArray = uniform.distribution(500),
            min = 6,
            max = 0,
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(rand < min) {
                min = rand;
            }
            if(rand > max) {
                max = rand;
            }
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(200);
        expect(min).to.be.at.least(1);
        expect(max).to.be.at.most(5);
    });
});

// Normal Distribution
describe('Normal distribution', () => {
    let Normal = require('../lib/methods/normal');
    it('requires two numerical arguments', () => {
        let zeroParams = () => {
            let normal = new Normal();
            if(normal.isError())
                throw new Error(normal.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let normal = new Normal(1);
            if(normal.isError())
                throw new Error(normal.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let normal = new Normal('a', 'b');
            if(normal.isError())
                throw new Error(normal.isError());
        };
        badParams.should.throw(Error);

        let goodParams = () => {
            let normal = new Normal(1.5, 2);
            if(normal.isError())
                throw new Error(normal.isError());
        };
        goodParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let normal = new Normal(1, 2);
        expect(normal).to.have.property('random');
        expect(normal).to.respondsTo('random');
        expect(normal).to.have.property('distribution');
        expect(normal).to.respondsTo('distribution');
        expect(normal).to.have.property('refresh');
        expect(normal).to.respondsTo('refresh');
        expect(normal).to.have.property('isError');
        expect(normal).to.respondsTo('isError');
    });
    it('should have mean value for mu = 1.5 and sigma = 2 equals to mu',() => {
        let normal = new Normal(1.5, 3);
        expect(normal.mean).to.be.a('number');
        normal.mean.should.equal(1.5);
    });
    it('should have mean value for initial mu = 1.5 and sigma = 2 equals to 2.5 after .refresh(2.5, 4) method',() => {
        let normal = new Normal(1.5, 2);
        normal.mean.should.equal(1.5);
        normal.sigma.should.equal(2);
        normal.refresh(2.5, 4);
        normal.mean.should.equal(2.5);
        normal.sigma.should.equal(4);
    });
    it('should return different values each time', () => {
        let normal = new Normal(1.5, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = normal.random();
            expect(normal.random()).to.be.a('number');
            normal.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values between 1 and 5 with length of 500', () => {
        let normal = new Normal(1.5, 2),
            randomArray = normal.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Bernoulli distribution
describe('Bernoulli distribution', () => {
    let Bernoulli = require('../lib/methods/bernoulli');
    it('requires one numerical argument', () => {
        let zeroParams = () => {
            let bernoulli = new Bernoulli();
            if(bernoulli.isError())
                throw new Error(bernoulli.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let bernoulli = new Bernoulli(0.5);
            if(bernoulli.isError())
                throw new Error(bernoulli.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let bernoulli = new Bernoulli('a');
            if(bernoulli.isError())
                throw new Error(bernoulli.isError());
        };
        badParams.should.throw(Error);

        let incorrectParamsBigger = () => {
            let bernoulli = new Bernoulli(2);
            if(bernoulli.isError())
                throw new Error(bernoulli.isError());
        };
        incorrectParamsBigger.should.throw(Error);

        let incorrectParamsSmaller = () => {
            let bernoulli = new Bernoulli(-1);
            if(bernoulli.isError())
                throw new Error(bernoulli.isError());
        };
        incorrectParamsSmaller.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let bernoulli = new Bernoulli(0.5);
        expect(bernoulli).to.have.property('random');
        expect(bernoulli).to.respondsTo('random');
        expect(bernoulli).to.have.property('distribution');
        expect(bernoulli).to.respondsTo('distribution');
        expect(bernoulli).to.have.property('refresh');
        expect(bernoulli).to.respondsTo('refresh');
        expect(bernoulli).to.have.property('isError');
        expect(bernoulli).to.respondsTo('isError');
    });
    it('should have mean value for p = 0.5 equals to p',() => {
        let bernoulli = new Bernoulli(0.5);
        expect(bernoulli.mean).to.be.a('number');
        bernoulli.mean.should.equal(0.5);
    });
    it('should have mean value for initial p = 0.5 equals to 0.7 after .refresh(0.7) method',() => {
        let bernoulli = new Bernoulli(0.5);
        bernoulli.mean.should.equal(0.5);
        bernoulli.refresh(0.7);
        bernoulli.mean.should.equal(0.7);
    });
    it('should return few different values with 10 experiments', () => {
        let bernoulli = new Bernoulli(0.6),
            value1,
            countRandoms = {};
        for(let i = 0; i < 10; i += 1){
            value1 = bernoulli.random();
            expect(bernoulli.random()).to.be.a('number');
            countRandoms[value1] = 1;
        }
        expect(Object.keys(countRandoms).length).to.be.at.least(2);
    });
    it('should generate an array with random values with length of 500', () => {
        let bernoulli = new Bernoulli(0.5),
            randomArray = bernoulli.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.9;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(3);
    });
    it('should generate only integer values', () => {
        let bernoulli = new Bernoulli(0.4),
            randomArray = bernoulli.distribution(100),
            correct = true;
        for(let rand of randomArray) {
            if(parseInt(rand) !== rand){
                correct = false;
                break;
            }
        }
        expect(correct).to.be.equal(true);
    });
});

// Beta distribution
describe('Beta distribution', () => {
    let Beta = require('../lib/methods/beta');
    it('requires two numerical arguments with alpha > 0 and beta > 0', () => {
        let zeroParams = () => {
            let beta = new Beta();
            if(beta.isError())
                throw new Error(beta.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let beta = new Beta(0.5);
            if(beta.isError())
                throw new Error(beta.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let beta = new Beta('a', 'b');
            if(beta.isError())
                throw new Error(beta.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let beta = new Beta(-1, 1);
            if(beta.isError())
                throw new Error(beta.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsLess2 = () => {
            let beta = new Beta(1, -1);
            if(beta.isError())
                throw new Error(beta.isError());
        };
        badParamsLess2.should.throw(Error);

        let twoParams =  () => {
            let beta = new Beta(0.5, 1);
            if(beta.isError())
                throw new Error(beta.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let beta = new Beta(0.5, 1);
        expect(beta).to.have.property('random');
        expect(beta).to.respondsTo('random');
        expect(beta).to.have.property('distribution');
        expect(beta).to.respondsTo('distribution');
        expect(beta).to.have.property('refresh');
        expect(beta).to.respondsTo('refresh');
        expect(beta).to.have.property('isError');
        expect(beta).to.respondsTo('isError');
    });
    it('should have values for initial alpha = 1 and beta = 1 equals to alpha = 2 and beta = 3 after .refresh(2, 3) method',() => {
        let beta = new Beta(1, 1);
        beta.alpha.should.equal(1);
        beta.beta.should.equal(1);
        beta.refresh(2, 3);
        beta.alpha.should.equal(2);
        beta.beta.should.equal(3);
    });
    it('should have mean value for alpha = 1 and beta = 1 equals to 0.5, but for alpha = 1 and beta = 3 equals to 0.25',() => {
        let beta = new Beta(1, 1);
        expect(beta.mean).to.be.a('number');
        beta.mean.should.equal(0.5);
        beta.refresh(1, 3);
        expect(beta.mean).to.be.a('number');
        beta.mean.should.equal(0.25);
    });
    it('should return different values each time', () => {
        let beta = new Beta(1, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = beta.random();
            expect(beta.random()).to.be.a('number');
            beta.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let beta = new Beta(1, 2),
            randomArray = beta.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(200);
    });
});

// Beta Prime distribution
describe('Beta Prime distribution', () => {
    let BetaPrime = require('../lib/methods/betaprime');
    it('requires two numerical arguments with alpha > 0 and beta > 0', () => {
        let zeroParams = () => {
            let betaPrime = new BetaPrime();
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let betaPrime = new BetaPrime(0.5);
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let betaPrime = new BetaPrime('a', 'b');
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let betaPrime = new BetaPrime(-1, 1);
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsLess2 = () => {
            let betaPrime = new BetaPrime(1, -1);
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        badParamsLess2.should.throw(Error);

        let twoParams =  () => {
            let betaPrime = new BetaPrime(0.5, 1);
            if(betaPrime.isError())
                throw new Error(betaPrime.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let betaPrime = new BetaPrime(0.5, 1);
        expect(betaPrime).to.have.property('random');
        expect(betaPrime).to.respondsTo('random');
        expect(betaPrime).to.have.property('distribution');
        expect(betaPrime).to.respondsTo('distribution');
        expect(betaPrime).to.have.property('refresh');
        expect(betaPrime).to.respondsTo('refresh');
        expect(betaPrime).to.have.property('isError');
        expect(betaPrime).to.respondsTo('isError');
    });
    it('should have values for initial alpha = 1 and beta = 1 equals to alpha = 2 and beta = 3 after .refresh(2, 3) method',() => {
        let betaPrime = new BetaPrime(1, 1);
        betaPrime.alpha.should.equal(1);
        betaPrime.beta.should.equal(1);
        betaPrime.refresh(2, 3);
        betaPrime.alpha.should.equal(2);
        betaPrime.beta.should.equal(3);
    });
    it('should have mean value for alpha = 1 and beta = 2 equals to 1, but for beta = 3 equals to 0.5, for beta = 0.5 equals to Infinity',() => {
        let betaPrime = new BetaPrime(1, 2);
        expect(betaPrime.mean).to.be.a('number');
        betaPrime.mean.should.equal(1);
        betaPrime.refresh(1, 3);
        expect(betaPrime.mean).to.be.a('number');
        betaPrime.mean.should.equal(0.5);
        betaPrime.refresh(1, 0.5);
        expect(betaPrime.mean).to.be.a('number');
        betaPrime.mean.should.equal(Infinity);
    });
    it('should return different values each time', () => {
        let betaPrime = new BetaPrime(1, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = betaPrime.random();
            expect(betaPrime.random()).to.be.a('number');
            betaPrime.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let betaPrime = new BetaPrime(1, 2),
            randomArray = betaPrime.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(200);
    });
});

// Binomial distribution
describe('Binomial distribution', () => {
    let Binomial = require('../lib/methods/binomial');
    it('requires two numerical arguments with n > 0 and 0 <= p <= 1', () => {
        let zeroParams = () => {
            let binomial = new Binomial();
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let binomial = new Binomial(0.5);
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let binomial = new Binomial('a', 'b');
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let binomial = new Binomial(-1, 0.5);
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsLess2 = () => {
            let binomial = new Binomial(1, -1);
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        badParamsLess2.should.throw(Error);

        let badParamsGreat = () => {
            let binomial = new Binomial(2, 2);
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        badParamsGreat.should.throw(Error);

        let twoParams =  () => {
            let binomial = new Binomial(2, 0.5);
            if(binomial.isError())
                throw new Error(binomial.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let binomial = new Binomial(2, 0.5);
        expect(binomial).to.have.property('random');
        expect(binomial).to.respondsTo('random');
        expect(binomial).to.have.property('distribution');
        expect(binomial).to.respondsTo('distribution');
        expect(binomial).to.have.property('refresh');
        expect(binomial).to.respondsTo('refresh');
        expect(binomial).to.have.property('isError');
        expect(binomial).to.respondsTo('isError');
    });
    it('should have values for initial alpha = 1 and beta = 1 equals to alpha = 2 and beta = 3 after .refresh(2, 3) method',() => {
        let binomial = new Binomial(1, 0.5);
        binomial.trials.should.equal(1);
        binomial.successProb.should.equal(0.5);
        binomial.refresh(2, 0.7);
        binomial.trials.should.equal(2);
        binomial.successProb.should.equal(0.7);
    });
    it('should have mean value for n = 1 and p = 0.5 equals to 0.5, but for n = 3 and p = 0.6 equals to 1.8',() => {
        let binomial = new Binomial(1, 0.5);
        expect(binomial.mean).to.be.a('number');
        binomial.mean.should.equal(0.5);
        binomial.refresh(3, 0.6);
        expect(binomial.mean).to.be.a('number');
        expect(binomial.mean).to.be.closeTo(1.8, 0.005);
    });
    it('should return few different values with 10 experiments', () => {
        let binomial = new Binomial(2, 0.6),
            value1,
            countRandoms = {};
        for(let i = 0; i < 10; i += 1){
            value1 = binomial.random();
            expect(binomial.random()).to.be.a('number');
            countRandoms[value1] = 1;
        }
        expect(Object.keys(countRandoms).length).to.be.at.least(2);
    });
    it('should generate an array with random values with length of 500', () => {
        let binomial = new Binomial(1, 0.5),
            randomArray = binomial.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.9;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(3);
    });
    it('should generate only integer values', () => {
        let binomial = new Binomial(2, 0.4),
            randomArray = binomial.distribution(100),
            correct = true;
        for(let rand of randomArray) {
            if(parseInt(rand) !== rand){
                correct = false;
                break;
            }
        }
        expect(correct).to.be.equal(true);
    });
});

// Cauchy distribution
describe('Cauchy distribution', () => {
    let Cauchy = require('../lib/methods/cauchy');
    it('requires two numerical arguments with gamma > 0', () => {
        let zeroParams = () => {
            let cauchy = new Cauchy();
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let cauchy = new Cauchy(0.5);
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let cauchy = new Cauchy('a', 'b');
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let cauchy = new Cauchy(1, -1);
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsGammaToZero = () => {
            let cauchy = new Cauchy(1, 0);
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        badParamsGammaToZero.should.throw(Error);

        let twoParams =  () => {
            let cauchy = new Cauchy(2, 0.5);
            if(cauchy.isError())
                throw new Error(cauchy.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let cauchy = new Cauchy(2, 0.5);
        expect(cauchy).to.have.property('random');
        expect(cauchy).to.respondsTo('random');
        expect(cauchy).to.have.property('distribution');
        expect(cauchy).to.respondsTo('distribution');
        expect(cauchy).to.have.property('refresh');
        expect(cauchy).to.respondsTo('refresh');
        expect(cauchy).to.have.property('isError');
        expect(cauchy).to.respondsTo('isError');
    });
    it('should have values for initial x = 1 and gamma = 2 equals to x = 2 and gamma = 3 after .refresh(2, 3) method',() => {
        let cauchy = new Cauchy(1, 2);
        cauchy.location.should.equal(1);
        cauchy.scale.should.equal(2);
        cauchy.refresh(2, 3);
        cauchy.location.should.equal(2);
        cauchy.scale.should.equal(3);
    });
    it('should return different values each time', () => {
        let cauchy = new Cauchy(1, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = cauchy.random();
            expect(cauchy.random()).to.be.a('number');
            cauchy.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let cauchy = new Cauchy(1, 2),
            randomArray = cauchy.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Chi distribution
describe('Chi distribution', () => {
    let Chi = require('../lib/methods/chi');
    it('requires one numerical argument with k > 0', () => {
        let zeroParams = () => {
            let chi = new Chi();
            if(chi.isError())
                throw new Error(chi.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let chi = new Chi(0.5);
            if(chi.isError())
                throw new Error(chi.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let chi = new Chi('a');
            if(chi.isError())
                throw new Error(chi.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let chi = new Chi(-1);
            if(chi.isError())
                throw new Error(chi.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsKToZero = () => {
            let chi = new Chi(0);
            if(chi.isError())
                throw new Error(chi.isError());
        };
        badParamsKToZero.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let chi = new Chi(2);
        expect(chi).to.have.property('random');
        expect(chi).to.respondsTo('random');
        expect(chi).to.have.property('distribution');
        expect(chi).to.respondsTo('distribution');
        expect(chi).to.have.property('refresh');
        expect(chi).to.respondsTo('refresh');
        expect(chi).to.have.property('isError');
        expect(chi).to.respondsTo('isError');
    });
    it('should have value for initial k = 1 equals to k = 2 after .refresh(2) method',() => {
        let chi = new Chi(1);
        chi.degrees.should.equal(1);
        chi.refresh(2);
        chi.degrees.should.equal(2);
    });
    it('should return different values each time', () => {
        let chi = new Chi(2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = chi.random();
            expect(chi.random()).to.be.a('number');
            chi.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let chi = new Chi(2),
            randomArray = chi.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Chi Square distribution
describe('Chi Square distribution', () => {
    let ChiSquare = require('../lib/methods/chisquare');
    it('requires one numerical argument with k > 0', () => {
        let zeroParams = () => {
            let chiSquare = new ChiSquare();
            if(chiSquare.isError())
                throw new Error(chiSquare.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let chiSquare = new ChiSquare(0.5);
            if(chiSquare.isError())
                throw new Error(chiSquare.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let chiSquare = new ChiSquare('a');
            if(chiSquare.isError())
                throw new Error(chiSquare.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let chiSquare = new ChiSquare(-1);
            if(chiSquare.isError())
                throw new Error(chiSquare.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsKToZero = () => {
            let chiSquare = new ChiSquare(0);
            if(chiSquare.isError())
                throw new Error(chiSquare.isError());
        };
        badParamsKToZero.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let chiSquare = new ChiSquare(2);
        expect(chiSquare).to.have.property('random');
        expect(chiSquare).to.respondsTo('random');
        expect(chiSquare).to.have.property('distribution');
        expect(chiSquare).to.respondsTo('distribution');
        expect(chiSquare).to.have.property('refresh');
        expect(chiSquare).to.respondsTo('refresh');
        expect(chiSquare).to.have.property('isError');
        expect(chiSquare).to.respondsTo('isError');
    });
    it('should have value for initial k = 1 equals to k = 2 after .refresh(2) method',() => {
        let chiSquare = new ChiSquare(1);
        chiSquare.degrees.should.equal(1);
        chiSquare.refresh(2);
        chiSquare.degrees.should.equal(2);
    });
    it('should return different values each time', () => {
        let chiSquare = new ChiSquare(2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = chiSquare.random();
            expect(chiSquare.random()).to.be.a('number');
            chiSquare.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let chiSquare = new ChiSquare(2),
            randomArray = chiSquare.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Erlang distribution
describe('Erlang distribution', () => {
    let Erlang = require('../lib/methods/erlang');
    it('requires two numerical arguments with mu > 0 and k > 0', () => {
        let zeroParams = () => {
            let erlang = new Erlang();
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let erlang = new Erlang(0.5);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let erlang = new Erlang('a', 'b');
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let erlang = new Erlang(1, -1);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsGammaToZero = () => {
            let erlang = new Erlang(1, 0);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        badParamsGammaToZero.should.throw(Error);

        let badParamsLess2 = () => {
            let erlang = new Erlang(-1, 1);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        badParamsLess2.should.throw(Error);

        let badParamsGammaToZero2 = () => {
            let erlang = new Erlang(0, 1);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        badParamsGammaToZero2.should.throw(Error);

        let twoParams =  () => {
            let erlang = new Erlang(2, 0.5);
            if(erlang.isError())
                throw new Error(erlang.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let erlang = new Erlang(2, 2);
        expect(erlang).to.have.property('random');
        expect(erlang).to.respondsTo('random');
        expect(erlang).to.have.property('distribution');
        expect(erlang).to.respondsTo('distribution');
        expect(erlang).to.have.property('refresh');
        expect(erlang).to.respondsTo('refresh');
        expect(erlang).to.have.property('isError');
        expect(erlang).to.respondsTo('isError');
    });
    it('should have values for initial mu = 1 and k = 1 equals to mu = 2 and k = 3 after .refresh(3, 2) method',() => {
        let erlang = new Erlang(1, 1);
        erlang.shape.should.equal(1);
        erlang.scale.should.equal(1);
        erlang.refresh(3, 2);
        erlang.shape.should.equal(3);
        erlang.scale.should.equal(2);
    });
    it('should have mean value for mu = 1 and k = 0.5 equals to 0.5, but for mu = 3 and k = 0.6 equals to 1.8',() => {
        let erlang = new Erlang(0.5, 1);
        expect(erlang.mean).to.be.a('number');
        erlang.mean.should.equal(0.5);
        erlang.refresh(0.6, 3);
        expect(erlang.mean).to.be.a('number');
        expect(erlang.mean).to.be.closeTo(1.8, 0.005);
    });
    it('should return different values each time', () => {
        let erlang = new Erlang(3, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = erlang.random();
            expect(erlang.random()).to.be.a('number');
            erlang.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let erlang = new Erlang(3, 2),
            randomArray = erlang.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Gamma distribution
describe('Gamma distribution', () => {
    let Gamma = require('../lib/methods/gamma');
    it('requires two numerical arguments with alpha > 0 and beta > 0', () => {
        let zeroParams = () => {
            let gamma = new Gamma();
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let gamma = new Gamma(0.5);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let gamma = new Gamma('a', 'b');
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let gamma = new Gamma(1, -1);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsGammaToZero = () => {
            let gamma = new Gamma(1, 0);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        badParamsGammaToZero.should.throw(Error);

        let badParamsLess2 = () => {
            let gamma = new Gamma(-1, 1);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        badParamsLess2.should.throw(Error);

        let badParamsGammaToZero2 = () => {
            let gamma = new Gamma(0, 1);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        badParamsGammaToZero2.should.throw(Error);

        let twoParams =  () => {
            let gamma = new Gamma(2, 0.5);
            if(gamma.isError())
                throw new Error(gamma.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let gamma = new Gamma(2, 2);
        expect(gamma).to.have.property('random');
        expect(gamma).to.respondsTo('random');
        expect(gamma).to.have.property('distribution');
        expect(gamma).to.respondsTo('distribution');
        expect(gamma).to.have.property('refresh');
        expect(gamma).to.respondsTo('refresh');
        expect(gamma).to.have.property('isError');
        expect(gamma).to.respondsTo('isError');
    });
    it('should have values for initial alpha = 1 and beta = 1 equals to alpha = 2 and beta = 3 after .refresh(2, 3) method',() => {
        let gamma = new Gamma(1, 1);
        gamma.alpha.should.equal(1);
        gamma.beta.should.equal(1);
        gamma.refresh(2, 3);
        gamma.alpha.should.equal(2);
        gamma.beta.should.equal(3);
    });
    it('should have mean value for alpha = 1 and beta = 0.5 equals to 2, but for alpha = 3 and beta = 2 equals to 1.5',() => {
        let gamma = new Gamma(1, 0.5);
        expect(gamma.mean).to.be.a('number');
        expect(gamma.mean).to.be.closeTo(2, 0.005);
        gamma.refresh(3, 2);
        expect(gamma.mean).to.be.a('number');
        expect(gamma.mean).to.be.closeTo(1.5, 0.005);
    });
    it('should return different values each time', () => {
        let gamma = new Gamma(3, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = gamma.random();
            expect(gamma.random()).to.be.a('number');
            gamma.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let gamma = new Gamma(3, 2),
            randomArray = gamma.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(300);
    });
});

// Geometric distribution
describe('Geometric distribution', () => {
    let Geometric = require('../lib/methods/geometric');
    it('requires one numerical argument with 0 <= p <= 1', () => {
        let zeroParams = () => {
            let geometric = new Geometric();
            if(geometric.isError())
                throw new Error(geometric.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let geometric = new Geometric(0.5);
            if(geometric.isError())
                throw new Error(geometric.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let geometric = new Geometric('a');
            if(geometric.isError())
                throw new Error(geometric.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let geometric = new Geometric(-1);
            if(geometric.isError())
                throw new Error(geometric.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsGreat = () => {
            let geometric = new Geometric(1.1);
            if(geometric.isError())
                throw new Error(geometric.isError());
        };
        badParamsGreat.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let geometric = new Geometric(0.6);
        expect(geometric).to.have.property('random');
        expect(geometric).to.respondsTo('random');
        expect(geometric).to.have.property('distribution');
        expect(geometric).to.respondsTo('distribution');
        expect(geometric).to.have.property('refresh');
        expect(geometric).to.respondsTo('refresh');
        expect(geometric).to.have.property('isError');
        expect(geometric).to.respondsTo('isError');
    });
    it('should have value for initial p = 0.6 equals to p = 0.7 after .refresh(0.7) method',() => {
        let geometric = new Geometric(0.6);
        geometric.successProb.should.equal(0.6);
        geometric.refresh(0.7);
        geometric.successProb.should.equal(0.7);
    });
    it('should have mean value for p = 0.6 equals to 1.66666..., but for p = 0.4 equals to 2.5',() => {
        let geometric = new Geometric(0.6);
        expect(geometric.mean).to.be.a('number');
        expect(geometric.mean).to.be.closeTo(1.666, 0.002);
        geometric.refresh(0.4);
        expect(geometric.mean).to.be.a('number');
        expect(geometric.mean).to.be.closeTo(2.5, 0.002);
    });
    it('should return few different values with 10 experiments', () => {
        let geometric = new Geometric(0.6),
            value1,
            countRandoms = {};
        for(let i = 0; i < 10; i += 1){
            value1 = geometric.random();
            expect(geometric.random()).to.be.a('number');
            countRandoms[value1] = 1;
        }
        expect(Object.keys(countRandoms).length).to.be.at.least(2);
    });
    it('should generate an array with random values with length of 500', () => {
        let geometric = new Geometric(0.6),
            randomArray = geometric.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.9;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(3);
    });
    it('should generate only integer values', () => {
        let geometric = new Geometric(0.4),
            randomArray = geometric.distribution(100),
            correct = true;
        for(let rand of randomArray) {
            if(parseInt(rand) !== rand){
                correct = false;
                break;
            }
        }
        expect(correct).to.be.equal(true);
    });
});

// Negative Binomial distribution
describe('Negative Binomial distribution', () => {
    let NegativeBinomial = require('../lib/methods/negativebinomial');
    it('requires two numerical arguments with n > 0 and 0 <= p <= 1', () => {
        let zeroParams = () => {
            let negativeBinomial = new NegativeBinomial();
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let negativeBinomial = new NegativeBinomial(0.5);
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let negativeBinomial = new NegativeBinomial('a', 'b');
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let negativeBinomial = new NegativeBinomial(-1, 0.5);
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsLess2 = () => {
            let negativeBinomial = new NegativeBinomial(1, -1);
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        badParamsLess2.should.throw(Error);

        let badParamsGreat = () => {
            let negativeBinomial = new NegativeBinomial(2, 2);
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        badParamsGreat.should.throw(Error);

        let twoParams =  () => {
            let negativeBinomial = new NegativeBinomial(2, 0.5);
            if(negativeBinomial.isError())
                throw new Error(negativeBinomial.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let negativeBinomial = new NegativeBinomial(2, 0.6);
        expect(negativeBinomial).to.have.property('random');
        expect(negativeBinomial).to.respondsTo('random');
        expect(negativeBinomial).to.have.property('distribution');
        expect(negativeBinomial).to.respondsTo('distribution');
        expect(negativeBinomial).to.have.property('refresh');
        expect(negativeBinomial).to.respondsTo('refresh');
        expect(negativeBinomial).to.have.property('isError');
        expect(negativeBinomial).to.respondsTo('isError');
    });
    it('should have values for initial r = 1 and p = 0.6 equals to r = 2 and p = 0.7 after .refresh(2, 0.7) method',() => {
        let negativeBinomial = new NegativeBinomial(1, 0.6);
        negativeBinomial.numberFailures.should.equal(1);
        negativeBinomial.successProb.should.equal(0.6);
        negativeBinomial.refresh(2, 0.7);
        negativeBinomial.numberFailures.should.equal(2);
        negativeBinomial.successProb.should.equal(0.7);
    });
    it('should have mean value for r = 1 and p = 0.6 equals to 1.5, but for r = 2 and p = 0.4 equals to 1.33333...',() => {
        let negativeBinomial = new NegativeBinomial(1, 0.6);
        expect(negativeBinomial.mean).to.be.a('number');
        expect(negativeBinomial.mean).to.be.closeTo(1.5, 0.002);
        negativeBinomial.refresh(2, 0.4);
        expect(negativeBinomial.mean).to.be.a('number');
        expect(negativeBinomial.mean).to.be.closeTo(1.333, 0.002);
    });
    it('should return few different values with 10 experiments', () => {
        let negativeBinomial = new NegativeBinomial(2, 0.6),
            value1,
            countRandoms = {};
        for(let i = 0; i < 10; i += 1){
            value1 = negativeBinomial.random();
            expect(negativeBinomial.random()).to.be.a('number');
            countRandoms[value1] = 1;
        }
        expect(Object.keys(countRandoms).length).to.be.at.least(2);
    });
    it('should generate an array with random values with length of 500', () => {
        let negativeBinomial = new NegativeBinomial(1, 0.5),
            randomArray = negativeBinomial.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.9;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(3);
    });
    it('should generate only integer values', () => {
        let negativeBinomial = new NegativeBinomial(2, 0.4),
            randomArray = negativeBinomial.distribution(100),
            correct = true;
        for(let rand of randomArray) {
            if(parseInt(rand) !== rand){
                correct = false;
                break;
            }
        }
        expect(correct).to.be.equal(true);
    });
});

// Poisson distribution
describe('Poisson distribution', () => {
    let Poisson = require('../lib/methods/poisson');
    it('requires one numerical argument with lambda > 0', () => {
        let zeroParams = () => {
            let poisson = new Poisson();
            if(poisson.isError())
                throw new Error(poisson.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let poisson = new Poisson(0.5);
            if(poisson.isError())
                throw new Error(poisson.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let poisson = new Poisson('a');
            if(poisson.isError())
                throw new Error(poisson.isError());
        };
        badParams.should.throw(Error);

        let badParamsLess1 = () => {
            let poisson = new Poisson(-1);
            if(poisson.isError())
                throw new Error(poisson.isError());
        };
        badParamsLess1.should.throw(Error);

        let badParamsLambdaToZero = () => {
            let poisson = new Poisson(0);
            if(poisson.isError())
                throw new Error(poisson.isError());
        };
        badParamsLambdaToZero.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let poisson = new Poisson(2);
        expect(poisson).to.have.property('random');
        expect(poisson).to.respondsTo('random');
        expect(poisson).to.have.property('distribution');
        expect(poisson).to.respondsTo('distribution');
        expect(poisson).to.have.property('refresh');
        expect(poisson).to.respondsTo('refresh');
        expect(poisson).to.have.property('isError');
        expect(poisson).to.respondsTo('isError');
    });
    it('should have value for initial lambda = 1 equals to lambda = 2 after .refresh(2) method',() => {
        let poisson = new Poisson(1);
        poisson.lambda.should.equal(1);
        poisson.refresh(2);
        poisson.lambda.should.equal(2);
    });
    it('should have mean value equals to lambda',() => {
        let poisson = new Poisson(1);
        expect(poisson.mean).to.be.a('number');
        expect(poisson.mean).to.be.closeTo(1, 0.002);
        poisson.refresh(2);
        expect(poisson.mean).to.be.a('number');
        expect(poisson.mean).to.be.closeTo(2, 0.002);
    });
    it('should return few different values with 10 experiments', () => {
        let poisson = new Poisson(2),
            value1,
            countRandoms = {};
        for(let i = 0; i < 10; i += 1){
            value1 = poisson.random();
            expect(poisson.random()).to.be.a('number');
            countRandoms[value1] = 1;
        }
        expect(Object.keys(countRandoms).length).to.be.at.least(2);
    });
    it('should generate an array with random values with length of 500', () => {
        let poisson = new Poisson(2),
            randomArray = poisson.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.9;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(3);
    });
    it('should generate only integer values', () => {
        let poisson = new Poisson(2),
            randomArray = poisson.distribution(100),
            correct = true;
        for(let rand of randomArray) {
            if(parseInt(rand) !== rand){
                correct = false;
                break;
            }
        }
        expect(correct).to.be.equal(true);
    });
});

// Exponential distribution
describe('Exponential distribution', () => {
    let Exponential = require('../lib/methods/exponential');
    it('requires one numerical argument', () => {
        let zeroParams = () => {
            let exponential = new Exponential();
            if(exponential.isError())
                throw new Error(exponential.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let exponential = new Exponential(0.5);
            if(exponential.isError())
                throw new Error(exponential.isError());
        };
        oneParam.should.not.throw(Error);

        let badParams = () => {
            let exponential = new Exponential('a');
            if(exponential.isError())
                throw new Error(exponential.isError());
        };
        badParams.should.throw(Error);

        let incorrectParamsSmaller = () => {
            let exponential = new Exponential(-1);
            if(exponential.isError())
                throw new Error(exponential.isError());
        };
        incorrectParamsSmaller.should.throw(Error);

        let incorrectParamsLambdaToZero = () => {
            let exponential = new Exponential(0);
            if(exponential.isError())
                throw new Error(exponential.isError());
        };
        incorrectParamsLambdaToZero.should.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let exponential = new Exponential(1);
        expect(exponential).to.have.property('random');
        expect(exponential).to.respondsTo('random');
        expect(exponential).to.have.property('distribution');
        expect(exponential).to.respondsTo('distribution');
        expect(exponential).to.have.property('refresh');
        expect(exponential).to.respondsTo('refresh');
        expect(exponential).to.have.property('isError');
        expect(exponential).to.respondsTo('isError');
    });
    it('should have "lambda" value for initial lambda = 0.5 equals to 1 after .refresh(1) method',() => {
        let exponential = new Exponential(0.5);
        exponential.lambda.should.equal(0.5);
        exponential.refresh(1);
        exponential.lambda.should.equal(1);
    });
    it('should have mean value equals to 1 / lambda',() => {
        let exponential = new Exponential(0.4);
        expect(exponential.mean).to.be.a('number');
        expect(exponential.mean).to.be.closeTo(2.5, 0.001);
        exponential.refresh(3);
        expect(exponential.mean).to.be.a('number');
        expect(exponential.mean).to.be.closeTo(0.333, 0.001);
    });
    it('should return different values each time', () => {
        let exponential = new Exponential(3),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = exponential.random();
            expect(exponential.random()).to.be.a('number');
            exponential.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let exponential = new Exponential(3),
            randomArray = exponential.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(200);
    });
});

// Extreme Value (Gumbel-type) distribution
describe('Extreme Value (Gumbel-type) distribution', () => {
    let ExtremeValue = require('../lib/methods/extremevalue');
    it('requires two numerical arguments with sigma > 0', () => {
        let zeroParams = () => {
            let extremevalue = new ExtremeValue();
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        zeroParams.should.throw(Error);

        let oneParam =  () => {
            let extremevalue = new ExtremeValue(0.5);
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        oneParam.should.throw(Error);

        let badParams = () => {
            let extremevalue = new ExtremeValue('a', 'b');
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        badParams.should.throw(Error);

        let incorrectParamsSmaller = () => {
            let extremevalue = new ExtremeValue(1, -1);
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        incorrectParamsSmaller.should.throw(Error);

        let incorrectParamsLambdaToZero = () => {
            let extremevalue = new ExtremeValue(1, 0);
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        incorrectParamsLambdaToZero.should.throw(Error);

        let twoParams = () => {
            let extremevalue = new ExtremeValue(1, 1);
            if(extremevalue.isError())
                throw new Error(extremevalue.isError());
        };
        twoParams.should.not.throw(Error);
    });
    it('should has methods: .random, .distribution, .refresh, .isError', () => {
        let extremevalue = new ExtremeValue(1, 1);
        expect(extremevalue).to.have.property('random');
        expect(extremevalue).to.respondsTo('random');
        expect(extremevalue).to.have.property('distribution');
        expect(extremevalue).to.respondsTo('distribution');
        expect(extremevalue).to.have.property('refresh');
        expect(extremevalue).to.respondsTo('refresh');
        expect(extremevalue).to.have.property('isError');
        expect(extremevalue).to.respondsTo('isError');
    });
    it('should have "mu" and "sigma" values for initial mu = 0.5 and sigma = 0.5 equals to 1 and 1 after .refresh(1, 1) method',() => {
        let extremevalue = new ExtremeValue(0.5, 0.5);
        extremevalue.mu.should.equal(0.5);
        extremevalue.sigma.should.equal(0.5);
        extremevalue.refresh(1, 1);
        extremevalue.mu.should.equal(1);
        extremevalue.sigma.should.equal(1);
    });
    it('should return different values each time', () => {
        let extremevalue = new ExtremeValue(3, 2),
            value1;
        for(let i = 0; i < 10; i += 1){
            value1 = extremevalue.random();
            expect(extremevalue.random()).to.be.a('number');
            extremevalue.random().should.not.equal(value1);
        }
    });
    it('should generate an array with random values with length of 500', () => {
        let extremevalue = new ExtremeValue(3, 2),
            randomArray = extremevalue.distribution(500),
            countDiffs = 0,
            last,
            delta = 0.2;
        // Check all values
        randomArray.map(rand => {
            if(last && Math.abs(rand - last) > delta){
                countDiffs += 1;
            }
            last = rand;
        });
        expect(randomArray).to.be.an('array');
        expect(randomArray).to.have.lengthOf(500);
        expect(countDiffs).to.be.at.least(200);
    });
});