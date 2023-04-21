import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cookies from 'js-cookie'
import App from '../App'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const cartImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
const loginRoutePath = '/login'
const productsRoutePath = '/products'
const homeRoutePath = '/'

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

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

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const rtlRender = (ui = <App />, path = '/') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPFOQQB_TEST_SUITE_4:::Home Route tests', () => {
  it(':::RJSCPFOQQB_TEST_34:::When the "/" is provided in the URL by an unauthenticated user then the page should be redirected to LoginRoute and consist is an HTML input element with label text as "USERNAME":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(screen.getByLabelText(/USERNAME/i, {exact: false}))
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_35:::When the "/" is provided in the URL by an authenticated user then the page should be navigated to HomeRoute and consist of an HTML image element with the given home image URL as src and alt as "clothes that get you noticed":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_36:::When the Products link is clicked then the page should be navigated to ProductsRoute and consist of an HTML main heading element with text content as "Category":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const productsBtns = screen.getAllByRole('link', {
      name: /products/i,
      exact: false,
    })
    userEvent.click(productsBtns[0])
    await waitFor(() =>
      expect(window.location.pathname).toBe(productsRoutePath),
    )
    expect(screen.getByText('Category')).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_37:::When the Cart link is clicked then the page should be navigated to CartRoute and consist of an HTML image element with the given image URL as src and alt as "cart":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const cartBtns = screen.getAllByRole('link', {
      name: /cart/i,
      exact: false,
    })
    userEvent.click(cartBtns[0])
    await waitFor(() => expect(window.location.pathname).toBe('/cart'))
    const cartImgs = screen.getAllByRole('img', {
      name: 'cart empty',
      exact: false,
    })
    expect(cartImgs.some(eachImg => eachImg.src === cartImage)).toBe(true)
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_38:::When the logout button is clicked then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[1])
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_39:::When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[1])
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_40:::When the logout button is clicked then the page should be navigated to LoginRoute and consist of an HTML button element with "Login" as text content:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtns[1])
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
    expect(screen.getByRole('button', {name: /Login/i, exact: false}))
    restoreRemoveCookieFns()
  })
})
