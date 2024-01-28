import { Product, ProductGateway } from './gateways/product-gateway'

export class GetProducts {
  constructor(private productGateway: ProductGateway) {}

  public async execute(): Promise<Product[]> {
    return this.productGateway.getProducts()
  }
}
