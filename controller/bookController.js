import Book from '../models/Book.js'
import startBrowser from '../browser.js'
import scrapeAll from '../pageController.js'

const createBook = async (req, res) => {
  try {
    const browserInstance = await startBrowser()
    const data = await scrapeAll(browserInstance)

    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
  }
}

export { createBook }
