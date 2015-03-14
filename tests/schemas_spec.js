import Extractor from '../utils/Extractor';

import '../utils/setup';

// Can't use arrow function here as it won't work with the this.timeout
describe('Schemas endpoint', function () {
    let demo;
    let trunk;

    //Increase the timeout because we test against real data
    this.timeout(10000);

    before(() => {
        demo =  new Extractor(global.schemas.firstRaw);
        trunk = new Extractor(global.schemas.secondRaw);
    });

    it('should contain the same amount of schemas', () => {
        expect(demo.response.length).to.equal(trunk.response.length);
    });

    it('should have the same meta data for each of the schemas', () => {
        expect(demo.meta()).to.deep.equal(trunk.meta());
    });

    it('should have the same schema names', () => {
        expect(demo.get()).to.deep.equal(trunk.get());
    });

    it('should have the same properties on the schemas', () => {
        expect(demo.get('properties')).to.deep.equal(trunk.get('properties'));
    });

    it('should have the same authorities on the schemas', () => {
        expect(demo.get('authorities')).to.deep.equal(trunk.get('authorities'));
    });

    it('should have same endpoint names', () => {
        expect(demo.get('apiEndpoint')).to.deep.equal(trunk.get('apiEndpoint'));
    });
});
