import bookDetailScrape from './scrape/book-detail-scrape.js'
import bookUrlsScrape from './scrape/book-url-scrape.js'
import monthFormatIndex from './utils/monthFormatIndex.js'

const scraperObject = {
  url: 'http://books.toscrape.com',
  async scraper(browser) {
    let page = await browser.newPage()
    console.log(`Navigating to ${this.url}...`)
    await page.goto(this.url)

    const pageCreatedDate = await page.$eval(
      'head > meta:nth-child(3)',
      (element) => element.content.split(' ')
    )

    // const dateFormatted = {
    //   days: pageCreatedDate[0].replace(/[A-Za-z]+$/, ''),
    //   month: monthFormatIndex(pageCreatedDate[1]),
    //   year: pageCreatedDate[2],
    // }
    // console.log(dateFormatted)

    const paginationPages = await page.$eval(
      'ul > li.current',
      (element) => element.textContent
    )
    const totalPages = paginationPages.trim().split(' ').pop()

    const bookStacks = []

    // Get urls -> scrape books detail -> push data to array -> navigate to new pagination -> repeat
    for (let i = 0; i < 1; i++) {
      const bookUrlsData = await bookUrlsScrape(page)
      const bookDetailData = await bookDetailScrape(bookUrlsData, browser)

      bookStacks.push(bookDetailData)

      await Promise.all([page.waitForNavigation(), page.click('li.next > a')])
    }

    console.log('Done, closing browser...')
    await browser.close()

    return bookStacks
  },
}

export default scraperObject
