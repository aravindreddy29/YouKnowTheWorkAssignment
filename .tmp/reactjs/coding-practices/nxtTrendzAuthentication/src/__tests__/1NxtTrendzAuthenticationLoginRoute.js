import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const loginRoutePath = '/login'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
}

const passwordIncorrect = {
  error_msg: "Username and Password didn't match",
}

const invalidUser = {
  error_msg: 'Username is not found',
}
const invalidInputs = {
  error_msg: 'Username or password is invalid',
}

const apiUrl = 'https://apis.ccbp.in/login'

const server = setupServer(
  rest.post(apiUrl, (req, res, ctx) => {
    const {username} = JSON.parse(req.body)
    const {password} = JSON.parse(req.body)

    if (
      username === '' ||
      password === '' ||
      username === undefined ||
      password === undefined
    )
      return res(ctx.status(400, 'invalid request'), ctx.json(invalidInputs))
    if (username === 'rahul' && password === 'rahul@2021')
      return res(ctx.json(loginSuccessResponse))
    if (username === 'rahul' && password !== 'rahul@2021')
      return res(
        ctx.status(401, 'invalid request'),
        ctx.json(passwordIncorrect),
      )
    return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
  }),
)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const rtlRender = (ui = <App />, path = '/login') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (ui = <App />, {route = '/login'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPRKKSP_TEST_SUITE_1:::Login Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPRKKSP_TEST_1:::When the "/login" is provided in the browser tab then the page should be navigated to LoginRoute and consists of an HTML input element with "Username" as a placeholder:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByPlaceholderText(/Username/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRKKSP_TEST_2:::LoginRoute should consist of an HTML input element with "Password" as a placeholder:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByPlaceholderText(/Password/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRKKSP_TEST_3:::LoginRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getAllByRole('img', {name: /website logo/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(websiteLogo)
  })

  it(':::RJSCPRKKSP_TEST_4:::LoginRoute should consist of an HTML image element with the given login URL as src and alt text as "website login":::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(loginImage)
  })

  it(':::RJSCPRKKSP_TEST_5:::LoginRoute should consist of an HTML label element with text content as "USERNAME":::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPRKKSP_TEST_6:::LoginRoute should consist of an HTML input element with type attribute value as "text":::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it(':::RJSCPRKKSP_TEST_7:::LoginRoute should consist of an HTML label element with text content as "PASSWORD":::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByLabelText(/PASSWORD/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPRKKSP_TEST_8:::LoginRoute should consist of an HTML input element with type attribute value as "password":::5:::', () => {
    renderWithBrowserRouter()
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}).type).toBe(
      'password',
    )
  })
  it(':::RJSCPRKKSP_TEST_9:::LoginRoute should consist of an HTML button element with "Login" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('button', {name: /Login/i, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCPRKKSP_TEST_10:::LoginRoute should consist of a "Login" button with type attribute value as "submit":::5:::', () => {
    renderWithBrowserRouter()
    const buttonEl = screen.getByRole('button', {name: /Login/i, exact: false})
    expect(
      screen.getByRole('button', {name: /Login/i, exact: false}),
    ).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it(':::RJSCPRKKSP_TEST_11:::When a valid username is provided and the login button is clicked with an empty password then the respective error message should be displayed using an HTML paragraph element:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)

    const paragraphEl = await screen.findByText(
      /Username or password is invalid/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPRKKSP_TEST_12:::When a valid username is provided and the login button is clicked with an empty password then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender()

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)

    expect(
      await screen.findByText(/Username or password is invalid/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPRKKSP_TEST_13:::When a non-empty password is provided and the login button is clicked with an empty username then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender()

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, 'rahul1')
    userEvent.click(loginButton)

    expect(
      await screen.findByText(/Username or password is invalid/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPRKKSP_TEST_14:::When an invalid username and password are provided and the login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender()

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
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

  it(':::RJSCPRKKSP_TEST_15:::When a valid username and invalid password are provided and the login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender()
    mockHistoryReplace(history)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'wrongPassword')
    userEvent.click(loginButton)

    expect(
      await screen.findByText(/Username and Password didn't match/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPRKKSP_TEST_16:::When a valid username and password are provided and the login button is clicked then the page should be navigated to HomeRoute and consist of an HTML heading element with "Clothes That Get YOU Noticed" as text content:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(
      await screen.findByRole('heading', {
        name: /Clothes That Get YOU Noticed/i,
        exact: false,
      }),
    )

    expect(window.location.pathname).toBe('/')
  })
  it(':::RJSCPRKKSP_TEST_17:::When a valid username and password are provided and the login button is clicked then the history.replace() method should be called:::5:::', async () => {
    const {history} = rtlRender()
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalled())
    restoreHistoryReplace(history)
  })
  it(':::RJSCPRKKSP_TEST_18:::When a valid username and password are provided and the login button is clicked then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender()
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })
})
