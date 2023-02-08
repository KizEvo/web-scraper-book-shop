const bookDetailScrape = async (urls, browser) => {
  const dataArray = []
  try {
    console.log('Navigating to new single product page...')
    for (let i = 0; i < urls.length; i++) {
      let currentData = await bookPagePromise(urls[i], browser)
      dataArray.push(currentData)
      console.log(`Finished the ${i} page`)
    }
  } catch (error) {
    console.log(error)
  }
  return dataArray
}

const bookPagePromise = async (link, browser) => {
  const dataObject = {}
  let newPage = await browser.newPage()
  await newPage.goto(link)

  dataObject.title = await newPage.$eval(
    '.product_main > h1',
    (element) => element.textContent
  )
  dataObject.price = await newPage.$eval(
    '.product_main > p.price_color',
    (element) => element.textContent
  )
  dataObject.imgUrl = await newPage.$eval(
    '#product_gallery img',
    (img) => img.src
  )
  dataObject.description = await newPage.$eval(
    '#product_description',
    (element) => element.nextElementSibling.textContent
  )

  await newPage.close()

  return new Promise((resolve, reject) => {
    if (
      dataObject.title &&
      dataObject.price &&
      dataObject.imgUrl &&
      dataObject.description
    )
      resolve(dataObject)
    else reject(new Error('Something went wrong'))
  })
}

export default bookDetailScrape
