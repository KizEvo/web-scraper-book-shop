import { createBook } from '../controller/bookController.js'

import express from 'express'
const router = express.Router()

router.get('/scrape/books', createBook)

export default router
