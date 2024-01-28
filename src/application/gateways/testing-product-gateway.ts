import { InternalServerError } from '../errors/internal-server-error'
import { InvalidResponseError } from '../errors/invalid-response-error'
import { Product, ProductGateway } from './product-gateway'
import { products as productFake } from '@/db/db.json'

export class TestingProductGateway implements ProductGateway {
  public shouldThrowErrorIfServerIsDown = false
  public shouldThrowErrorIfResponseIsNotOk = false

  async getProducts(): Promise<Product[]> {
    if (this.shouldThrowErrorIfServerIsDown) throw new InternalServerError()
    if (this.shouldThrowErrorIfResponseIsNotOk) throw new InvalidResponseError()
    return productFake
  }
}
