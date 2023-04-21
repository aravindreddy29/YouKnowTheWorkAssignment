import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCP809S4_TEST_SUITE_6:::Not Found Route tests', () => {
  it(':::RJSCP809S4_TEST_56:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML image element with alt text as "not found" and src as the given not found image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
  })
})
