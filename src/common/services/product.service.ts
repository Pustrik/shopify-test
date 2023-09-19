import MetadataService from "./metadata.service";
import {RestResources} from "@shopify/shopify-api/rest/admin/2022-04";
import {Session, Shopify} from "@shopify/shopify-api";

interface IProduct {
    title: string,
    tags: [],
}

export default class ProductService {
    constructor(
        private readonly shopify: Shopify,
        private readonly session: Session,
    ) {}

    createProduct = async (product: IProduct) => {
        const newProduct = new this.shopify.rest.Product({session: this.session});
        newProduct.title = product.title;
        newProduct.tags = product.tags;
        return newProduct.save({update: true});
    }

    findProductByTitle = async (title: string) => {
        const products = await this.shopify.rest.Product.all({session: this.session})
        return products.data.filter((prod) => prod.title === title)
    }


}