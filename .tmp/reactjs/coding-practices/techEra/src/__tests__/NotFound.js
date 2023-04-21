import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundImage =
  'https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png'
const websiteLogoImage =
  'https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png'
const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCEMN6X9_TEST_SUITE_2:::Not Found Route tests', () => {
  it(':::RJSCEMN6X9_TEST_19:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of an HTML image element with alt as "website logo" and src as the given website logo image URL:::10:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogoImage)
  })

  it(':::RJSCEMN6X9_TEST_20:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of an HTML image element with alt as "website logo" is wrapped with Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    expect(
      screen.getByRole('link', {
        name: /website logo/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_21:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of an HTML image element with alt as "not found" and src as the given not found image URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundImage)
  })

  it(':::RJSCEMN6X9_TEST_22:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "Page Not Found":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    expect(
      screen.getByRole('heading', {
        name: /Page Not Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_23:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "We are sorry, the page you requested could not be found":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    const paragraphEl = screen.getByText(
      /We are sorry, the page you requested could not be found/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
