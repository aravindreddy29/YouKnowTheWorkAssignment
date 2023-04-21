import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const pageNotFoundPath = '/bad-path'

const homeRoutePath = '/'

const topRatedBooksResponse = {
  books: [
    {
      author_name: 'Kathryn Stockett',
      cover_pic: 'https://assets.ccbp.in/frontend/react-js/the-novel-book.png',
      id: '8301d74f-fa98-4fc7-a0d7-96b0b8d67bc9',
      title: 'The Help',
    },
    {
      author_name: 'Robert Kiyosaki',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/rich-dad-poor-dad-book.png',
      id: '5f7fe73a-c4f2-4d58-b4ad-ec88426e26be',
      title: 'Rich Dad Poor Dad',
    },
    {
      author_name: 'James Clear',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/atomic-habits-book.png',
      id: '19cef045-ef9b-4898-a9e9-dc943e44da5e',
      title: 'Atomic Habits',
    },
    {
      author_name: 'Chetan Bhagat',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/half-girlfriend-book.png',
      id: '561d0af9-3cec-426d-9721-35ed8d7e9c3c',
      title: 'Half Girlfriend',
    },
    {
      author_name: 'Ady Barkan',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/good-reads/good-reads-mini-project-book-3.png',
      id: '7850622e-1b70-4396-963d-e68d5a2577d7',
      title: 'Eyes to the Wind',
    },
    {
      author_name: 'J. K. Rowling',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/harry-potter-book.png',
      id: '1c9201d5-ffa9-4750-ad92-a5ce6009a747',
      title: 'Harry Porter',
    },
  ],
  total: 6,
}

const homeBooksApiUrl = `https://apis.ccbp.in/book-hub/top-rated-books`

const originalFetch = window.fetch

const handlers = [
  rest.get(homeBooksApiUrl, (req, res, ctx) =>
    res(ctx.json(topRatedBooksResponse)),
  ),
]

const server = setupServer(...handlers)

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
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

const renderWithBrowserRouter = (ui, {route = pageNotFoundPath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPNRHL4_TEST_SUITE_7:::Not Found Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPNRHL4_TEST_107:::When a random path is provided as the URL path, then the page should consist of an HTML image element with alt attribute value as "not found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /not found/i})
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_108:::When a random path is provided as the URL path, then the page should consist of an HTML main heading element with text content as "Page Not Found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Page Not Found/i,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_109:::When a random path is provided as the URL path, then the page should consist of an HTML paragraph element with text content as "we are sorry, the page you requested could not be found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const paragraphEl = screen.getByText(
      /We are sorry, the page you requested could not be found/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPNRHL4_TEST_110:::When a random path is provided as the URL path, then the page should consist of an HTML button element with text content as "Go Back to Home":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Go Back to Home/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_111:::When a random path is provided as the URL path, then the page should consist of an HTML button element with text content as "Go Back to Home" is wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('link', {
      name: /Go Back to Home/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_112:::When a random path is provided as the URL path and the "Go Back to Home" button is clicked, then the page should be navigated to Home Route and should consist of an HTML heading element with text content as the value of the key "author_name" received from the top rated books response:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const homePageButton = screen.getByRole('button', {
      name: /Go Back to Home/i,
      exact: false,
    })
    userEvent.click(homePageButton)
    expect(
      await screen.findByText(topRatedBooksResponse.books[2].author_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })
})
