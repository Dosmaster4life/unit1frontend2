const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw {name: 'servicesError', message: data};
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