import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const homeRoutePath = '/'
const aboutRoutePath = '/about'
const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png'
const aboutDesktop = 'https://assets.ccbp.in/frontend/react-js/about-lg-img.png'
const aboutMobile = 'https://assets.ccbp.in/frontend/react-js/about-sm-img.png'

const renderWithBrowserRouter = (ui, {route = aboutRoutePath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPN3E00_TEST_SUITE_1:::About Route Tests', () => {
  it(':::RJSCPN3E00_TEST_1:::About Route should consist of an HTML image element with alt attribute value as "website logo":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_2:::About Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given logo URL is wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('link', {
        name: /website logo/,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_3:::Home Route should consist of an HTML button element with data-testid as "hamburgerIconButton":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    expect(btnEl).toBeInTheDocument()
    expect(btnEl.tagName).toBe('BUTTON')
  })

  it(':::RJSCPN3E00_TEST_4:::About Route should consist of an HTML image element with alt attribute value as "about":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /about/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_5:::When the website logo in the Header is clicked, then the page should be navigated to Home Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    userEvent.click(imageEl)
    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCPN3E00_TEST_6:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked, then the page should consist of Popup from reactjs-popup:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_7:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of the HTML button element with data-testid attribute value as "closeButton":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const closeBtnEl = screen.getByTestId('closeButton')
    expect(closeBtnEl).toBeInTheDocument()
    expect(closeBtnEl.tagName).toBe('BUTTON')
  })

  it(':::RJSCPN3E00_TEST_8:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of the HTML unordered list:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const unorderedList = screen.getByRole('list')
    expect(unorderedList).toBeInTheDocument()
    expect(unorderedList.tagName).toBe('UL')
  })

  it(':::RJSCPN3E00_TEST_9:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of at least two HTML list items:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPN3E00_TEST_10:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page consists of an HTML element with text content as "Home" wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    expect(
      screen.getByRole('link', {
        name: /Home/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_11:::About Route should consist of an HTML image element with src as the given About image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /about/i,
      exact: false,
    })
    expect(
      imageEls.some(eachImg => eachImg.src === aboutDesktop || aboutMobile),
    ).toBeTruthy()
  })

  it(':::RJSCPN3E00_TEST_12:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page consists of an HTML element with text content as "About" wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    expect(
      screen.getByRole('link', {
        name: /About/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_13:::About Route should consist of an HTML image element with src as the given logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogo)
  })

  it(':::RJSCPN3E00_TEST_14:::When the Home link in the Popup is clicked, then the page should be navigated to Home Route:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const aboutLink = screen.getByRole('link', {
      name: /Home/i,
      exact: false,
    })
    userEvent.click(aboutLink)
    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCPN3E00_TEST_15:::When the HTML button element with data-testid attribute value as "closeButton" is clicked inside the Popup, then the page should not consist of Popup from reactjs-popup:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const closeBtn = screen.getByTestId('closeButton')
    userEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
