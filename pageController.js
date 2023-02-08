import pageScaper from './pageScraper.js'

const scrapeAll = async (browserInstance) => {
  let browser
  try {
    browser = await browserInstance
    const scrapedResult = await pageScaper.scraper(browser)
    return scrapedResult
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}

export default scrapeAll
