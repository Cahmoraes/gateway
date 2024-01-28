import { InternalServerError } from './errors/internal-server-error'
import { InvalidResponseError } from './errors/invalid-response-error'
import { TestingProductGateway } from './gateways/testing-product-gateway'
import { GetProducts } from './get-products'
import { products as productFake } from '@/db/db.json'

describe('getProducts', () => {
  let getProducts: GetProducts
  let productGateway: TestingProductGateway
  beforeEach(() => {
    productGateway = new TestingProductGateway()
    getProducts = new GetProducts(productGateway)
  })

  test('Deve criar uma instância de GetProducts', () => {
    expect(getProducts).toBeInstanceOf(GetProducts)
  })

  test('Deve retornar uma lista de produtos', async () => {
    const products = await getProducts.execute()
    expect(products).toBeInstanceOf(Array)
    expect(products).toEqual(productFake)
  })

  test('Deve gerar uma exceção InternalServerError quando o servidor estiver fora do ar', async () => {
    productGateway.shouldThrowErrorIfServerIsDown = true
    await expect(getProducts.execute()).rejects.toThrow(InternalServerError)
  })

  test('Deve gerar uma exceção InvalidResponseError quando o servidor retornar um código de erro', () => {
    productGateway.shouldThrowErrorIfResponseIsNotOk = true
    expect(async () => await getProducts.execute()).rejects.toThrow(
      InvalidResponseError,
    )
  })
})
