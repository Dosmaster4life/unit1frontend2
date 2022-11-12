function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Bad Response');
    }
  }

export default class ProductData  {
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
    }
    getData() {
      // const res = await fetch(this.path);
      // const data = await convertToJson(res);
      // return data;
      return fetch (this.path)
        .then(convertToJson).then((data) => data);
    }
    async findProductById(id) {
      const product = await this.getData();
      return product.find((item) => item.Id === id);
    }
  }
