import express from "express";
import '@shopify/shopify-api/adapters/node';
import config from './common/config/shopify.config'
import {shopifyApi} from "@shopify/shopify-api";
import ProductController from "./common/controller/product.controller";
import ProductService from "./common/services/product.service";
import MetadataService, {IMetadata} from "./common/services/metadata.service";
require('dotenv').config()
const { API_PORT, API_HOST, HOST_NAME } = process.env
const app = express();

async function bootstrap() {
    app.use(express.json());
    app.listen(API_PORT, () => {
        console.log(`Server is running at ${API_HOST}:${API_PORT}`);
    });

    const shopify = shopifyApi(config)
    const session = shopify.session.customAppSession(HOST_NAME)

    const productController = new ProductController(new ProductService(shopify, session), new MetadataService(shopify, session))

    app.post('/create-product', productController.createProduct);

}
bootstrap();
