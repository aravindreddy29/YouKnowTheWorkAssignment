import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const googleLogo = 'https://assets.ccbp.in/frontend/react-js/google-logo.png'

const searchIcon =
  'https://assets.ccbp.in/frontend/react-js/google-search-icon.png'

const arrowIcon =
  'https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png'

const suggestionsList = [
  {id: 1, suggestion: 'Price of Ethereum'},
  {id: 2, suggestion: 'Oculus Quest 2 specs'},
  {id: 3, suggestion: 'Tesla Share Price'},
  {id: 4, suggestion: 'Price of Ethereum today'},
  {id: 5, suggestion: 'Latest trends in AI'},
  {id: 6, suggestion: 'Latest trends in ML'},
]

const originalConsoleError = console.error

describe(':::RJSCPH6MBO_TEST_SUITE_1:::Debugging Google Search Suggestions tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })
  it(':::RJSCPH6MBO_TEST_1:::Page should consist of at least two HTML list items and the suggestionsList should be rendered using a unique key as a prop for each suggestion item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPH6MBO_TEST_2:::Page should consist of HTML image element with alt attribute value as "google logo" and src attribute value as URL for google logo:::5:::', () => {
    render(<App />)

    const imageEl = screen.getByRole('img', {
      name: /google logo/i,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(googleLogo)
  })

  it(':::RJSCPH6MBO_TEST_3:::Page should consist of HTML image element with alt attribute value as "search icon" and src attribute value as URL for search icon:::5:::', () => {
    render(<App />)

    const imageEl = screen.getByRole('img', {
      name: /search icon/i,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(searchIcon)
  })

  it(':::RJSCPH6MBO_TEST_4:::Page should consist of HTML input element with type attribute value as "search":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it(':::RJSCPH6MBO_TEST_5:::Page should consist of HTML unordered list element to display the list of suggestions received from suggestionsList:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPH6MBO_TEST_6:::Page should consist of at least six HTML list items to display the list of suggestions received from suggestionsList:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
  })

  it(':::RJSCPH6MBO_TEST_7:::Page should initially consist of HTML paragraph elements with text content equal to the "suggestion" from the suggestionsList provided:::5:::', () => {
    render(<App />)

    const firstSuggestion = screen.getAllByText(suggestionsList[0].suggestion, {
      exact: false,
    })[0]
    const secondSuggestion = screen.getByText(suggestionsList[1].suggestion, {
      exact: false,
    })
    const thirdSuggestion = screen.getByText(suggestionsList[2].suggestion, {
      exact: false,
    })
    const fourthSuggestion = screen.getByText(suggestionsList[3].suggestion, {
      exact: false,
    })
    const fifthSuggestion = screen.getByText(suggestionsList[4].suggestion, {
      exact: false,
    })
    const sixthSuggestion = screen.getByText(suggestionsList[5].suggestion, {
      exact: false,
    })

    expect(firstSuggestion).toBeInTheDocument()
    expect(firstSuggestion.tagName).toBe('P')

    expect(secondSuggestion).toBeInTheDocument()
    expect(secondSuggestion.tagName).toBe('P')

    expect(thirdSuggestion).toBeInTheDocument()
    expect(thirdSuggestion.tagName).toBe('P')

    expect(fourthSuggestion).toBeInTheDocument()
    expect(fourthSuggestion.tagName).toBe('P')

    expect(fifthSuggestion).toBeInTheDocument()
    expect(fifthSuggestion.tagName).toBe('P')

    expect(sixthSuggestion).toBeInTheDocument()
    expect(sixthSuggestion.tagName).toBe('P')
  })

  it(':::RJSCPH6MBO_TEST_8:::Page should consist of at least six HTML image elements with alt attribute value as "arrow" and src attribute value as the URL for arrow icon:::5:::', () => {
    render(<App />)

    const allArrowImages = screen.getAllByRole('img', {
      name: /arrow/i,
      exact: false,
    })

    expect(allArrowImages.length).toBeGreaterThanOrEqual(6)
    expect(
      allArrowImages.every(eachImg => eachImg.src === arrowIcon),
    ).toBeTruthy()
  })

  it(':::RJSCPH6MBO_TEST_9:::When a value is provided in the search input field, the suggestions should be filtered irrespective of the case:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'price')
    expect(screen.getByText(suggestionsList[0].suggestion)).toBeInTheDocument()
    expect(screen.getByText(suggestionsList[2].suggestion)).toBeInTheDocument()
    expect(screen.getByText(suggestionsList[3].suggestion)).toBeInTheDocument()
  })

  it(':::RJSCPH6MBO_TEST_10:::When the arrow of a suggestion is clicked, the value inside the search input should be updated to the respective suggestion that has been clicked:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getAllByRole('img', {name: /arrow/i, exact: false})[0],
    )
    expect(screen.getByRole('searchbox').value).toBe(
      suggestionsList[0].suggestion,
    )
  })
})
