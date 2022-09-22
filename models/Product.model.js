const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide Product name'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide Description about it'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Customer',
    //   required: [true, 'Please provide OwnerId'],
    // },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)