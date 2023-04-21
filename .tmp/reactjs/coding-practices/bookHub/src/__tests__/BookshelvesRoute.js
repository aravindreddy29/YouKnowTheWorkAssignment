import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

// #region

const loginRoutePath = '/login'
const bookShelvesRoutesPath = '/shelf'
const bookDetailsRoutePath = '/books/54402549-a4bd-4c99-a176-bd795d47173a'

const bookShelvesApiUrl = `https://apis.ccbp.in/book-hub/books`
const bookShelvesDetailsApiUrl = `https://apis.ccbp.in/book-hub/books/54402549-a4bd-4c99-a176-bd795d47173a`

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
      rating: 3.1,
      read_status: 'Currently Reading',
      title: 'Borrowed Magic',
    },
    {
      author_name: 'Ady Barkan',
      cover_pic:
        'https://assets.ccbp.in/frontend/react-js/good-reads/good-reads-mini-project-book-3.png',
      id: '7850622e-1b70-4396-963d-e68d5a2577d7',
      rating: 4.8,
      read_status: 'Want to Read',
      title: 'Eyes to the Wind',
    },
  ],
  total: 3,
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

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const handlers = [
  rest.get(bookShelvesApiUrl, (req, res, ctx) =>
    res(ctx.json(bookshelvesResponse)),
  ),
  rest.get(bookShelvesDetailsApiUrl, (req, res, ctx) =>
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

const renderWithBrowserRouter = (ui, {route = bookShelvesRoutesPath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const mockHomeRouteWithSearchResultsFailureAPIs = () => {
  server.use(
    rest.get(bookShelvesApiUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_2:::Bookshelves Route Tests', () => {
  // #region
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(window, 'fetch').mockRestore()
    jest.spyOn(console, 'error').mockRestore()
  })

  afterAll(() => {
    server.close()
  })
  // #endregion

  // #region - key error

  it(':::RJSCPNRHL4_TEST_21:::When HTTP GET request in the Bookshelves Route is successful, then the page should consist of at least two HTML list items, and the books list should be rendered using a unique key as a prop to display each book item respectively:::10:::', async () => {
    mockGetCookie()
    const consoleSpy = jest.spyOn(console, 'error')

    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)

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

  // #region - API

  it(':::RJSCPNRHL4_TEST_22:::When the Bookshelves Route is opened, an HTTP GET request should be made to the given Bookshelves API URL with the query parameters "shelf" and "search" with initial values as "ALL" and empty string respectively:::15:::', async () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(bookshelvesResponse),
    }))
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(fetchSpy.mock.calls[0][0]).toMatch(
      `shelf=${bookshelvesList[0].value}`,
    )
    expect(fetchSpy.mock.calls[0][0]).toMatch('search=')
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Auth

  it(':::RJSCPNRHL4_TEST_23:::When "/shelf" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route and consist of an HTML button element with text content as "Login":::15:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    expect(loginButton).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_24:::When "/shelf" is provided as the URL path by an authenticated user, then the page should be navigated to the Bookshelves Route and should consist of an HTML main heading element with text content as the value of key "title" received from the books response:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe('/shelf')
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Static UI

  it(':::RJSCPNRHL4_TEST_25:::Bookshelves Route should consist of HTML button elements with text content as the values of the key "label" from bookshelvesList provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    for (let index = 0; index < 4; index += 1) {
      const labelButton = screen.getAllByRole('button', {
        name: bookshelvesList[index].label,
        exact: false,
      })

      expect(labelButton[0]).toBeInTheDocument()
    }
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_26:::Bookshelves Route should initially consist of an HTML main heading element with text content "All Books":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /^All Books$/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_27:::Bookshelves Route should consist of an HTML input element with type attribute value as "search":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const searchEl = screen.getByRole('searchbox')
    expect(searchEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_28:::Bookshelves Route should consist of an HTML button element with testid attribute value as "searchButton":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const searchBtnEl = await screen.getByTestId('searchButton')
    expect(searchBtnEl.type).toBe('button')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_29:::Bookshelves Route should consist of "BsSearch" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(bookshelvesResponse)
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
    expect(wrapper.find(BsSearch)).toHaveLength(1)
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Loader Test Case

  it(':::RJSCPNRHL4_TEST_30:::When the Bookshelves Route is opened, an HTML container element with testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    restoreGetCookieFns()
  })

  // #endregion

  // #region - Success UI

  it(':::RJSCPNRHL4_TEST_31:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML main heading elements with text content as the value of key "title" received from the books response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[1].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_32:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of an HTML main heading element with text content as "Bookshelves":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const bookShelvesHeader = await screen.findAllByRole('heading', {
      name: /^Bookshelves$/i,
      exact: false,
    })
    expect(bookShelvesHeader[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_33:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of at least two HTML unordered list elements to display the nav items and books list received from the bookshelves response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const unorderedLists = await screen.findAllByRole('list')
    expect(unorderedLists.length).toBeGreaterThanOrEqual(2)
    expect(unorderedLists[0].tagName).toBe('UL')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_34:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML list elements to display the nav items and the books list received from the bookshelves response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(7)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_35:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML image elements with alt and src as the values of the keys "title" and "cover_pic" respectively from the received Books response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imageEl1 = await screen.findByRole('img', {
      name: bookshelvesResponse.books[0].title,
      exact: false,
    })
    expect(imageEl1).toBeInTheDocument()
    expect(imageEl1.src).toBe(bookshelvesResponse.books[0].cover_pic)

    const imageEl2 = screen.getByRole('img', {
      name: bookshelvesResponse.books[1].title,
      exact: false,
    })
    expect(imageEl2).toBeInTheDocument()
    expect(imageEl2.src).toBe(bookshelvesResponse.books[1].cover_pic)
    const imageEl3 = screen.getByRole('img', {
      name: bookshelvesResponse.books[2].title,
      exact: false,
    })
    expect(imageEl3).toBeInTheDocument()
    expect(imageEl3.src).toBe(bookshelvesResponse.books[2].cover_pic)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_36:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML paragraph elements with text content as the value of the key "author_name" received from the books response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl1 = await screen.findByText(
      bookshelvesResponse.books[0].author_name,
      {exact: false},
    )
    expect(paragraphEl1).toBeInTheDocument()
    expect(paragraphEl1.tagName).toBe('P')

    const paragraphEl2 = screen.getByText(
      bookshelvesResponse.books[1].author_name,
      {exact: false},
    )
    expect(paragraphEl2).toBeInTheDocument()
    expect(paragraphEl2.tagName).toBe('P')
    const paragraphEl3 = screen.getByText(
      bookshelvesResponse.books[2].author_name,
      {exact: false},
    )
    expect(paragraphEl3).toBeInTheDocument()
    expect(paragraphEl3.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_37:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of "BsFillStarFill" icon:::5:::', async () => {
    mockGetCookie()
    const promise1 = Promise.resolve(bookshelvesResponse)
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
    expect(wrapper.find(BsFillStarFill)).toHaveLength(3)
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_38:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML paragraph elements with text content as "Avg Rating":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEls = await screen.findAllByText(/Avg Rating/i)
    expect(paragraphEls.length).toBeGreaterThanOrEqual(3)
    expect(paragraphEls[0].tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_39:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "rating" respectively received from the books response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl1 = await screen.findByText(
      bookshelvesResponse.books[0].rating,
      {exact: false},
    )
    expect(paragraphEl1).toBeInTheDocument()
    expect(paragraphEl1.tagName).toBe('P')

    const paragraphEl2 = screen.getByText(bookshelvesResponse.books[1].rating, {
      exact: false,
    })
    expect(paragraphEl2).toBeInTheDocument()
    expect(paragraphEl2.tagName).toBe('P')
    const paragraphEl3 = screen.getByText(bookshelvesResponse.books[2].rating, {
      exact: false,
    })
    expect(paragraphEl3).toBeInTheDocument()
    expect(paragraphEl3.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_40:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML paragraph elements with text content as "Status":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEls = await screen.findAllByText(/Status*./i)
    expect(paragraphEls.length).toBeGreaterThanOrEqual(3)
    expect(paragraphEls[0].tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_41:::When the HTTP GET request in the Bookshelves Route is successful, then the page should consist of HTML elements with text content as the value of the key "read_status" received from the books response:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const paragraphEl1 = await screen.findByText(
      bookshelvesResponse.books[0].rating,
      {exact: false},
    )
    expect(paragraphEl1).toBeInTheDocument()

    const spanEls = screen.getAllByText(
      new RegExp(`^${bookshelvesResponse.books[0].read_status}$`, 'i'),
      {
        exact: false,
      },
    )
    expect(
      spanEls.some(
        eachEle => eachEle.tagName === 'SPAN' || eachEle.tagName === 'P',
      ),
    ).toBeTruthy()

    const spanEls2 = screen.getAllByText(
      new RegExp(`^${bookshelvesResponse.books[1].read_status}$`, 'i'),
      {
        exact: false,
      },
    )
    expect(
      spanEls2.some(
        eachEle => eachEle.tagName === 'SPAN' || eachEle.tagName === 'P',
      ),
    ).toBeTruthy()

    const spanEls3 = screen.getAllByText(
      new RegExp(`^${bookshelvesResponse.books[2].read_status}$`, 'i'),
      {
        exact: false,
      },
    )
    expect(
      spanEls3.some(
        eachEle => eachEle.tagName === 'SPAN' || eachEle.tagName === 'P',
      ),
    ).toBeTruthy()

    restoreGetCookieFns()
  })

  // #endregion

  // #region - Route Functionality Test Cases

  it(':::RJSCPNRHL4_TEST_42:::When a button in the bookshelves which is provided in the bookshelvesList is clicked, an HTTP GET request should be made with the value of the corresponding bookShelf as a value to query parameter "shelf":::5:::', async () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(bookshelvesResponse),
    }))
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const readBtnEl = screen.getAllByRole('button', {
      name: bookshelvesList[1].label,
      exact: false,
    })
    userEvent.click(readBtnEl[0])
    expect(fetchSpy.mock.calls[1][0]).toMatch(
      `shelf=${bookshelvesList[1].value}`,
    )

    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_43:::When a button in the bookshelvesList provided is clicked, then the page should consist of an HTML main heading element with text content as "({bookshelf name}) Books". Here bookshelf name refers to the clicked bookshelf label from the provided bookshelvesList:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
      }),
    ).toBeInTheDocument()
    const readBtnEl = screen.getAllByRole('button', {
      name: bookshelvesList[1].label,
      exact: false,
    })
    userEvent.click(readBtnEl[0])
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: `${bookshelvesList[1].label} Books`,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_44:::When a non-empty value is provided in the search input of Bookshelves Route, then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const searchEl = screen.getByRole('searchbox')
    userEvent.type(searchEl, 'random')
    expect(searchEl.value).toBe('random')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_45:::When a non-empty value is provided in the search input element and the search icon button is clicked, an HTTP GET request should be made with the value provided in the search input element as the value to query parameter "search":::5:::', async () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(bookshelvesResponse),
    }))
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: bookshelvesResponse.books[0].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.type(screen.getAllByRole('searchbox')[0], 'Dev')
    userEvent.click(screen.getAllByTestId('searchButton')[0])
    expect(fetchSpy.mock.calls[1][0]).toMatch('search=Dev')
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_46:::When a book item is clicked in the Bookshelves Route, then the page should be navigated to the Book Details route with "/books/:id" as the URL path and should consist of an HTML main heading element with text content as the value of the key "title" received from the book details response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const headingEl = await screen.findByRole('heading', {
      name: bookshelvesResponse.books[0].title,
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

  it(':::RJSCPNRHL4_TEST_47:::When the HTTP GET request made to the given Books API URL in the Bookshelves Route returns the books list as empty, then the page should consist of an HTML image element with alt attribute value as "no books":::5:::', async () => {
    mockGetCookie()
    jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({books: [], total: 0}),
    }))
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /no books/i,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_48:::When the HTTP GET request in the Bookshelves Route returns the books list as empty, then the page should consist of an HTML paragraph element with text content as "Your search for {searchValue} did not find any matches." where searchValue is the value provided in Search Input:::5:::', async () => {
    mockGetCookie()
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({books: [], total: 0}),
    }))

    renderWithBrowserRouter(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'venom')
    userEvent.click(screen.getByTestId('searchButton'))

    const paragraphEl = await screen.findByText(
      new RegExp(/Your search for venom did not find any matches./i),
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  // #endregion

  it(':::RJSCPNRHL4_TEST_49:::When the HTTP GET request in the Bookshelves Route is unsuccessful, then the page should consist of an HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_50:::When the HTTP GET request in the Bookshelves Route is unsuccessful, then the page should consist of an HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
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

  it(':::RJSCPNRHL4_TEST_51:::When the HTTP GET request in the Bookshelves Route is unsuccessful, then the page should consist of an HTML button element with text content as "Try Again":::5:::', async () => {
    mockGetCookie()
    mockHomeRouteWithSearchResultsFailureAPIs()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('button', {name: /Try Again/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_52:::When the HTTP GET request in the Bookshelves Route is unsuccessful and the "Try Again" button is clicked, then an HTTP GET request should be made to the given Books API URL:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Try Again/i,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[1][0]).toMatch(`${bookShelvesApiUrl}`)
    restoreGetCookieFns()
  })
})
