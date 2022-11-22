const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Bad Response');
    }
  }

export default class ExternalServices  {
    constructor() {
        
    }
    async getData(category) {
      return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
    }
    async findProductById(id) {
      return await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
    }
    async checkout(payload) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}