import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const homeRoutePath = '/'
const aboutRoutePath = '/about'
const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png'
const homeDesktop = 'https://assets.ccbp.in/frontend/react-js/home-lg-img.png'
const homeMobile = 'https://assets.ccbp.in/frontend/react-js/home-sm-img.png'

const renderWithBrowserRouter = (ui, {route = homeRoutePath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/Header/index.js'),
  'utf8',
)

describe(':::RJSCPN3E00_TEST_SUITE_2:::Home Route Tests', () => {
  it(':::RJSCPN3E00_TEST_16:::Home Route should consist of an HTML image element with alt attribute value as "website logo":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_17:::Home Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given logo URL is wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('link', {
        name: /website logo/,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_18:::Home Route should consist of an HTML button element with data-testid as "hamburgerIconButton":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    expect(btnEl).toBeInTheDocument()
    expect(btnEl.tagName).toBe('BUTTON')
  })

  it(':::RJSCPN3E00_TEST_19:::JS code code implementation for Header Component should use "GiHamburgerMenu" from the react-icons package:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(jsxCode.match(/GiHamburgerMenu/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPN3E00_TEST_20:::JS code code implementation for Header Component should use "IoMdClose" from the react-icons package:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(jsxCode.match(/IoMdClose/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPN3E00_TEST_21:::JS code code implementation for Header Component should use "AiFillHome" from the react-icons package:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(jsxCode.match(/AiFillHome/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPN3E00_TEST_22:::JS code code implementation for Header Component should use "BsInfoCircleFill" from the react-icons package:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(jsxCode.match(/BsInfoCircleFill/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPN3E00_TEST_23:::Home Route should consist of an HTML image element with alt attribute value as "home":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /home/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_24:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked, then the page should consist of Popup from reactjs-popup:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPN3E00_TEST_25:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of the HTML button element with data-testid attribute value as "closeButton":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const closeBtnEl = screen.getByTestId('closeButton')
    expect(closeBtnEl).toBeInTheDocument()
    expect(closeBtnEl.tagName).toBe('BUTTON')
  })

  it(':::RJSCPN3E00_TEST_26:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of the HTML unordered list:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const unorderedList = screen.getByRole('list')
    expect(unorderedList).toBeInTheDocument()
    expect(unorderedList.tagName).toBe('UL')
  })

  it(':::RJSCPN3E00_TEST_27:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page should consist of at least two HTML list items:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPN3E00_TEST_28:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page consists of an HTML element with text content as "Home" wrapped with Link from react-router-dom:::5:::', () => {
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

  it(':::RJSCPN3E00_TEST_29:::Home Route should consist of an HTML image element with src as the given logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogo)
  })

  it(':::RJSCPN3E00_TEST_30:::When the HTML button element with data-testid as "hamburgerIconButton" is clicked", then the page consists of an HTML element with text content as "About" wrapped with Link from react-router-dom:::5:::', () => {
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

  it(':::RJSCPN3E00_TEST_31:::Home Route should consist of an HTML image element with src as the given Home image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /home/i,
      exact: false,
    })
    expect(
      imageEls.some(eachImg => eachImg.src === homeDesktop || homeMobile),
    ).toBeTruthy()
  })

  it(':::RJSCPN3E00_TEST_32:::When the About link in the Popup is clicked, then the page should be navigated to About Route:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
      exact: false,
    })
    userEvent.click(aboutLink)
    expect(window.location.pathname).toBe(aboutRoutePath)
  })

  it(':::RJSCPN3E00_TEST_33:::When the HTML button element with data-testid attribute value as "closeButton" is clicked inside the Popup, then the page should not consist of Popup from reactjs-popup:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const btnEl = screen.getByTestId('hamburgerIconButton')
    userEvent.click(btnEl)
    const closeBtn = screen.getByTestId('closeButton')
    userEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
