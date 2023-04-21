import {Component} from 'react'

import {createMemoryHistory} from 'history'

import {Switch, Route, Router, BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import ThemeContext from '../context/ThemeContext'
import Home from '../components/Home'
import About from '../components/About'

import App from '../App'

const websiteLogoDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png'

const websiteLogoLightTheme =
  'https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png'

const aboutImageLightTheme =
  'https://assets.ccbp.in/frontend/react-js/about-light-img.png'

const aboutImageDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/about-dark-img.png'

const darkThemeImage =
  'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

const lightThemeImage =
  'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'

const homeImageDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/home-dark-img.png'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-img.png'

const notFoundRoutePath = '/unknown-path'

export default class CustomApp extends Component {
  render() {
    const {providerProps} = this.props
    return (
      <ThemeContext.Provider {...providerProps}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

let historyInstance

const rtlRenderContext = (providerProps, path = '/about') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const renderApp = render(
    <Router history={historyInstance}>
      <CustomApp providerProps={providerProps} />
    </Router>,
  )

  return {
    history: historyInstance,
    ...renderApp,
  }
}

const renderWithBrowserRouter = (ui, {route = '/about'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPCMYYO_TEST_SUITE_1:::About Route tests', () => {
  it(':::RJSCPCMYYO_TEST_1:::About Route should consist of an HTML image element with alt attribute value as "website logo" and src as given website logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoLightTheme)
  })

  it(':::RJSCPCMYYO_TEST_2:::Page should consist of an HTML unordered list to display the list of nav items:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPCMYYO_TEST_3:::Page should consists of at least two HTML list items:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPCMYYO_TEST_4:::Page should consists of "Home" text wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getAllByRole('link', {
        name: /Home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_5:::Page should consists of "About" text wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getAllByRole('link', {
        name: /about/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_6:::About Route should consist of an HTML image element with alt attribute value as "theme" and src as the given dark theme image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      darkThemeImage,
    )
  })

  it(':::RJSCPCMYYO_TEST_7:::About Route should consist of an HTML image element with alt attribute value as "about" and src as the given light theme About image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('img', {name: /about/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /about/i, exact: false}).src).toBe(
      aboutImageLightTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_8:::About Route should consist of an HTML main heading element with text content as "About":::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getByRole('heading', {name: /About/i})).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_9:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the About Route should consist of an HTML image element with alt attribute value as "theme" and src as the given light theme image URL:::5:::', () => {
    rtlRenderContext({
      value: {isDarkTheme: true, toggleTheme: jest.fn()},
    })
    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      lightThemeImage,
    )
  })

  it(':::RJSCPCMYYO_TEST_10:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the AboutRoute should consist of an HTML image element with alt attribute value as "about" and src as the given dark theme About image URL:::5:::', () => {
    rtlRenderContext({
      value: {isDarkTheme: true, toggleTheme: jest.fn()},
    })
    expect(
      screen.getByRole('img', {name: /about/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /about/i, exact: false}).src).toBe(
      aboutImageDarkTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_11:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the AboutRoute should consist of an HTML image element with alt attribute value as "website logo" and src as the given dark theme website logo URL:::5:::', () => {
    rtlRenderContext({
      value: {isDarkTheme: true, toggleTheme: jest.fn()},
    })
    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoDarkTheme)
  })

  it(':::RJSCPCMYYO_TEST_12:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the page should consists of "Home" and "About" texts wrapped with Link from react-router-dom:::5:::', () => {
    rtlRenderContext({
      value: {isDarkTheme: true, toggleTheme: jest.fn()},
    })
    expect(
      screen.getAllByRole('link', {
        name: /home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', {
        name: /about/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_13:::Page should consist of an HTML button element with data-testid "theme" should be displayed for theme image:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByTestId('theme')).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_14:::When the theme button is clicked then the "toggleTheme" method in "ThemeContext" should be called:::5:::', () => {
    const providerProps = {
      value: {isDarkTheme: false, toggleTheme: jest.fn()},
    }

    rtlRenderContext({...providerProps})

    userEvent.click(screen.getByTestId('theme'))

    expect(providerProps.value.toggleTheme).toHaveBeenCalled()
  })

  it(':::RJSCPCMYYO_TEST_15:::When the theme button is clicked then the About Route should consist of an HTML image element with alt attribute value as "theme" and src as the light theme image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      lightThemeImage,
    )
  })

  it(':::RJSCPCMYYO_TEST_16:::When the theme button is clicked then the About Route should consist of an HTML image element with alt attribute value as "about" and src as the dark theme about image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /about/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /about/i, exact: false}).src).toBe(
      aboutImageDarkTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_17:::When the theme button is clicked then the About Route should consist of an HTML image element with alt attribute value as "website logo" and src as the dark theme website logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoDarkTheme)
  })

  it(':::RJSCPCMYYO_TEST_18:::When the Home link is clicked then the page should be navigated to Home Route:::5:::', () => {
    renderWithBrowserRouter(<App />)

    const AboutBtn = screen.getByRole('link', {
      name: /Home/i,
      exact: false,
    })
    userEvent.click(AboutBtn)
    expect(window.location.pathname).toBe('/')
  })

  it(':::RJSCPCMYYO_TEST_19:::When the Home link is clicked then the page should be navigated to Home Route and the theme should be persisted:::5:::', () => {
    renderWithBrowserRouter(<App />)

    const homeBtn = screen.getByRole('link', {
      name: /home/i,
      exact: false,
    })

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /about/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /about/i, exact: false}).src).toBe(
      aboutImageDarkTheme,
    )

    userEvent.click(homeBtn)

    expect(window.location.pathname).toBe('/')

    expect(
      screen.getByRole('img', {name: /home/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /home/i, exact: false}).src).toBe(
      homeImageDarkTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_20:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consists of an HTML main heading element with text content as "Lost Your Way":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('heading', {name: /Lost Your Way/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_21:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consists of an HTML paragraph element with text content as "We cannot seem to find the page":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByText(/We cannot seem to find the page/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/We cannot seem to find the page/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCPCMYYO_TEST_22:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consists of an HTML image element with alt attribute value as "not found" and src as the given not found image URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('img', {name: /not found/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /not found/i, exact: false}).src,
    ).toBe(notFoundPageImage)
    expect(window.location.pathname).toBe(notFoundRoutePath)
  })

  it(':::RJSCPCMYYO_TEST_23:::when the theme button is clicked in the NotFound Route then the page should consist of an HTML image element with alt attribute value as "website logo" and src as the dark theme website logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoDarkTheme)
  })

  it(':::RJSCPCMYYO_TEST_24:::When the theme button is clicked in the NotFound Route then the page should consist of an HTML image element with alt attribute value as "theme" and src as the light theme image URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      lightThemeImage,
    )
  })
})
