import { createBook, getAllBooks } from '../controller/bookController.js'

import express from 'express'
const router = express.Router()

router.post('/scrape/books', createBook)
router.get('/', getAllBooks)

export default router
