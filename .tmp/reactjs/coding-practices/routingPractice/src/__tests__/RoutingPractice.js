import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const headerLogo = 'https://assets.ccbp.in/frontend/react-js/wave-logo-img.png'
const homePageImage =
  'https://assets.ccbp.in/frontend/react-js/home-blog-img.png'

const aboutRoutePath = '/about'
const homeRoutePath = '/'
const contactRoutePath = '/contact'
const notFoundRoutePath = '/consdsadsadsdsad'

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCP4WYNC_TEST_SUITE_1:::Routing Practice tests', () => {
  it(':::RJSCP4WYNC_TEST_1:::Page should consist of an HTML image element in the header with the given logo URL as src and alt text as "wave":::5:::', () => {
    renderWithBrowserRouter()

    const imageEl = screen.getByRole('img', {name: /wave/i, exact: false})
    expect(imageEl.src).toBe(headerLogo)
  })

  it(':::RJSCP4WYNC_TEST_2:::Page should consist of a Link from react-router-dom in the header with "Home" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /Home/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_3:::Page should consist of a Link from react-router-dom in the header with "About" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_4:::Page should consist of a Link from react-router-dom in the header with "Contact" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_5:::Page should consists of an HTML heading element with "Home" as text content when rendering HomeRoute initially:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('heading', {name: /Home/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_6:::Page should consist of an HTML image element in the HomeRoute with the given home image URL as src, alt text as "home"  when rendering HomeRoute initially:::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /home/i, exact: false})
    expect(imageEl.src).toBe(homePageImage)
  })

  it(':::RJSCP4WYNC_TEST_7:::When the "/about" is provided in the browser tab then the page should be navigated to AboutRoute and consists of an HTML heading element with "About" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(
      screen.getByRole('heading', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_8:::When the "/contact" is provided in the browser tab then the page should be navigated to ContactRoute and consists of an HTML heading element with "Contact" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: contactRoutePath})
    expect(
      screen.getByRole('heading', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_9:::When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consists of an HTML heading element with "Not Found" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('heading', {name: /Not Found/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WYNC_TEST_10:::When the About link in the header is clicked then the page should be navigated to AboutRoute with "/about" in the URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    userEvent.click(screen.getByRole('link', {name: /About/i, exact: false}))
    expect(window.location.pathname).toBe(aboutRoutePath)
  })

  it(':::RJSCP4WYNC_TEST_11:::When the Contact link in the header is clicked then the page should be navigated to ContactRoute with "/contact" in URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    userEvent.click(screen.getByRole('link', {name: /Contact/i, exact: false}))
    expect(window.location.pathname).toBe(contactRoutePath)
  })

  it(':::RJSCP4WYNC_TEST_12:::When the Home link in the header is clicked then the page should be navigated to HomeRoute with "/" in URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: contactRoutePath})
    userEvent.click(screen.getByRole('link', {name: /Home/i, exact: false}))
    expect(window.location.pathname).toBe(homeRoutePath)
  })
})
