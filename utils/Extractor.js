let _ = require('lodash');

class Extractor {
    constructor(data) {
        this.response = data;
    }

    get(properties) {
        return _.chain(this.response)
            .map((schema) => {
                let values =  _.pick(schema, ['name', properties]);
                Object.keys(values).forEach((property) => {
                    if (_.isArray(values[property])) {
                        let sortOn = 'type';
                        if (values[property][0] && values[property][0].name) {
                            sortOn = 'name';
                        }
                        values[property] = _.sortBy(values[property], sortOn);
                    }
                });
                return values;
            })
            .sortBy('name')
            .value();
    }

    meta() {
        return _.chain(this.response)
            .cloneDeep()
            .map((schema) => {
                return _.omit(schema, _.isArray);
            })
            .sortBy('name')
            .value();
    }
}

export default Extractor;
