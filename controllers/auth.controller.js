const Customer = require('../models/Customer.model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const asyncWrapper = require("../middleware/async");
const Producer = require('../utility/producer')
const producer = new Producer()


const register = asyncWrapper( async (req, res) => {
  const customer = await Customer.create(req.body)
  const token = customer.createJWT()
  await producer.publisher(customer);
  
  res.status(StatusCodes.CREATED).json({
    
    msg: "Customer has been signUp successfully",
    status: StatusCodes.CREATED,
    customer: { email: customer.email },
    token,
  });
 
})



const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const customer = await Customer.findOne({ email })
  if (!customer) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await customer.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = customer.createJWT()
  res.status(StatusCodes.OK).json({ cutomer: { customer: customer.email }, token })
})

module.exports = {
  register,
  login,
}



module.exports = {
  register,
  login,
}
