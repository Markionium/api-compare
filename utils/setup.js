import D2Api from '../utils/D2Api';
import EndPointComparer from '../utils/EndPointComparer';
import _ from 'lodash';

global.chai = require('chai');
global.expect = global.chai.expect;

before((done) => {
    let apiOne = new D2Api('https://apps.dhis2.org/dev/api/', {username: 'admin', password: 'district'});
    let apiTwo = new D2Api('http://localhost:8080/dhis/api/', {username: 'markpo', password: 'Markpo1234'});

    global.comparer = new EndPointComparer(apiOne, apiTwo);

    global.comparer.compare('schemas')
        .then((responses) => {
            global.schemas = {
                first: buildSchemaArray(responses[0]),
                second: buildSchemaArray(responses[1]),
                firstRaw: responses[0],
                secondRaw: responses[1]
            };
            done();
        })
        .catch((error) => {
            console.log('Failed to load the schemas for both apis');
            console.log(error);
            done();
        });
});

function buildSchemaArray(schemas) {
    return _.chain(schemas)
        .map((schema) => {
            return {
                name: schema.name,
                schema: schema
            };
        })
        .sortBy('name')
        .value();
}
