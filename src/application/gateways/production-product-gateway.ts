import { InternalServerError } from '../errors/internal-server-error'
import { InvalidResponseError } from '../errors/invalid-response-error'
import { Product, ProductGateway } from './product-gateway'

export class ProductionProductGateway implements ProductGateway {
  async getProducts(): Promise<Product[]> {
    return this.performGetProduct()
  }

  private async performGetProduct() {
    try {
      const response = await fetch('http://localhost:3000/products')
      this.throwErrorIfResponseIsNotOk(response)
      return response.json()
    } catch (error) {
      if (!(error instanceof InvalidResponseError)) {
        throw new InternalServerError()
      }
      throw error
    }
  }

  private throwErrorIfResponseIsNotOk(response: Response) {
    if (!response.ok) throw new InvalidResponseError()
  }
}
