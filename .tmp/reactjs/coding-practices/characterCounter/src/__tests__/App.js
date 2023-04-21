import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

jest.mock('uuid', () => {
  let counter = 0
  const uuidGen = () => {
    counter += 1
    return `uuid_${counter}`
  }
  const reset = () => {
    counter = 0
  }
  return {v4: uuidGen, reset}
})

const uuid = require('uuid')

const originalConsoleError = console.error
const noInputsImage =
  'https://assets.ccbp.in/frontend/react-js/no-user-inputs-img.png'

describe(':::RJSCEGBK15_TEST_SUITE_1:::Character Counter Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    uuid.reset()
  })
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCEGBK15_TEST_1:::When two user input items are added, then the page should consist of at least two HTML list items rendered using a unique key as a prop to display user input items:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }

    render(<App />)

    userEvent.type(screen.getByRole('textbox'), 'Go to Gym')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.type(screen.getByRole('textbox'), 'Need to prepare for the exam')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCEGBK15_TEST_2:::Page should consist of an HTML main heading element with text content as "Count the characters like a Boss":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Count the characters like a Boss/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEGBK15_TEST_3:::Page should consist of an HTML image element with alt as "no user inputs" and src attribute value as the URL for no user inputs image:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /no user inputs/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(noInputsImage)
  })

  it(':::RJSCEGBK15_TEST_4:::Page should consist of an HTML main heading element with text content as "Character Counter":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Character Counter/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEGBK15_TEST_5:::Page should consist of an HTML form element to provide the user input:::5:::', () => {
    const {container} = render(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCEGBK15_TEST_6:::Page should consist of an HTML input element with the placeholder as "Enter the Characters here" and type as "text":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter the Characters here/i, {
      exact: false,
    })
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('text')
  })

  it(':::RJSCEGBK15_TEST_7:::Page should consist of an HTML button element with text content as "Add":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Add/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCEGBK15_TEST_8:::When a non-empty value is provided in the HTML input element, then the value inside the HTML input element should be updated:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Go to Gym')
    expect(screen.getByRole('textbox').value).toBe('Go to Gym')
  })

  it(':::RJSCEGBK15_TEST_9:::When a non-empty value is provided in the HTML input element and Add button is clicked, then the page should consist of an HTML unordered list element to display the list of user input items:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Orange')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')
  })

  it(':::RJSCEGBK15_TEST_10:::When a non-empty value is provided in the HTML input element and Add button is clicked, then an HTML list item element should be added to display the newly added user input item:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Movie')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCEGBK15_TEST_11:::When a non-empty value is provided in the HTML input element and Add button is clicked, an HTML list item element should be added to the user inputs list with a unique id imported from the uuid package:::5:::', () => {
    const spy = jest.spyOn(uuid, 'v4')
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Movie')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCEGBK15_TEST_12:::When a new user input item is added, then an HTML paragraph element with text content as the value provided in user input should be displayed:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Movie')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getByText(/Movie/i)).toBeInTheDocument()
    expect(screen.getByText(/Movie/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCEGBK15_TEST_13:::When a new user input item is added, then the characters count of the value provided in user input should be displayed:::5:::', () => {
    render(<App />)
    const string = 'Movie'

    userEvent.type(screen.getByRole('textbox'), string)
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getByText(string.length, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCEGBK15_TEST_14:::When a new user input item is added, then the value inside the HTML input element should be updated to the initial value:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('textbox'), 'Movie')
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getByRole('textbox').value).toBe('')
  })
})
