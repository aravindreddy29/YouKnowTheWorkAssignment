import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter, Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

import App from '../App'

const renderWithBrowserRouter = (ui, {route = '/register'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}
const websiteLogoImage =
  'https://assets.ccbp.in/frontend/react-js/meetup/website-logo-img.png'
const meetUpRegister =
  'https://assets.ccbp.in/frontend/react-js/meetup/website-register-img.png'
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

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const rtlRender = (ui = <App />, path = '/register') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

describe(':::RJSCEL8G9J_TEST_SUITE_3:::Register Route tests', () => {
  it(':::RJSCEL8G9J_TEST_14:::Register Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as given website logo image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogoImage)
  })
  it(':::RJSCEL8G9J_TEST_15:::Register Route should consist of an HTML image element with alt attribute value as "website register" and src as given website register image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website register/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(meetUpRegister)
  })
  it(':::RJSCEL8G9J_TEST_16:::Register Route should consist of an HTML main heading element with the text content as "Let us join":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {name: /Let us join/i, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_17:::Register Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })
  it(':::RJSCEL8G9J_TEST_18:::Register Route should consist of HTML input element with label text as "NAME" and type "text":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByLabelText(/NAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })
  it(':::RJSCEL8G9J_TEST_19:::Register Route initially should consist of an HTML select element with label text as "TOPICS" and value attribute as "ARTS_AND_CULTURE":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByLabelText(/TOPICS/i, {
        exact: false,
      }),
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').value).toMatch(/ARTS_AND_CULTURE/i)
  })
  it(':::RJSCEL8G9J_TEST_20:::Register Route should consist of HTML option elements with value attribute as the value of the key "id" from topicsList provided:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    topicsList.forEach(eachTopic => {
      const optionEl = screen.getByRole('option', {
        name: eachTopic.displayText,
        exact: false,
      })
      expect(optionEl.value).toBe(eachTopic.id)
    })
  })
  it(':::RJSCEL8G9J_TEST_21:::Register Route should consist of HTML option elements with text content as the value of the key "displayText" from topicsList provided:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    topicsList.forEach(eachTopic =>
      expect(
        screen.getByRole('option', {
          name: eachTopic.displayText,
          exact: false,
        }),
      ).toBeInTheDocument(),
    )
  })
  it(':::RJSCEL8G9J_TEST_22:::Register Route should consist of an HTML button element with text content as "Register Now" and type as "submit":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Register Now/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })
  it(':::RJSCEL8G9J_TEST_23:::When a non-empty value is provided in the HTML input element with the label text "NAME", then the value provided should be displayed in the HTML input element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    userEvent.type(
      screen.getByLabelText(/NAME/i, {
        exact: false,
      }),
      'rahul',
    )
    expect(
      screen.getByLabelText(/NAME/i, {
        exact: false,
      }),
    ).toHaveValue('rahul')
  })
  it(':::RJSCEL8G9J_TEST_24:::When a topic option is selected in the HTML select element, the selected option should be displayed in the HTML select element:::10:::', () => {
    renderWithBrowserRouter(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      topicsList[2].displayText,
    )
    expect(screen.getByRole('combobox').value).toBe(topicsList[2].id)
  })

  it(':::RJSCEL8G9J_TEST_25:::When the "Register Now" button is clicked with an empty name input, then the page should consist of an HTML paragraph element to display the error message with text content as "Please enter your name" :::10:::', async () => {
    renderWithBrowserRouter(<App />)
    const nameField = screen.getByLabelText(/NAME/i, {
      exact: false,
    })
    const registerNowButton = screen.getByRole('button', {
      name: /Register Now/i,
      exact: false,
    })

    userEvent.click(registerNowButton)
    const paragraphEl = screen.getByText(/^Please enter your name/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
  it(':::RJSCEL8G9J_TEST_26:::When the values are provided for both the input and select elements and the "Register Now" button is clicked, then the history.replace() method should be called with the argument "/" and page should navigate to Home Route:::10:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)

    userEvent.type(
      screen.getByLabelText(/NAME/i, {
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
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })
  it(':::RJSCEL8G9J_TEST_27:::When the values are provided for both the input and select elements and the "Register Now" button is clicked, then the page should navigate to Home Route and should consist of an HTML image element with alt attribute value as "meetup" and src attribute value as given meetup image URL :::10:::', async () => {
    renderWithBrowserRouter(<App />)

    userEvent.type(
      screen.getByLabelText(/NAME/i, {
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
    const imageEl = screen.getByRole('img', {
      name: /meetup/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(meetUpImage)
  })
})
