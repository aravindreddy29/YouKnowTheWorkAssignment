import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

// #region

const homeRoutePath = '/'
const loginRoutePath = '/login'
const bookShelvesRoutePath = '/shelf'
const bookItemDetailsRoutePath = '/books/7850622e-1b70-4396-963d-e68d5a2577d7'

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

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

let historyInstance

const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const rtlRender = (ui, path = '/login') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_4:::Header Tests', () => {
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

  // #region - static UI

  it(':::RJSCPNRHL4_TEST_56:::Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const imgEl = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(imgEl[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_57:::Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo", wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const trendingImgEls = await screen.findAllByRole('img', {
      name: new RegExp(`${topRatedBooksResponse.books[2].title}`, 'i'),
      exact: false,
    })
    expect(trendingImgEls[0]).toBeInTheDocument()

    const imgEl = screen.getAllByRole('link', {
      name: /website logo/i,
    })
    expect(imgEl[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_58:::Home Route should consist of at least one HTML unordered list element to display the list of nav items in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const trendingImgEls = await screen.findAllByRole('img', {
      name: new RegExp(`${topRatedBooksResponse.books[0].title}`, 'i'),
      exact: false,
    })
    expect(trendingImgEls[0]).toBeInTheDocument()

    const imgEl = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(imgEl[0]).toBeInTheDocument()

    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_59:::Home Route should consist of HTML list elements to display the nav items in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const trendingImgEls = await screen.findAllByRole('img', {
      name: new RegExp(`${topRatedBooksResponse.books[0].title}`, 'i'),
      exact: false,
    })
    expect(trendingImgEls[0]).toBeInTheDocument()

    const imgEl = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(imgEl[0]).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  // #endregion

  // #region - All Route checking - static test case

  it(':::RJSCPNRHL4_TEST_60:::Home Route should consist of an HTML element with text content as "Home" wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const homeLink = screen.getAllByRole('link', {
      name: /home/i,
    })

    expect(homeLink[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_61:::Bookshelves Route should consist of an HTML element with text content as "Home" wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookShelvesRoutePath})
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const homeLink = screen.getAllByRole('link', {
      name: /home/i,
    })

    expect(homeLink[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_62:::Book Details Route should consist of an HTML element with text content as "Home" wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookItemDetailsRoutePath})

    const bookItemDetails = await screen.findAllByRole('heading', {
      name: bookDetailsResponse.book_details.title,
      exact: false,
    })

    expect(bookItemDetails[0]).toBeInTheDocument()
    const homeLink = screen.getAllByRole('link', {
      name: /home/i,
    })

    expect(homeLink[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - static

  it(':::RJSCPNRHL4_TEST_63:::Home Route should consist of an HTML element with text content as "Bookshelves" wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const bookshelfLink = screen.getAllByRole('link', {
      name: /^Bookshelves$/i,
    })

    expect(bookshelfLink[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_64:::Home Route should consist of an HTML button element with text content as "Logout":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const logoutButton = screen.getAllByRole('button', {
      name: /Logout$/i,
    })

    expect(logoutButton[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_65:::When the Bookshelves link of Home Route in the Header is clicked, then the page should be navigated to the Bookshelves Route and should consist of an HTML main heading element with text content as the value of the key "title" received from the bookshelves response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const bookshelfLink = screen.getAllByRole('link', {
      name: /^Bookshelves$/i,
    })

    expect(bookshelfLink[0]).toBeInTheDocument()
    userEvent.click(bookshelfLink[0])
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(bookShelvesRoutePath)
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Logout

  it(':::RJSCPNRHL4_TEST_66:::When the Logout button of Home Route in the Header is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const logoutButton = screen.getAllByRole('button', {
      name: /Logout$/i,
    })

    expect(logoutButton[0]).toBeInTheDocument()
    userEvent.click(logoutButton[0])
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  // Note :  Render with browser router
  it(':::RJSCPNRHL4_TEST_67:::When the Logout button of Home Route in the Header is clicked, the history.replace() method should be called with the argument as "/login":::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)

    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const logoutButton = screen.getAllByRole('button', {
      name: /Logout$/i,
    })

    expect(logoutButton[0]).toBeInTheDocument()
    userEvent.click(logoutButton[0])
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_68:::When the Logout button of Home Route in the Header is clicked, then the page should be navigated to the Login Route and should consist of an HTML button element with text content as "Login":::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const logoutButton = screen.getAllByRole('button', {
      name: /Logout$/i,
    })

    expect(logoutButton[0]).toBeInTheDocument()
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutButton[0])
    expect(window.location.pathname).toBe(loginRoutePath)
    const buttonEl = screen.getByRole('button', {name: /Login/i, exact: false})
    expect(buttonEl).toBeInTheDocument()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  // #endregion

  // #region -> All Routes Header functionality Testing

  it(':::RJSCPNRHL4_TEST_69:::When the Home link of Bookshelves Route in the Header is clicked, then the page should be navigated to the Home Route and should consist of an HTML main heading element with text content as the value of the key "title" received from the top rated books response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookShelvesRoutePath})
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const homeLink = await screen.findAllByRole('link', {
      name: /home/i,
    })
    userEvent.click(homeLink[0])
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_70:::When the Home link of Book Details Route in the Header is clicked, then the page should be navigated to the Home Route and should consist of an HTML main heading element with text content as the value of the key "title" received from the top rated books response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: bookItemDetailsRoutePath})

    const bookItemDetails = await screen.findAllByRole('heading', {
      name: bookDetailsResponse.book_details.title,
      exact: false,
    })

    expect(bookItemDetails[0]).toBeInTheDocument()

    const homeLink = await screen.findAllByRole('link', {
      name: /home/i,
    })
    userEvent.click(homeLink[0])
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
})
