import mongoose, { Schema } from 'mongoose'

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

BookSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
export default mongoose.model('Book', BookSchema)
