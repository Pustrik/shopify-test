import ProductService from "../services/product.service";
import MetadataService, {IMetadata} from "../services/metadata.service";

export default class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly metadataService: MetadataService,
    ) {}
    createProduct = async (req, res) => {
        try {
            await this.productService.createProduct({title: req.body.title, tags: req.body.tags})
            const product = await this.productService.findProductByTitle(req.body.title);
            const metaValues = {
                "aaa": req.body.tags.filter(tag => tag !== "111"),
                "bbb": req.body.tags.filter(tag => tag !== "222"),
                "ccc": req.body.tags.filter(tag => tag !== "333"),
                "ddd": req.body.tags.filter(tag => tag !== "444"),
                "eee": req.body.tags.filter(tag => tag !== "555")
            };
            const newMetadata: IMetadata = {
                type: 'json',
                owner_resource: 'product',
                key: 'test_meta',
                namespace: 'custom',
                value: JSON.stringify(metaValues),
                owner_id: product[0].id,
            }
            await this.metadataService.setMetadata(newMetadata);

            res.json({ success: true });
        } catch (e) {
            console.log(e)
            return res.status(500).json({ success: false, error: e.message });
        }
    }
}