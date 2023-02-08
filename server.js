import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import connectDB from './db/connect.js'

import bookRoutes from './routes/bookRoutes.js'

app.use('/api/v1', bookRoutes)

const port = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB(process.env.DB)
    app.listen(port, () => {
      console.log('Server is running on port ' + port + '...')
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
