import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {BsFillStarFill} from 'react-icons/bs'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

// #region

const bookDetailsRoutePath = '/books/5f7fe73a-c4f2-4d58-b4ad-ec88426e26be'
const loginRoutePath = '/login'
const bookDetailsApiUrl =
  'https://apis.ccbp.in/book-hub/books/5f7fe73a-c4f2-4d58-b4ad-ec88426e26be'

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

const handlers = [
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

const renderWithBrowserRouter = (ui, {route = bookDetailsRoutePath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const mockHomeRouteWithSearchResultsFailureAPIs = () => {
  server.use(
    rest.get(bookDetailsApiUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

const originalFetch = window.fetch

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_1:::Book Details Route Tests', () => {
  // #region
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

  // #endregion

  // #region - API
  it(':::RJSCPNRHL4_TEST_1:::When the Book Details Route is opened, an HTTP GET request should be made to the given Book Details API URL with the book id as the path parameter:::5:::', () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(bookDetailsResponse),
    }))
    renderWithBrowserRouter(<App />)
    expect(fetchSpy.mock.calls[0][0]).toMatch(bookDetailsApiUrl)
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Auth

  it(':::RJSCPNRHL4_TEST_2:::When "/books/:id" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route and consist of an HTML button element with text content as "Login":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    expect(loginButton).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_3:::When "/books/:id" is provided as the URL path by an authenticated user, then the page should be navigated to the Book Details Route and should consist of an HTML main heading element with text content as the value of the key "title" in books received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(bookDetailsRoutePath)
    const headingEl1 = await screen.findAllByRole('heading', {
      name: bookDetailsResponse.title,
      exact: false,
    })
    expect(headingEl1[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Loader
  it(':::RJSCPNRHL4_TEST_4:::When the Book Details Route is opened, an HTML container element with testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Success UI

  it(':::RJSCPNRHL4_TEST_5:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML image element with alt and src attribute values as the values of key "title" and "cover_pic" respectively received from the book details response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: bookDetailsResponse.book_details.title,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(bookDetailsResponse.book_details.cover_pic)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_6:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML main heading element with text content as the value of the key "title" in books received from the book details response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const headingEl = await screen.findByRole('heading', {
      name: bookDetailsResponse.book_details.title,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_7:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "author_name" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.author_name,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_8:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content starting with "Avg Rating":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(/^Avg Rating/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_9:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of "BsFillStarFill" icons from "react-icons":::5:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(bookDetailsResponse)
    jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => promise1,
    }))

    const wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    await act(() => promise1)
    await wrapper.update()
    expect(wrapper.find(BsFillStarFill)).toHaveLength(1)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_10:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "rating" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.rating,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_11:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content starting with "Status:":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.rating,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    const paragraphEl2 = screen.getByText(/^Status:/i)
    expect(paragraphEl2).toBeInTheDocument()
    expect(paragraphEl2.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_12:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML element with text content as the value of the key "read_status" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const spanEl = await screen.findByText(
      bookDetailsResponse.book_details.read_status,
      {
        exact: false,
      },
    )
    expect(spanEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_13:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of HTML main heading element with text content as "About Author":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.about_author,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    const headingEl = screen.getByRole('heading', {
      name: /About Author/i,
    })

    expect(headingEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_14:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "about_author" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.about_author,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_15:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of HTML main heading elements with text content as "About Book":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.about_book,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    const headingEl = screen.getByRole('heading', {
      name: /About Book/i,
    })
    expect(headingEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_16:::When the HTTP GET request in the Book Details Route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "about_book" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      bookDetailsResponse.book_details.about_book,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Failure

  it(':::RJSCPNRHL4_TEST_17:::When the HTTP GET request in the Book Details is unsuccessful, then the page should consist of an HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_18:::When the HTTP GET request in the Book Details is unsuccessful, then the page should consist of an HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      new RegExp(/Something went wrong. Please try again/i),
      {
        exact: false,
      },
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_19:::When the HTTP GET request in the Book Details is unsuccessful, then the page should consist of an HTML button element with text content as "Try Again":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('button', {name: /Try Again/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_20:::When the HTTP GET request in the Book Details is unsuccessful and the "Try Again" button is clicked, then an HTTP GET request should be made to the given book details API URL:::5:::', async () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Try Again/i,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(fetchSpy.mock.calls[1][0]).toBe(`${bookDetailsApiUrl}`)
    restoreGetCookieFns()
  })

  // #endregion
})
