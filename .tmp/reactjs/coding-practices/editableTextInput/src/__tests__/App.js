import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe(':::RJSCPM1V9K_TEST_SUITE_1:::Editable Text Input Tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it(':::RJSCPM1V9K_TEST_1:::Page should consist of an HTML heading element with "Editable Text Input" as text content:::5:::', () => {
    expect(
      screen.getByRole('heading', {name: /Editable Text Input/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPM1V9K_TEST_2:::Initially, the page should consist of one HTML input element:::5:::', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it(':::RJSCPM1V9K_TEST_3:::Initially, the page should consist of one HTML button element with "Save" as text content:::5:::', () => {
    expect(
      screen.getByRole('button', {name: /Save/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPM1V9K_TEST_4:::When the user entered the text in the input element, then that text should be displayed in the input element:::10:::', () => {
    userEvent.type(screen.getByRole('textbox'), 'ibhubs')
    expect(screen.getByRole('textbox')).toHaveValue('ibhubs')
  })

  it(':::RJSCPM1V9K_TEST_5:::When the user entered the text in the input element and clicks on the "Save" button, then the page should consist of paragraph element with text content as the user entered in the input element:::10:::', () => {
    userEvent.type(screen.getByRole('textbox'), 'ibhubs')
    userEvent.click(screen.getByRole('button', {name: /Save/i, exact: false}))
    expect(screen.getByText(/ibhubs/i).tagName).toBe('P')
  })

  it(':::RJSCPM1V9K_TEST_6:::When the user entered text in the input element and clicks on the "Save" button, then the page should consist of the HTML button element with text content as "Edit":::10:::', () => {
    userEvent.type(screen.getByRole('textbox'), 'ibhubs')
    userEvent.click(screen.getByRole('button', {name: /Save/i, exact: false}))
    expect(
      screen.getByRole('button', {name: /Edit/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPM1V9K_TEST_7:::When the user clicks on the "Edit" button, then the page should consist of an HTML input element with the text content of the HTML paragraph element as a value:::10:::', () => {
    userEvent.type(screen.getByRole('textbox'), 'ibhubs')
    userEvent.click(screen.getByRole('button', {name: /Save/i, exact: false}))
    userEvent.click(screen.getByRole('button', {name: /Edit/i, exact: false}))
    expect(screen.getByRole('textbox')).toHaveValue('ibhubs')
  })
})
