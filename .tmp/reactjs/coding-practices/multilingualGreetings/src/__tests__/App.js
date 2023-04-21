import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'jest-styled-components'

import App from '../App'

const languageGreetingsList = [
  {
    id: 'bfdf40eb-eec9-4a66-a493-752fe689f0d0',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/english-greetings-img.png',
    buttonText: 'English',
    imageAltText: 'english',
  },
  {
    id: '0ceda891-2a0c-49e2-8c62-68e78180bac6',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/tamil-greetings-img.png',
    buttonText: 'Tamil',
    imageAltText: 'tamil',
  },
  {
    id: '89537778-7a46-4c58-988c-0adc931d087c',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/telugu-greetings-img.png',
    buttonText: 'Telugu',
    imageAltText: 'telugu',
  },
]

const originalConsoleError = console.error

describe(':::RJSCP42KBV_TEST_SUITE_1:::Multilingual Greetings Tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCP42KBV_TEST_1:::The page should consist of at least one HTML list item and the languageGreetingsList should be rendered using a unique key as a prop for each languageGreetingsItem :::10:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCP42KBV_TEST_2:::The page should consist of HTML main heading element with text content as "Multilingual Greetings":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Multilingual Greetings/i}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Multilingual Greetings/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP42KBV_TEST_3:::The page should consist of HTML unordered list element to display the languageGreetingsItems :::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCP42KBV_TEST_4:::The Page should consist of at least three HTML list items to display the given list of languageGreetingsItems:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCP42KBV_TEST_5:::The Page should consist of at least three HTML button elements that have the text content with the value of the key "buttonText" provided in languageGreetingsList:::10:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {
        name: languageGreetingsList[0].buttonText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: languageGreetingsList[1].buttonText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: languageGreetingsList[2].buttonText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP42KBV_TEST_6:::The page should consist of an HTML image element, which initially has alt text with the value of key "imageAltText" from the first item  provided in languageGreetingsList:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('img', {
        name: languageGreetingsList[0].imageAltText,
        exact: true,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP42KBV_TEST_7:::The page should consist of an HTML image element, which initially has src with the value of key "imageUrl" from the first item  provided in languageGreetingsList:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('img', {
        name: languageGreetingsList[0].imageAltText,
        exact: true,
      }).src,
    ).toBe(languageGreetingsList[0].imageUrl)
  })

  it(':::RJSCP42KBV_TEST_8:::When a languageGreetingsItem is clicked, then the corresponding greeting image should have alt text with the value of key "imageAltText" provided in languageGreetingsList:::10:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {
        name: languageGreetingsList[1].buttonText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('img', {
        name: languageGreetingsList[1].imageAltText,
        exact: true,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP42KBV_TEST_9:::When a languageGreetingsItem is clicked, then the corresponding greeting image should have src with the value of key "imageUrl" provided in languageGreetingsList:::10:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {
        name: languageGreetingsList[1].buttonText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('img', {
        name: languageGreetingsList[1].imageAltText,
        exact: true,
      }).src,
    ).toBe(languageGreetingsList[1].imageUrl)
  })
})
