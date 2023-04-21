import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const loginRoutePath = '/login'

const productDetailsPath1 = '/products/16'
const productDetailsPath2 = '/products/1001'

const productsResponse = {
  products: [
    {
      title: 'Front Load Machine',
      brand: 'Samsung',
      price: 22490,
      id: 24,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png',
      rating: 4.5,
    },
    {
      title: "Collider Black Dial Men's Watch",
      brand: 'Fossil',
      price: 14995,
      id: 33,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png',
      rating: 4.3,
    },
    {
      title: 'True Wireless Earbuds',
      brand: 'LG',
      price: 13499,
      id: 18,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png',
      rating: 4.4,
    },
    {
      title: "Maritime Men's Watch",
      brand: 'Titan',
      price: 11999,
      id: 35,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png',
      rating: 4.3,
    },
    {
      title: "Neutra Analog Men's Watch",
      brand: 'Fossil',
      price: 10995,
      id: 34,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png',
      rating: 4.1,
    },
    {
      title: 'Monsters Charm Toy',
      brand: 'Trendytap',
      price: 8600,
      id: 48,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png',
      rating: 4.2,
    },
    {
      title: 'Privateer Quartz Watch',
      brand: 'Fossil',
      price: 8122,
      id: 31,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png',
      rating: 4.4,
    },
    {
      title: 'Podcast Microphone',
      brand: 'MAONO',
      price: 5555,
      id: 22,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png',
      rating: 4.4,
    },
    {
      title: 'Virgin Avocado Oil',
      brand: 'ProV',
      price: 4144,
      id: 42,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-oil.png',
      rating: 4.4,
    },
    {
      title: 'Warm Up Jacket',
      brand: 'Monte Carlo',
      price: 2796,
      id: 11,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-sim-jacket.png',
      rating: 4.4,
    },
  ],
}

const primeDealsResponse = {
  prime_deals: [
    {
      id: 1001,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-silver-hair-dryer.png',
      title: 'Hair Dryer',
      style: 'Philips HP8100/46 Hair Dryer - Salon Dry Compact',
      price: 760,
      description: 'Advanced concentrator technology with quick-heat head. ',
      brand: 'Phillips',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1002,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-people-toys.png',
      title: 'Minifigures',
      style: 'Minifigures',
      price: 760,
      description:
        'Collect all mystery minifigures in the new series 11 and grow your LEGO Minifigure Collection. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1003,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-short-tri-pod.png',
      title: 'Lightweight Tripod',
      style: 'Lightweight Tripod',
      price: 760,
      description:
        'Adjustable-height tripod made of lightweight aluminum, Recommended max load weight is 2 Kg for optimal performance. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
  ],
}

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
}

const productsApiUrl = 'https://apis.ccbp.in/products'
const primeDealsApiUrl = 'https://apis.ccbp.in/prime-deals'

const server = setupServer(
  rest.get('https://apis.ccbp.in/products/16', (req, res, ctx) =>
    res(ctx.json(productDetailsResponse)),
  ),
  rest.get('https://apis.ccbp.in/products/1001', (req, res, ctx) =>
    res(
      ctx.status(404),
      ctx.json({
        status_code: 404,
        error_msg: 'Product Not Found',
      }),
    ),
  ),
  rest.get(primeDealsApiUrl, (req, res, ctx) =>
    res(ctx.json(primeDealsResponse)),
  ),
  rest.get(productsApiUrl, (req, res, ctx) => res(ctx.json(productsResponse))),
)

const nonPrimeUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token: nonPrimeUserToken,
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

describe(':::RJSCP809S4_TEST_SUITE_1:::Product Item Details Authentication and Authorization tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCP809S4_TEST_1:::When "/product-details/:id" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login" and src as given login image url:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: productDetailsPath1})
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginImgs = screen.getAllByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(loginImgs[0]).toBeInTheDocument()
    expect(loginImgs[0].src).toBe(loginImage)
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_2:::When the HTTP GET request made in Product Item Details Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view" and src as the given Failure view image URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath2})

    expect(
      await screen.findByRole('img', {name: /failure view/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /failure view/i, exact: false}).src,
    ).toBe(
      'https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png',
    )
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_3:::When the HTTP GET request made in Product Item Details Route is unsuccessful, the page should consist of the HTML main heading element with text content as "Product Not Found":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath2})
    expect(
      await screen.findByRole('heading', {
        name: /Product Not Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_4:::When the HTTP GET request made in Product Item Details Route is unsuccessful, the page should consist of the HTML button element with text content as "Continue Shopping":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath2})
    expect(
      await screen.findByRole('button', {
        name: /Continue Shopping/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCP809S4_TEST_5:::When the HTTP GET request made in Product Item Details Route is unsuccessful and the "Continue Shopping" button is clicked, then the page should be navigated to Products Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productDetailsPath2})
    expect(
      await screen.findByRole('button', {
        name: /Continue Shopping/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {name: /Continue Shopping/i, exact: false}),
    )
    expect(window.location.pathname).toBe('/products')
    restoreGetCookieFns()
  })
})
