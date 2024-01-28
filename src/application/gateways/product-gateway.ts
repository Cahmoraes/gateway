export interface Product {
  name: string
  quantity: number
}

export interface ProductGateway {
  getProducts(): Promise<Product[]>
}
