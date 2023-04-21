import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import Cookies from 'js-cookie'
import {act} from 'react-dom/test-utils'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

// #region

const loginRoutePath = '/login'
const homeRoutePath = '/'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
}

const invalidUser = {
  error_msg: 'Username is not found',
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

const loginApiUrl = `https://apis.ccbp.in/login`
const topRatedBooksApiUrl = `https://apis.ccbp.in/book-hub/top-rated-books`

const handlers = [
  rest.post(loginApiUrl, (req, res, ctx) => {
    const {username, password} = JSON.parse(req.body)
    if (username === 'rahul' && password === 'rahul@2021') {
      return res(ctx.json(loginSuccessResponse))
    }
    return res(ctx.status(400, 'invalid request'), ctx.json(invalidUser))
  }),
  rest.get(topRatedBooksApiUrl, (req, res, ctx) =>
    res(ctx.json(topRatedBooksResponse)),
  ),
]

const server = setupServer(...handlers)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
}

const mockGetCookie = () => {
  const mockedGetCookie = jest.fn(() => ({
    jwt_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
  }))
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
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

const renderWithBrowserRouter = (ui, {route = '/login'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

// #endregion

describe(':::RJSCPNRHL4_TEST_SUITE_6:::Book Hub Authentication Tests', () => {
  // #region

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(window, 'fetch').mockRestore()
  })
  afterAll(() => {
    server.close()
  })

  // #endregion

  // #region - Authentication

  it(':::RJSCPNRHL4_TEST_91:::When "/login" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route and should consist of an HTML button element with text content as "Login":::15:::', async () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPNRHL4_TEST_92:::When "/login" is provided as the URL path by an authenticated user, then the page should be navigated to Home Route and should consist of an HTML main heading element with text content as the value of the key "title" received from the top rated books response:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, loginRoutePath)
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

  // #region - Login UI

  it(':::RJSCPNRHL4_TEST_93:::Login Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_94:::Login Route should consist of a website login HTML image element with alt attribute value as "website login":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getAllByRole('img', {name: /website login/i})
    expect(imageEl[0]).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_95:::Login Route should consist of a website logo HTML image element with alt attribute value as "login website logo":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /login website logo/i})
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPNRHL4_TEST_96:::Login Route should consist of HTML input element with label text as "Username*" and type attribute value as "text":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByLabelText(/Username/i).type).toBe('text')
  })

  it(':::RJSCPNRHL4_TEST_97:::Login Route should consist of HTML input element with label text as "Password*" and type attribute value as "password":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByLabelText(/Password/i).type).toBe('password')
  })

  it(':::RJSCPNRHL4_TEST_98:::Login Route should consist of an HTML button element with text content as "Login" and type attribute value as "submit":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  // #endregion

  // #region - Login Functionality

  it(':::RJSCPNRHL4_TEST_99:::When a non-empty value is provided in the HTML input element with the label text as "Username*", then the value provided should be displayed in the value of the input element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    const inputEl = screen.getByLabelText(/Username/i)
    userEvent.type(inputEl, 'rahul')
    expect(inputEl).toHaveValue('rahul')
  })

  it(':::RJSCPNRHL4_TEST_100:::When a non-empty value is provided in the HTML input element with the label text as "Password*", then the value provided should be displayed in the value of the input element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    const inputEl = screen.getByLabelText(/Password/i)
    userEvent.type(inputEl, 'rahul@2021')
    expect(inputEl).toHaveValue('rahul@2021')
  })

  it(':::RJSCPNRHL4_TEST_101:::When non-empty values are provided for username and password and the Login button is clicked, an HTTP POST request should be made to the given Login API URL:::5:::', async () => {
    mockSetCookie()
    const promise = Promise.resolve(loginSuccessResponse)

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(promise),
    }))

    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/Username/i)
    const passwordField = screen.getByLabelText(/Password/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await act(() => promise)
    expect(fetchSpy.mock.calls[0][0]).toMatch(`${loginApiUrl}`)

    fetchSpy.mockRestore()
    restoreSetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_102:::When non-empty values are provided for username and password and the Login button is clicked, then an HTTP POST request should be made to the given Login API URL with request object containing the keys "username" and "password" with the values provided respectively:::10:::', async () => {
    mockSetCookie()

    const promise = Promise.resolve({message: 'invalid credentials'})
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => promise,
    }))
    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'test')
    userEvent.type(passwordField, 'test@2021')
    userEvent.click(loginButton)
    const {username, password} = JSON.parse(fetchSpy.mock.calls[0][1].body)
    expect(username).toBe('test')
    expect(password).toBe('test@2021')
    await act(() => promise)

    fetchSpy.mockRestore()
    restoreSetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_103:::When the invalid username and password are provided and the Login button is clicked, then the page should consist of an HTML paragraph element with text content as respective error message and the page should not be navigated:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username is not found/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPNRHL4_TEST_104:::When the valid username and password are provided and the Login button is clicked, then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument, and expiry days as the third argument:::15:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />)

    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it(':::RJSCPNRHL4_TEST_105:::When the valid username and password are provided and the Login button is clicked, then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordFields = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordFields, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })

  it(':::RJSCPNRHL4_TEST_106:::When the valid username and password are provided and the Login button is clicked, then the page should be navigated to the Home Route and should consist of an HTML heading element with text content as "Find Your Next Favorite Books?":::15:::', async () => {
    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    mockGetCookie()
    expect(
      await screen.findByRole('heading', {
        name: topRatedBooksResponse.books[2].title,
        exact: false,
      }),
    ).toBeInTheDocument()
    const headingEl = screen.getByRole('heading', {
      name: /Find Your Next Favorite Books/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  // #endregion
})
