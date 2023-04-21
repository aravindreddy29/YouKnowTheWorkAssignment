import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-img.png'

const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPN3E00_TEST_SUITE_3:::Not Found Route Tests', () => {
  it(':::RJSCPN3E00_TEST_34:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML image element with alt as "not found" and src as the given Not Found Image URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
  })

  it(':::RJSCPN3E00_TEST_35:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "Lost Your Way?":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('heading', {
        name: /Lost Your Way?/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_36:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "Sorry, we cannot find that page. You will find lots to explore on the home page":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const paragraphEl = screen.getByText(
      /Sorry, we cannot find that page. You will find lots to explore on the home page/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
