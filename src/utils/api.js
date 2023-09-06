export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    saveCongif(data) {
        return fetch(`${this._baseUrl}/messageConfig`, {
            method: 'POST',
            headers: {
                ...this._headers
            },
            credentials: 'include',
            body: JSON.stringify({
                messageText : data.messageText,
                channel : data.channel,
                display: data.display,
                hotKeys: data.hotKeys
            })
        })
        .then(this._getResponseData)
    }
}

const apiMain = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default apiMain;