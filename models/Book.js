import mongoose, { Schema } from 'mongoose'

const BookSchema = new Schema(
  {
    title: String,
    price: Number,
  },
  { timestamps: true }
)

export default mongoose.model('Book', BookSchema)
