export class InvalidResponseError extends Error {
  constructor() {
    super('Invalid Response')
    this.name = 'InvalidResponseError'
  }
}
