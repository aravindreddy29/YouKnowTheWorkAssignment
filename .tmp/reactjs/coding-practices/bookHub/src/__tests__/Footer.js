import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {render, screen} from '@testing-library/react'

import App from '../App'

// #region

const homeRoutePath = '/'
const bookShelvesRoutePath = '/shelf'
const bookItemDetailsRoutePath = '/books/7850622e-1b70-4396-963d-e68d5a2577d7'

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

const bookshelvesResponse = {
  books: [
    {
      author_name: 'Luke Richmond',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/good-reads/good-reads-mini-project-book-1.png',
      id: '54402549-a4bd-4c99-a176-bd795d47173a',
      rating: 4.2,
      read_status: 'Read',
      title: 'One life one chance',
    },
    {
      author_name: 'Stephanie Foxe',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/good-reads/good-reads-mini-project-book-2.png',
      id: '2ece92fb-c131-43b1-9c07-6f32bc465d01',
      rating: 4.2,
      read_status: 'Currently Reading',
      title: 'Borrowed Magic',
    },
  ],
  total: 20,
}

const bookDetailsResponse = {
  book_details: {
    about_author:
      'Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, as well as increasing financial intelligence.',
    about_book:
      'Rich Dad Poor Dad is about Robert Kiyosaki and his two dads, his real father and the father of his best friend and the ways in which both men shaped his thoughts about money and investing. You do not need to earn a high income to be rich. Rich people make money work for them.',
    author_name: 'Robert Kiyosaki',
    cover_pic:
      'https://assets.ccbp.in/frontend/react-js/rich-dad-poor-dad-book.png',
    id: '5f7fe73a-c4f2-4d58-b4ad-ec88426e26be',
    rating: 4.7,
    read_status: 'Read',
    title: 'Rich Dad Poor Dad',
  },
}

const homeBooksApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
const bookShelvesApiUrl = `https://apis.ccbp.in/book-hub/books`
const bookDetailsApiUrl = `https://apis.ccbp.in/book-hub/books/7850622e-1b70-4396-963d-e68d5a2577d7`

const handlers = [
  rest.get(homeBooksApiUrl, (req, res, ctx) =>
    res(ctx.json(topRatedBooksResponse)),
  ),
  rest.get(bookShelvesApiUrl, (req, res, ctx) =>
    res(ctx.json(bookshelvesResponse)),
  ),
  rest.get(bookDetailsApiUrl, (req, res, ctx) =>
    res(ctx.json(bookDetailsResponse)),
  ),
]

const server = setupServer(...handlers)

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
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

const renderWithBrowserRouter = (ui, {route = homeRoutePath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_3:::Footer Tests', () => {
  // #region
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
  // #endregion

  // #region - footer check all routes

  it(':::RJSCPNRHL4_TEST_53:::Home Route should consist of an HTML paragraph element in the footer with text content as "Contact us":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/Contact US/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_54:::Bookshelves Route should consist of an HTML paragraph element in the footer with text content as "Contact us":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookShelvesRoutePath})
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/Contact US/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_55:::Book Details Route should consist of an HTML paragraph element in the footer with text content as "Contact us":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookItemDetailsRoutePath})
    const bookItemDetails = await screen.findAllByRole('heading', {
      name: bookDetailsResponse.book_details.title,
      exact: false,
    })

    expect(bookItemDetails[0]).toBeInTheDocument()

    const paragraphEl = screen.getByText(/Contact US/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  // #endregion
})
