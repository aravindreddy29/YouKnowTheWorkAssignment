import {BrowserRouter} from 'react-router-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import userEvent from '@testing-library/user-event'
import * as fs from 'fs'
import path from 'path'

import App from '../App'

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/ProductItemDetails/index.js'),
  'utf8',
)

const productDetailsPath = '/products/16'

const productDetailsResponse = {
  id: 16,
  image_url:
    'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-simple-formal.png',
  title: 'Embroidered Net Gown',
  price: 62990,
  description:
    'Color, style and ceremonial importance of the gown. Enhance your beauty by after wearing this Vibrant,Gorgeous and beautiful Wedding Gown. ',
  brand: 'Manyavar',
  total_reviews: 879,
  rating: 3,
  availability: 'In Stock',
  similar_products: [
    {
      id: 1,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-cap.png',
      title: 'Wide Bowknot Hat',
      style: 'Wide Bowknot Hat for Women and Girls (Multicolor)',
      price: 288,
      description:
        'Classy Hat For Multipurpose Use. Soft straw material, convenient for travel. Finished with light and airy woven material, durable and comfortable to wear. One Size Fits All Age Group Above 14 Years. Stay protected from the sun while sporting one of the hottest trends this season. Perfect for you to wear at the beach, pool, party, etc.',
      brand: 'MAJIK',
      total_reviews: 245,
      rating: 4.6,
      availability: 'In Stock',
    },
    {
      id: 2,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-fit-t-shirt.png',
      title: 'Plain Round Neck T-shirt',
      style: 'Plain Round Neck T-shirt',
      price: 495,
      description:
        'Basic Round Neck T-shirts from Huetrap. These T-shirts can be worn as daily wear or can be worn during your Morning walk, Running/Jogging, and also during your Exercise and Workouts in the Gym. These can also be worn as Casual Wear for all your Outings. These T-shirts are stitched for higher durability using the best technology in the industry. After stitching, these products are quality checked for Size and any kinds of defects before packing. This assures the best of Quality and Value for money. Manufactured from Cotton fabric, these T-shirts are very smooth and soft, making them comfortable to wear during all seasons. This fabric is Durable, Odourless, and passed through Anti fading treatment that ensures the T-shirt color to be intact even after repeated washes.',
      brand: 'Huetrap',
      total_reviews: 120,
      rating: 4.1,
      availability: 'In Stock',
    },
    {
      id: 3,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png',
      title: 'Cotton Hoodie',
      style: "Scott International Men's Cotton Hooded Hoodies",
      price: 498,
      description:
        'Shop from a wide range of hoodies from Scott International Perfect for your everyday use, you could layer them over a stylish T-Shirt, Polo, or Casual shirt to complete the look. Care Instructions: Do Not Bleach. Wash with similar colors. Machine wash cold.',
      brand: 'Scott International',
      total_reviews: 229,
      rating: 4.8,
      availability: 'In Stock',
    },
  ],
}

const server = setupServer(
  rest.get('https://apis.ccbp.in/products/:id', (req, res, ctx) =>
    res(ctx.json(productDetailsResponse)),
  ),
)

const mockGetCookie = (nonPrime = true) => {
  let mockedGetCookie
  if (nonPrime) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalConsoleError = console.error

describe(':::RJSCP809S4_TEST_SUITE_2:::Product Item Details Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCP809S4_TEST_6:::Page should consist of at least two HTML list items and the similarProductsList received from the response should be rendered using a unique key as a prop for each similar product item respectively :::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    console.error = originalConsoleError
  })

  it(':::RJSCP809S4_TEST_7:::When the Product Item Details Route is opened, an HTTP GET request should be made to productDetailsApiUrl with the product "id" as path parameter:::5:::', async () => {
    mockGetCookie()
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(productDetailsResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(
      'https://apis.ccbp.in/products/16',
    )
    window.fetch = originalFetch
  })

  it(':::RJSCP809S4_TEST_8:::When the Product Item Details Route is opened, an HTML container element with data-testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_9:::When the HTTP GET request in the Product Item Details Route is successful, then the page should consist of the HTML image elements with alt attribute value as "product" and src as the value of key "image_url" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const productImg = screen.getByRole('img', {
      name: /^product/i,
      exact: false,
    })
    expect(productImg).toBeInTheDocument()
    expect(productImg.src).toBe(productDetailsResponse.image_url)
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_10:::When the HTTP GET request in the Product Item Details Route is successful, then the page should consist of the HTML main heading elements with text content as the value of the key "title" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_11:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "price" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    const priceText = await screen.findByText(productDetailsResponse.price, {
      exact: false,
    })
    expect(priceText).toBeInTheDocument()
    expect(priceText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_12:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "rating" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    const ratingText = await screen.findByText(productDetailsResponse.rating, {
      exact: false,
    })
    expect(ratingText).toBeInTheDocument()
    expect(ratingText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_13:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "total_reviews" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    const totalReviewsText = await screen.findByText(
      productDetailsResponse.rating,
      {
        exact: false,
      },
    )
    expect(totalReviewsText).toBeInTheDocument()
    expect(totalReviewsText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_14:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "description" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})

    const descriptionText = await screen.findByText(
      /^Color, style and ceremonial importance of the gown./i,
      {
        exact: false,
      },
    )

    expect(descriptionText).toBeInTheDocument()
    expect(descriptionText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_15:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "availability" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})

    const availabilityText = await screen.findByText(
      productDetailsResponse.availability,
      {
        exact: false,
      },
    )

    expect(availabilityText).toBeInTheDocument()
    expect(availabilityText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_16:::When the HTTP GET request in the Product Item Details route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "brand" from the productDetailsResponse received:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})

    const brandText = await screen.findByText(productDetailsResponse.brand, {
      exact: false,
    })

    expect(brandText).toBeInTheDocument()
    expect(brandText.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_17:::JS code implementation for Product Item Details should use "BsPlusSquare" and "BsDashSquare" from the react-icons package :::5:::', async () => {
    expect(jsxCode.match(/BsPlusSquare/).length).toBeGreaterThanOrEqual(1)
    expect(jsxCode.match(/<BsPlusSquare/).length).toBeGreaterThanOrEqual(1)
    expect(jsxCode.match(/BsDashSquare/).length).toBeGreaterThanOrEqual(1)
    expect(jsxCode.match(/<BsDashSquare/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCP809S4_TEST_18:::When the HTTP GET request in the Product Item Details route is successful, an HTML button element with data-testid attribute value as "plus":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('plus')).toBeInTheDocument()
    expect(screen.getByTestId('plus').tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_19:::When the HTTP GET request in the Product Item Details route is successful, an HTML button element with data-testid attribute value as "minus":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('minus')).toBeInTheDocument()
    expect(screen.getByTestId('minus').tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_20:::When the HTTP GET request in the Product Item Details route is successful, an HTML paragraph element with text content as "1" for quantity should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const quantity = screen.getByText(/^1/, {
      exact: false,
    })

    expect(quantity).toBeInTheDocument()
    expect(quantity.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_21:::When the HTTP GET request in the Product Item Details route is successful, an HTML button element with text content as "ADD TO CART" should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Add To Cart/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_22:::When the HTML button with data-testid "plus" is clicked, the quantity should be incremented by one:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('plus'))
    expect(
      screen.getByText(/^2/, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_23:::When the HTML button with data-testid "minus" is clicked, the quantity should be decremented by one:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('plus'))
    userEvent.click(screen.getByTestId('minus'))
    expect(
      screen.getByText(/^1/, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_24:::When the HTML button with data-testid "minus" is clicked, the quantity should not be decremented below one:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^1/, {
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('minus'))
    expect(
      screen.getByText(/^1/, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_25:::Page should consist of at least two HTML unordered list elements to display the links in the Header and the list of similar products:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')
    expect(screen.getAllByRole('list')[1].tagName).toBe('UL')
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_26:::Page should consist of at least six HTML list items to display the links in Header and the list of similar products:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_27:::Page should consist of HTML image elements with alt text starting with "similar product" and src as the value of the key "image_url" received in the "similar_products" list received in the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /similar product/i, exact: false})
        .length,
    ).toBeGreaterThanOrEqual(3)
    expect(
      screen.getAllByRole('img', {name: /similar product/i, exact: false})[0]
        .src,
    ).toBe(productDetailsResponse.similar_products[0].image_url)
    expect(
      screen.getAllByRole('img', {name: /similar product/i, exact: false})[1]
        .src,
    ).toBe(productDetailsResponse.similar_products[1].image_url)
    expect(
      screen.getAllByRole('img', {name: /similar product/i, exact: false})[2]
        .src,
    ).toBe(productDetailsResponse.similar_products[2].image_url)
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_28:::Page should consist of HTML paragraph element with text content as the value of the key "title" received in the "similar_products" list received in the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[1].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[2].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_29:::Page should consist of HTML paragraph element with text content as the value of the key "brand" received in the "similar_products" list received in the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[0].brand, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[1].brand, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[2].brand, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_30:::Page should consist of HTML paragraph element with text content as the value of the key "rating" received in the "similar_products" list received in the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[0].rating, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[1].rating, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[2].rating, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_31:::Page should consist of HTML paragraph element with text content as the value of the key "price" received in the "similar_products" list received in the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: productDetailsResponse.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[0].price, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[1].price, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productDetailsResponse.similar_products[2].price, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })
})
