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

const homeImageLightTheme =
  'https://assets.ccbp.in/frontend/react-js/home-light-img.png'

const homeImageDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/home-dark-img.png'

const darkThemeImage =
  'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

const lightThemeImage =
  'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'

const aboutImageDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/about-dark-img.png'

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

const rtlRenderContext = (providerProps, path = '/') => {
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

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPCMYYO_TEST_SUITE_2:::Home Route tests', () => {
  it(':::RJSCPCMYYO_TEST_25:::Home Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given website logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoLightTheme)
  })

  it(':::RJSCPCMYYO_TEST_26:::Page should consist of an HTML unordered list to display the list of nav items:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPCMYYO_TEST_27:::Page should consists of at least two HTML list items:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPCMYYO_TEST_28:::Page should consists of "Home" text wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getAllByRole('link', {
        name: /Home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_29:::Page should consists of "About" text wrapped with Link from react-router-dom:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getAllByRole('link', {
        name: /about/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_30:::Home Route should consist of an HTML image element with alt attribute value as "theme" and src as the given dark theme image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      darkThemeImage,
    )
  })

  it(':::RJSCPCMYYO_TEST_31:::Home Route should consist of an HTML image element with alt attribute value as "home" and src as the given light Home image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('img', {name: /home/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /home/i, exact: false}).src).toBe(
      homeImageLightTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_32:::Home Route should consist of an HTML main heading element with text content as "Home":::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getByRole('heading', {name: /Home/i})).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_33:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the Home Route should consist of an HTML image element with alt attribute value as "theme" and src as the given light theme image URL:::5:::', () => {
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

  it(':::RJSCPCMYYO_TEST_34:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the Home Route should consist of an HTML image element with alt attribute value as "home" and src as the given dark home image URL:::5:::', () => {
    rtlRenderContext({
      value: {isDarkTheme: true, toggleTheme: jest.fn()},
    })
    expect(
      screen.getByRole('img', {name: /home/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /home/i, exact: false}).src).toBe(
      homeImageDarkTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_35:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the Home Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given dark theme website logo:::5:::', () => {
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

  it(':::RJSCPCMYYO_TEST_36:::When the value of the "isDarkTheme" key in "ThemeContext" is true then the page should consists of "Home" and "About" texts wrapped with Link from react-router-dom:::5:::', () => {
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

  it(':::RJSCPCMYYO_TEST_37:::Page should consist of an HTML button element with data-testid as "theme" should be displayed for theme button:::5:::', () => {
    renderWithBrowserRouter(<App />)

    expect(screen.getByTestId('theme')).toBeInTheDocument()
  })

  it(':::RJSCPCMYYO_TEST_38:::When the theme button is clicked then the "toggleTheme" method in "ThemeContext" should be called:::5:::', () => {
    const providerProps = {
      value: {isDarkTheme: false, toggleTheme: jest.fn()},
    }

    rtlRenderContext({...providerProps})

    userEvent.click(screen.getByTestId('theme'))

    expect(providerProps.value.toggleTheme).toHaveBeenCalled()
  })

  it(':::RJSCPCMYYO_TEST_39:::When the theme button is clicked then the Home Route should consist of an HTML image element with alt attribute value as "theme" and src as the given light theme image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /theme/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /theme/i, exact: false}).src).toBe(
      lightThemeImage,
    )
  })

  it(':::RJSCPCMYYO_TEST_40:::When the theme button is clicked then the Home Route should consist of an HTML image element with alt attribute value as "home" and src as the given dark home image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /home/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /home/i, exact: false}).src).toBe(
      homeImageDarkTheme,
    )
  })

  it(':::RJSCPCMYYO_TEST_41:::When the theme button is clicked then the Home Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given website logo URL:::5:::', () => {
    renderWithBrowserRouter(<App />)

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /website logo/i, exact: false}).src,
    ).toBe(websiteLogoDarkTheme)
  })

  it(':::RJSCPCMYYO_TEST_42:::When the About link is clicked then the page should be navigated to About Route:::5:::', () => {
    renderWithBrowserRouter(<App />)

    const aboutBtn = screen.getByRole('link', {
      name: /about/i,
      exact: false,
    })
    userEvent.click(aboutBtn)
    expect(window.location.pathname).toBe('/about')
  })

  it(':::RJSCPCMYYO_TEST_43:::When the About link is clicked then the page should be navigated to About Route and the theme should be persisted:::5:::', () => {
    renderWithBrowserRouter(<App />)

    const aboutBtn = screen.getByRole('link', {
      name: /about/i,
      exact: false,
    })

    userEvent.click(screen.getByTestId('theme'))

    expect(
      screen.getByRole('img', {name: /home/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /home/i, exact: false}).src).toBe(
      homeImageDarkTheme,
    )

    userEvent.click(aboutBtn)

    expect(window.location.pathname).toBe('/about')

    expect(
      screen.getByRole('img', {name: /about/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', {name: /about/i, exact: false}).src).toBe(
      aboutImageDarkTheme,
    )
  })
})
