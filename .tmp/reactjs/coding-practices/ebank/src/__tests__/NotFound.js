import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundImage =
  'https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png'
const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCEM5CP5_TEST_SUITE_2:::Not Found Route tests', () => {
  it(':::RJSCEM5CP5_TEST_11:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of an HTML image element with alt as "not found" and src as the given not found image URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundImage)
  })

  it(':::RJSCEM5CP5_TEST_12:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "Page Not Found":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    expect(
      screen.getByRole('heading', {
        name: /Page Not Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEM5CP5_TEST_13:::When the "/bad-path" is provided in the URL, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "We are sorry, the page you requested could not be found":::5:::', () => {
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
