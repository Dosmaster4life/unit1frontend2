export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        const template = document.getElementById('product-card-template');
        list.forEach(product => {
            const clone = template.contentEditable.cloneNode(true);
            const hydratedTemplate = this.prepareTemplate(clone, product);
            this.listElement.appendChild(hydratedTemplate);
        })
    }
    prepareTemplate(template, product) {
        template.querySelector('a').href += product.Id;
        template.querySelector('img').src = product.Image;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').value = product.Brand.Name;
        template.querySelector('.card__name').value = product.Name;
        template.querySelector('.product-card__price').value += product.SuggestedRetailPrice;
    }
}