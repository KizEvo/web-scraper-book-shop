import Book from '../models/Book.js'
import startBrowser from '../browser.js'
import scrapeAll from '../pageController.js'

const createBook = async (req, res) => {
  try {
    const browserInstance = await startBrowser()
    const data = await scrapeAll(browserInstance)

    if (data.length === 0) throw new Error('Book scraper failed to get data')

    // const randomPrice = Math.random() + 1
    // const bookObj = {
    //   title: 'First Book',
    //   price: randomPrice,
    //   expireAt: new Date(2023, 1, 10, 12, 45, 0), //new Date(Year, Month (Index: 0-11), Day, Hour, Minute, Second), GMT +0
    // }

    // const bookCreated = await Book.create(bookObj)

    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({})

    if (!books) throw new Error('No existing books yet')

    res.status(200).json({ books })
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}

export { createBook, getAllBooks }
