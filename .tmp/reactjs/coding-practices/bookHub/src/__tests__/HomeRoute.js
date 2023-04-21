import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import Slider from 'react-slick'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

// #region

const homeRoutePath = '/'
const loginRoutePath = '/login'
const bookShelvesRoutePath = '/shelf'
const bookDetailsRoutePath = '/books/5f7fe73a-c4f2-4d58-b4ad-ec88426e26be'

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
  total: 2,
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

const homeBooksApiUrl = `https://apis.ccbp.in/book-hub/top-rated-books`
const bookShelvesApiUrl = `https://apis.ccbp.in/book-hub/books`
const bookDetailsApiUrl = `https://apis.ccbp.in/book-hub/books/5f7fe73a-c4f2-4d58-b4ad-ec88426e26be`

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

const mockHomeRouteWithSearchResultsFailureAPIs = () => {
  server.use(
    rest.get(homeBooksApiUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_5:::Home Route Tests', () => {
  // #region

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(console, 'error').mockRestore()
    jest.spyOn(window, 'fetch').mockRestore()
  })

  afterAll(() => {
    server.close()
  })

  // #endregion

  // #region - Key Error Test Case

  it(':::RJSCPNRHL4_TEST_71:::When HTTP GET request in the Home Route is successful, then the page should consist of at least two HTML list items, and the top rated books list should be rendered using a unique key as a prop for each top rated book item respectively:::10:::', async () => {
    mockGetCookie()
    const consoleSpy = jest.spyOn(console, 'error')
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(topRatedBooksResponse.books[2].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(2)
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/Each child in a list should have a unique/),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/Encountered two children with the same key/),
      expect.anything(),
      expect.anything(),
    )
    consoleSpy.mockRestore()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Auth

  it(':::RJSCPNRHL4_TEST_72:::When "/" is provided as the URL by an unauthenticated user, then the page should be navigated to the Login Route and should consist of an HTML button element with text content as "Login":::15:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    const buttonEl = screen.getByRole('button', {name: /Login/i, exact: false})
    expect(buttonEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_73:::When "/" is provided as the URL by an authenticated user, then the page should be navigated to the Home Route and should consist of an HTML main heading element with text content as the value of the key "title" received from the top rated books response:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  // #endregion

  // #region - API

  it(':::RJSCPNRHL4_TEST_74:::When the Home Route is opened, an HTML container element with testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loader'))
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_75:::When the Home Route is opened, an HTTP GET request should be made to the Top Rated Books API URL:::10:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(topRatedBooksResponse)

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => promise1,
    }))
    renderWithBrowserRouter(<App />)
    await act(() => promise1)

    expect(fetchSpy.mock.calls[0][0]).toMatch(homeBooksApiUrl)

    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - success UI

  it(':::RJSCPNRHL4_TEST_76:::When the HTTP GET request in the Home Route is successful, then the page should consist of "Slider" from "react-slick":::15:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(topRatedBooksResponse)
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
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
    expect(wrapper.find(Slider)).toHaveLength(1)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_77:::When the HTTP GET request in the Home Route is successful, then the page should consist of "Slider" from "react-slick" and prop "slidesToShow" value should be 4:::15:::', async () => {
    mockGetCookie()

    const promise1 = Promise.resolve(topRatedBooksResponse)
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
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

    expect(wrapper.find(Slider).at(0).props().slidesToShow).toBe(4)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_78:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML main heading elements with text content as the values of the keys "title" respectively from the top rated books response received:::10:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(topRatedBooksResponse)
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
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

    expect(
      wrapper.find('.slick-slide.slick-active').at(0).find('h1').text(),
    ).toEqual(`${topRatedBooksResponse.books[0].title}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(1).find('h1').text(),
    ).toEqual(`${topRatedBooksResponse.books[1].title}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(2).find('h1').text(),
    ).toEqual(`${topRatedBooksResponse.books[2].title}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(3).find('h1').text(),
    ).toEqual(`${topRatedBooksResponse.books[3].title}`)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_79:::Home Route should consist of an HTML main heading element with text content as "Find Your Next Favorite Books?":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Find Your Next Favorite Books/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_80:::Home Route should consist of an HTML paragraph element with text content starting with "You are in the right place.":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/^You are in the right place/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_81:::Home Route should consist of an HTML button element with text content as "Find Books":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const findBooksButton = screen.getAllByRole('button', {
      name: /Find Books/,
    })

    expect(findBooksButton[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_82:::Home Route should consist of an HTML main heading element with text content as "Top Rated Books":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Top Rated Books/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_83:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML image elements with alt and src as the values of the keys "title" and "cover_pic" respectively from the top rated books response received:::10:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(topRatedBooksResponse)
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
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
    expect(
      wrapper.find('.slick-slide.slick-active').at(0).find('img').prop('src'),
    ).toEqual(`${topRatedBooksResponse.books[0].cover_pic}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(1).find('img').prop('src'),
    ).toEqual(`${topRatedBooksResponse.books[1].cover_pic}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(2).find('img').prop('src'),
    ).toEqual(`${topRatedBooksResponse.books[2].cover_pic}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(3).find('img').prop('src'),
    ).toEqual(`${topRatedBooksResponse.books[3].cover_pic}`)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_84:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the keys "author_name" respectively from the top rated books response received:::10:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(topRatedBooksResponse)
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
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
    expect(
      wrapper.find('.slick-slide.slick-active').at(0).find('p').text(),
    ).toEqual(`${topRatedBooksResponse.books[0].author_name}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(1).find('p').text(),
    ).toEqual(`${topRatedBooksResponse.books[1].author_name}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(2).find('p').text(),
    ).toEqual(`${topRatedBooksResponse.books[2].author_name}`)
    expect(
      wrapper.find('.slick-slide.slick-active').at(3).find('p').text(),
    ).toEqual(`${topRatedBooksResponse.books[3].author_name}`)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Functionality

  it(':::RJSCPNRHL4_TEST_85:::When the "Find Books" button in the Home Route is clicked, then the page should be navigated to the Bookshelves Route and should consist of an HTML main heading element with text content as "Bookshelves":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const findBooksBtn = screen.getAllByRole('button', {
      name: /Find Books/i,
    })
    userEvent.click(findBooksBtn[0])
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const headingEl = screen.getAllByRole('heading', {
      name: /Bookshelves/i,
      exact: false,
    })
    expect(headingEl[0]).toBeInTheDocument()
    expect(window.location.pathname).toBe(bookShelvesRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_86:::When the top rated book item is clicked, then the page should be navigated to the Book Details route with "/books/:id" as the URL path and should consist of an HTML main heading element with text content as the value of the key "title" in books received from the book details response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const headingEl = await screen.findByRole('heading', {
      name: topRatedBooksResponse.books[1].title,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
    userEvent.click(headingEl)
    expect(window.location.pathname).toMatch(bookDetailsRoutePath)
    const headingEl1 = await screen.findAllByRole('heading', {
      name: bookDetailsResponse.title,
      exact: false,
    })
    expect(headingEl1[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Failure

  it(':::RJSCPNRHL4_TEST_87:::When the HTTP GET request in the Home Route is unsuccessful, then the page should consist of an HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_88:::When the HTTP GET request in the Home Route is unsuccessful, then the page should consist of an HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
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

  it(':::RJSCPNRHL4_TEST_89:::When the HTTP GET request in the Home Route is unsuccessful, then the page should consist of an HTML button element with text content as "Try Again":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('button', {name: /Try Again/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_90:::When the HTTP GET request in the Home Route is unsuccessful and the "Try Again" button is clicked, then an HTTP GET request should be made to the given Top Rated Books API URL:::10:::', async () => {
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

    expect(fetchSpy.mock.calls[1][0]).toBe(`${homeBooksApiUrl}`)
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  // #endregion
})
