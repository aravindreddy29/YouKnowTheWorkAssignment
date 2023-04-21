import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const ebankLogo = 'https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png'
const digitalCardLogo =
  'https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png'
const ebankLoginLogo =
  'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

const loginRoutePath = '/ebank/login'
const homeRoutePath = '/'
let historyInstance

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

const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const rtlRender = (ui = <App />, path = '/') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalFetch = window.fetch

describe(':::RJSCEM5CP5_TEST_SUITE_1:::EBank Home Route Tests', () => {
  afterEach(() => {
    window.fetch = originalFetch
  })

  it(':::RJSCEM5CP5_TEST_1:::Home Route should consist of an HTML image element with alt attribute value as "website logo" and src as given website logo image URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imageEls = await screen.findByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(ebankLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_2:::Home Route should consist of an HTML button element with text content as "Logout":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('button', {
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_3:::Home Route should consist of an HTML main heading element with the text content as "Your Flexibility, Our Excellence":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Your Flexibility, Our Excellence/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_4:::Home Route should consist of an HTML image element with alt attribute value as "digital card" and src as given digital card image URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imageEls = await screen.findByRole('img', {
      name: /digital card/i,
      exact: false,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(digitalCardLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_5:::When "/" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login" and src as given login image URL:::15:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    const imageEl = screen.getAllByRole('img', {name: /website login/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(ebankLoginLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_6:::When "/" is provided as the URL by an authenticated user, then the page should be navigated to Home Route:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Your Flexibility, Our Excellence/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_7:::When "/ebank/login" is provided as the URL by an authenticated user, then the page should be navigated to Home Route and consist of an HTML main heading element with the text content as "Your Flexibility, Our Excellence":::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(homeRoutePath)
    expect(
      await screen.findByRole('heading', {
        name: /Your Flexibility, Our Excellence/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_8:::When the Logout button is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::15:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const logoutBtn = await screen.findByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_9:::When the Logout button is clicked, the history.replace() method should be called with the argument as "/ebank/login":::15:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)
    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCEM5CP5_TEST_10:::When the Logout button is clicked, then the page should be navigated to Login Route:::15:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />)
    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtn)
    expect(window.location.pathname).toBe(loginRoutePath)
    const imageEl = screen.getAllByRole('img', {name: /website login/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(ebankLoginLogo)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
})
