import {ApiVersion} from "@shopify/shopify-api";
import {restResources} from "@shopify/shopify-api/rest/admin/2023-04";

require('dotenv').config()

const { API_ADMIN_ACCESS_TOKEN, API_SECRET_KEY, HOST_NAME, API_KEY } = process.env

export default {
    hostName: HOST_NAME,
    apiKey: API_KEY,
    apiSecretKey: API_SECRET_KEY,
    adminApiAccessToken: API_ADMIN_ACCESS_TOKEN,
    apiVersion: ApiVersion.April23,
    isEmbeddedApp: false,
    isCustomStoreApp: true,
    restResources
}