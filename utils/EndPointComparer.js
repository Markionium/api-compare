class EndPointComparer {
    constructor(firstApi, secondApi) {
        this.firstApi = firstApi;
        this.secondApi = secondApi;
    }
    compare(endPointName) {
        return this.getResponsesFromEndPoints(endPointName)
            .then(function (responses) {
                let [firstResult, secondResult] = responses;

                return [firstResult, secondResult];
            });
    }

    getResponsesFromEndPoints(endPointName) {
        function extractResponse(response) {
            return response;
        }

        let firstResponse = this.firstApi.get(endPointName)
            .then(extractResponse, extractResponse);

        let secondResponse = this.secondApi.get(endPointName)
            .then(extractResponse, extractResponse);

        return Promise.all([firstResponse, secondResponse]);
    }
}

export default EndPointComparer;
