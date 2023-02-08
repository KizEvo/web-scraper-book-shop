const bookUrlsScrape = async (page) => {
  await page.waitForSelector('.page_inner')
  // Get the link to all the required books, $$eval pass Array.form(document.querySelectorAll) as first argument to callback
  const urls = await page.$$eval('section ol > li', (links) => {
    // Make sure the book to be scraped is in stock
    links = links.filter(
      (link) =>
        link.querySelector('.instock.availability > i').textContent !==
        'In stock'
    )
    // Extract the links from the data
    links = links.map((el) => el.querySelector('h3 > a').href)
    return links
  })

  return urls
}

export default bookUrlsScrape
