import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

const notFoundRoutePath = '/random-path'

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPRKKSP_TEST_SUITE_2:::Home Route tests', () => {
  it(':::RJSCPRKKSP_TEST_19:::When the "/" is provided in the browser tab then the page should be navigated to HomeRoute and consists of an HTML image element with the given image URL as src and alt text as "clothes that get you noticed":::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(homeImage)
  })
  it(':::RJSCPRKKSP_TEST_20:::HomeRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    renderWithBrowserRouter()
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
  })

  it(':::RJSCPRKKSP_TEST_21:::HomeRoute should consist of an HTML list item with "Home" as text content:::5:::', () => {
    renderWithBrowserRouter()
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[0].textContent).toMatch(/Home/i)
  })

  it(':::RJSCPRKKSP_TEST_22:::HomeRoute should consist of an HTML list item with "Products" as text content:::5:::', () => {
    renderWithBrowserRouter()
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Products/i)
  })

  it(':::RJSCPRKKSP_TEST_23:::HomeRoute should consist of an HTML list item with "Cart" as text content:::5:::', () => {
    renderWithBrowserRouter()
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[2].textContent).toMatch(/Cart/i)
  })
  it(':::RJSCPRKKSP_TEST_24:::HomeRoute should consist of an HTML heading element with "Clothes That Get YOU Noticed" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('heading', {
        name: /Clothes That Get YOU Noticed/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRKKSP_TEST_25:::HomeRoute should consist of an HTML paragraph element with text content starting with "Fashion is part of the daily air":::5:::', () => {
    renderWithBrowserRouter()
    const paragraphEl = screen.getByText(/Fashion is part of the daily air/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPRKKSP_TEST_26:::HomeRoute should consist of an HTML button element with "Shop Now" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('button', {
        name: /Shop Now/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRKKSP_TEST_27:::When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consists of an HTML image element with the given not found image URL as src and alt text as "not found":::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
    expect(window.location.pathname).toBe(notFoundRoutePath)
  })
})
