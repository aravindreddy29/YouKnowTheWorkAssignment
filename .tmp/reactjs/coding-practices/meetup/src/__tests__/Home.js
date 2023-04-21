import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}
const websiteLogoImage =
  'https://assets.ccbp.in/frontend/react-js/meetup/website-logo-img.png'
const meetUpImage =
  'https://assets.ccbp.in/frontend/react-js/meetup/meetup-img.png'

const registerRoute = '/register'
const homeRoute = '/'

const topicsList = [
  {
    id: 'ARTS_AND_CULTURE',
    displayText: 'Arts and Culture',
  },
  {
    id: 'CAREER_AND_BUSINESS',
    displayText: 'Career and Business',
  },
  {
    id: 'EDUCATION_AND_LEARNING',
    displayText: 'Education and Learning',
  },
  {
    id: 'FASHION_AND_BEAUTY',
    displayText: 'Fashion and Learning',
  },
  {
    id: 'GAMES',
    displayText: 'Games',
  },
]

describe(':::RJSCEL8G9J_TEST_SUITE_1:::Home Route tests', () => {
  it(':::RJSCEL8G9J_TEST_1:::Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src value as given website logo image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogoImage)
  })
  it(':::RJSCEL8G9J_TEST_2:::Home Route should initially consist of an HTML main heading element with the text content as "Welcome to Meetup":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {name: /Welcome to Meetup/i, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_3:::Home Route should initially consist of an HTML paragraph element with the text content as "Please register for the topic":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const paragraphEl = screen.getByText(/Please register for the topic/i, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
  it(':::RJSCEL8G9J_TEST_4:::Home Route should initially consist of an HTML button element with text content as "Register":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Register/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_5:::Home Route should initially consist of an HTML button element with text content as "Register" and is wrapped with a "Link" from react-router-dom:::10:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('link', {
        name: /Register/,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_6:::Home Route should consist of an HTML image element with alt attribute value as "meetup" and src attribute value as given meetup image URL:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /meetup/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(meetUpImage)
  })
  it(':::RJSCEL8G9J_TEST_7:::When the "Register" button in the Home Route is clicked, then the page should be navigated to Register Route:::10:::', async () => {
    renderWithBrowserRouter(<App />)
    const registerButton = screen.getByRole('button', {
      name: /Register/i,
      exact: false,
    })
    userEvent.click(registerButton)
    expect(window.location.pathname).toBe(registerRoute)
  })
  it(':::RJSCEL8G9J_TEST_8:::When the "Register" button in the Home Route is clicked, then the page should be navigated to Register Route and should consist of HTML main heading element with the text content as "Let us join":::10:::', async () => {
    renderWithBrowserRouter(<App />)
    const registerButton = screen.getByRole('button', {
      name: /Register/i,
      exact: false,
    })
    userEvent.click(registerButton)
    expect(window.location.pathname).toBe(registerRoute)
    expect(
      screen.getByRole('heading', {name: /Let us join/i, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_9:::When a value is provided in the HTML input element and the "Register Now" button in Register Route is clicked, then the value provided in the input element should be displayed in the Home Route as "Hello {Name}" and here the Name is the value of the HTML input element in the Register Route:::10:::', async () => {
    renderWithBrowserRouter(<App />, {route: registerRoute})

    userEvent.type(
      screen.getByLabelText(/NAME/i, {
        exact: false,
      }),
      'dinesh',
    )
    const registerBtn = screen.getByRole('button', {
      name: /Register Now/i,
      exact: false,
    })
    userEvent.click(registerBtn)
    expect(window.location.pathname).toBe(homeRoute)
    const headingEl = screen.getByRole('heading')
    expect(headingEl.textContent).toMatch(new RegExp(`Hello dinesh`, 'i'))
  })
  it(':::RJSCEL8G9J_TEST_10:::When a non-empty input name is provided and a topic is selected in the HTML select element and the "Register Now" button in Register Route is clicked, then the respective "displayText" for the value provided in the select element should be displayed in the Home Route:::10:::', async () => {
    renderWithBrowserRouter(<App />, {route: registerRoute})
    userEvent.type(
      screen.getByLabelText(/Name/i, {
        exact: false,
      }),
      'dinesh',
    )
    const selectEl = screen.getByRole('combobox')
    userEvent.selectOptions(selectEl, topicsList[1].id)
    const registerBtn = screen.getByRole('button', {
      name: /Register Now/i,
      exact: false,
    })
    userEvent.click(registerBtn)
    expect(window.location.pathname).toBe(homeRoute)
    const topic = screen.getByText(topicsList[1].displayText, {
      exact: false,
    })
    expect(topic).toBeInTheDocument()
  })
})
