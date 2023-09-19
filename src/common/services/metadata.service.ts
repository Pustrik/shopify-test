import {Session, Shopify} from "@shopify/shopify-api";
import {RestResources} from "@shopify/shopify-api/rest/admin/2022-04";

export interface IMetadata {
    owner_resource: string,
    key: string,
    namespace: string,
    value: string,
    owner_id: number,
    type: string,
}

export default class MetadataService {
    constructor(
        private readonly shopify: Shopify,
        private readonly session: Session,
    ) {}

    setMetadata = async (metadata: IMetadata) => {
        const meta = new this.shopify.rest.Metafield({session: this.session});
        meta.owner_resource = metadata.owner_resource;
        meta.key = metadata.key;
        meta.namespace = metadata.namespace;
        meta.value = metadata.value;
        meta.owner_id = metadata.owner_id;
        meta.type = metadata.type;
        return meta.save({update: true});
    }
}