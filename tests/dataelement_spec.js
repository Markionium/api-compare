import Extractor from '../utils/Extractor';

import '../utils/setup';

describe('Data Element', () => {
    let first;
    let second;

    before((done) => {
        global.comparer.compare('dataElements')
            .then((responses) => {
                first = new Extractor(responses[0].data);
                second = new Extractor(responses[1].data);
                done();
            })
            .catch((error) => {
                console.log('Failed to load dataElements');
                console.log(error);
                done();
            });
    });

    it('should return the default page size of 50', () => {
        expect(first.response.dataElements.length).to.equal(50);
        expect(first.response.dataElements.length).to.equal(second.response.dataElements.length);
    });

    it('should contain a pager with the same keys', () => {
        expect(first.response.pager).to.not.be.undefined;
        expect(second.response.pager).to.not.be.undefined;
        expect(Object.keys(first.response.pager)).to.deep.equal(Object.keys(second.response.pager));
    });
});
