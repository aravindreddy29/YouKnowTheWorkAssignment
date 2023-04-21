import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const ebankLoginLogo =
  'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

const ebankLogo = 'https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png'

const loginRoutePath = '/ebank/login'
const homeRoutePath = '/'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE0MjQyMCIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjM0MDk4NzYyfQ.ZUCC2J2zBjRhLVa1EI_4EnkZ-M-7hoVZoZFAu8GTmEQ',
}

const pinIncorrect = {
  error_msg: "User ID and PIN didn't match",
}

const invalidUser = {
  error_msg: 'Invalid user ID',
}
const invalidPin = {
  error_msg: 'Invalid PIN',
}

const apiUrl = 'https://apis.ccbp.in/ebank/login'

const handlers = [
  rest.post(apiUrl, (req, res, ctx) => {
    const {user_id, pin} = JSON.parse(req.body)
    if (user_id !== '' && user_id !== '142420' && pin === '')
      return res(ctx.status(401, 'invalid request'), ctx.json(invalidPin))
    if (user_id === '' || user_id !== '142420' || user_id === undefined)
      return res(ctx.status(400, 'invalid request'), ctx.json(invalidUser))
    if (pin === '')
      return res(ctx.status(401, 'invalid request'), ctx.json(invalidPin))
    if (user_id === '142420' && pin === '231225')
      return res(ctx.json(loginSuccessResponse))
    return res(ctx.status(404, 'invalid request'), ctx.json(pinIncorrect))
  }),
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

const rtlRender = (ui = <App />, path = '/ebank/login') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

const renderWithBrowserRouter = (ui, {route = '/ebank/login'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalFetch = window.fetch

describe(':::RJSCEM5CP5_TEST_SUITE_3:::EBank Authentication Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCEM5CP5_TEST_14:::Login Route should consist of an HTML image element with alt as "website login" and src as the given login image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getAllByRole('img', {name: /website login/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(ebankLoginLogo)
  })

  it(':::RJSCEM5CP5_TEST_15:::Login Route should consist of an HTML main heading element with the text content as "Welcome Back":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {name: /Welcome Back/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCEM5CP5_TEST_16:::Login Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCEM5CP5_TEST_17:::Login Route should consist of an HTML input element with label text as "User ID" and type as "text":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByLabelText(/User ID/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it(':::RJSCEM5CP5_TEST_18:::Login Route should consist of an HTML input element with label text as "PIN" and type as "password":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByLabelText(/PIN/i, {exact: false}).type).toBe('password')
  })

  it(':::RJSCEM5CP5_TEST_19:::Login Route should consist of an HTML button element with text content as "Login" and type as "submit":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {name: /Login/i, exact: false})
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it(':::RJSCEM5CP5_TEST_20:::When "/ebank/login" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login" and src as given login image URL:::15:::', async () => {
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    const imageEls = await screen.findByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(ebankLoginLogo)
  })

  it(':::RJSCEM5CP5_TEST_21:::When "/" is provided as the URL by an authenticated user, then the page should be navigated to Home Route and consists of an HTML image element with alt attribute value as "website logo" and src as given website logo image URL:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, loginRoutePath)
    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    restoreGetCookieFns()
    const imageEls = await screen.findByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(ebankLogo)
  })

  it(':::RJSCEM5CP5_TEST_22:::When a non-empty value is provided in the HTML input element with the label text as "User ID", then the value provided should be displayed in the HTML input element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    userEvent.type(
      screen.getByLabelText(/User ID/i, {
        exact: false,
      }),
      '142420',
    )
    expect(
      screen.getByLabelText(/User ID/i, {
        exact: false,
      }),
    ).toHaveValue('142420')
  })

  it(':::RJSCEM5CP5_TEST_23:::When a non-empty value is provided in the HTML input element with the label text as "PIN", then the value provided should be displayed in the HTML input element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    userEvent.type(
      screen.getByLabelText(/PIN/i, {
        exact: false,
      }),
      '231225',
    )
    expect(
      screen.getByLabelText(/PIN/i, {
        exact: false,
      }),
    ).toHaveValue('231225')
  })

  it(':::RJSCEM5CP5_TEST_24:::When the Login button is clicked with an empty user id and pin then the respective error message should be displayed using an HTML paragraph element:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '')
    userEvent.type(pinField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(/Invalid user ID/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCEM5CP5_TEST_25:::When a valid user id is provided and the Login button is clicked with an empty pin then the respective error message should be displayed using an HTML paragraph element:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(/Invalid PIN/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCEM5CP5_TEST_26:::When a valid user id is provided and the Login button is clicked with an empty pin then the respective error message should be displayed and the page should not be navigated:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(/Invalid PIN/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCEM5CP5_TEST_27:::When a non-empty pin is provided and the Login button is clicked with an empty user id then the respective error message should be displayed:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User iD/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '')
    userEvent.type(pinField, '231225')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Invalid user ID/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEM5CP5_TEST_28:::When a non-empty pin is provided and the Login button is clicked with an empty user id then the page should not be navigated:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '')
    userEvent.type(pinField, 'rahul1')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Invalid user ID/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    await waitFor(() => expect(history.location.pathname).toBe(loginRoutePath))
  })

  it(':::RJSCEM5CP5_TEST_29:::When an invalid user id and pin are provided and the Login button is clicked then the respective error message should be displayed and the page should not be navigated:::10:::', async () => {
    const {history} = rtlRender(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, 'unknown')
    userEvent.type(pinField, '231225')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Invalid user ID/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCEM5CP5_TEST_30:::When a valid user id and invalid pin are provided and the Login button is clicked then the respective error message should be displayed and the page should not be navigated:::10:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, 'wrongPassword')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/User ID and PIN didn't match/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCEM5CP5_TEST_31:::When the Login is successful, an HTTP GET request should be made to loginApiUrl:::10:::', async () => {
    mockSetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(loginSuccessResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '231225')
    userEvent.click(loginButton)
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(`${apiUrl}`)
    window.fetch = originalFetch
    restoreSetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_32:::When the Login is successful, then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument, and expiry days as the third argument:::15:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '231225')
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

  it(':::RJSCEM5CP5_TEST_33:::When the Login is successful, then the history.replace() method should be called with the argument "/":::15:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)
    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '231225')
    userEvent.click(loginButton)

    await waitFor(() => {
      expect(history.replace).toHaveBeenCalledWith('/')
    })

    restoreHistoryReplace(history)
  })

  it(':::RJSCEM5CP5_TEST_34:::When a valid user id and pin are provided and the Login button is clicked then the page should be navigated to Home Route:::15:::', async () => {
    renderWithBrowserRouter(<App />)

    const userIdField = screen.getByLabelText(/User ID/i, {
      exact: false,
    })
    const pinField = screen.getByLabelText(/PIN/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(userIdField, '142420')
    userEvent.type(pinField, '231225')
    userEvent.click(loginButton)
    mockGetCookie()

    expect(
      await screen.findByRole('heading', {
        name: /Your Flexibility, Our Excellence/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    await expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })
})
