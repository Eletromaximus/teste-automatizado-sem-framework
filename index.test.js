import assert from 'assert'
import Product from './product.js'
import Service from './service.js'

const callTracker = new assert.CallTracker()

process.on('exit',() => callTracker.verify())

// should throw an error when description is less than 5 characters long
{
  const params = {
    description: 'my',
    id: 1,
    price: 1000
  }

  const product = new Product({
    onCreate: () => {},
    service: new Service()
  })

  assert.rejects(
    () => product.create(params),
    { message: 'description must be higher than 5'},
    'it should throw an error with wrong description'
  )
  // product.create(params)
}
// Mock => o que precisamos validar
{
  const params = {
    description: 'my product',
    id: 1,
    price: 1000
  }

  // serviceStub = impedir que seja Online
  const spy = callTracker.calls(1)
  const serviceStub = {
    async save(params) {
      //espiona a função
      spy(params)
      return `${params.id} saved with sucess`
    }
  }

  const fn = (msg) => {
    assert.deepStrictEqual(msg.id, params.id, 'id should be the same')
    assert.deepStrictEqual(msg.price, params.price, 'price should be the same')
    assert.deepStrictEqual(msg.description, params.description.toUpperCase(), 'description should be the UpperCase')
  }

  const spyOnCreate = callTracker.calls(fn, 1)

  const product = new Product({
    onCreate: spyOnCreate,
    // aqui fazemos o STUB
    service: serviceStub
  })

  const result = await product.create(params)
  assert.deepStrictEqual(result, `${params.id} SAVED WITH SUCESS`)
}