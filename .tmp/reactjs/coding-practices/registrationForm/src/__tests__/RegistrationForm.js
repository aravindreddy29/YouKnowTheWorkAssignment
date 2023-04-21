import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const successImage =
  'https://assets.ccbp.in/frontend/react-js/success-icon-img.png'

describe(':::RJSCPYGCFL_TEST_SUITE_1:::Registration Form tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it(':::RJSCPYGCFL_TEST_1:::Page should consist of an HTML heading element with "Registration" as text content:::5:::', () => {
    expect(screen.getByRole('heading', {name: /Registration/i, exact: false}))
  })

  it(':::RJSCPYGCFL_TEST_2:::Page should consist of an HTML input element with label text as "FIRST NAME":::5:::', () => {
    expect(
      screen.getByRole('textbox', {name: /FIRST NAME/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYGCFL_TEST_3:::Page should consist of an HTML input element with label text as "LAST NAME":::5:::', () => {
    expect(
      screen.getByRole('textbox', {name: /LAST NAME/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYGCFL_TEST_4:::When a non-empty first name is provided and the submit button is clicked with empty last name then the page should consist of an HTML paragraph element with "Required" as text content:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    userEvent.type(firstNameField, 'Bidden')
    userEvent.click(submitButton)

    const errorMsgEl = screen.getByText(/Required/i, {
      exact: false,
    })
    expect(errorMsgEl.tagName).toBe('P')
  })
  it(':::RJSCPYGCFL_TEST_5:::When the submit button is clicked with empty fields then the error message "Required" should be displayed for both the input fields:::5:::', () => {
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })

    userEvent.click(submitButton)

    const errorMsgEls = screen.getAllByText(/Required/i, {
      exact: false,
    })
    expect(errorMsgEls.length).toBe(2)
  })
  it(':::RJSCPYGCFL_TEST_6:::When a non-empty last name is provided and the submit button is clicked with empty first name then the error message "Required" should be displayed:::5:::', () => {
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    userEvent.type(lastNameField, 'Bidden')
    userEvent.click(submitButton)
    expect(
      screen.getByText(/Required/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPYGCFL_TEST_7:::On successful submission, an HTML paragraph element with "Submitted Successfully" as text content should be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    userEvent.type(firstNameField, 'Joe')
    userEvent.type(lastNameField, 'Bidden')
    userEvent.click(submitButton)
    const submissionText = screen.getByText(/Submitted Successfully/i, {
      exact: false,
    })
    expect(submissionText).toBeInTheDocument()
    expect(submissionText.tagName).toBe('P')
  })
  it(':::RJSCPYGCFL_TEST_8:::On successful submission, an HTML image element with the given image URL and alt text as "success" should be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    userEvent.type(firstNameField, 'Joe')
    userEvent.type(lastNameField, 'Bidden')
    userEvent.click(submitButton)
    const successImg = screen.getByRole('img', {
      name: /success/i,
      exact: false,
    })
    expect(successImg).toBeInTheDocument()
    expect(successImg.src).toBe(successImage)
  })
  it(':::RJSCPYGCFL_TEST_9:::When "Submit Another Response" button is clicked then the registration form should be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    userEvent.type(firstNameField, 'Joe')
    userEvent.type(lastNameField, 'Bidden')
    userEvent.click(submitButton)
    const submitAnotherResponseBtn = screen.getByRole('button', {
      name: /Submit another response/i,
      exact: false,
    })
    userEvent.click(submitAnotherResponseBtn)

    expect(
      screen.getByLabelText(/FIRST NAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/LAST NAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPYGCFL_TEST_10:::When the empty first name field is blurred then the error message "Required" should be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })

    userEvent.click(firstNameField)
    userEvent.type(lastNameField, 'Ramu')

    expect(
      screen.getByText(/Required/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPYGCFL_TEST_11:::When the empty last name field is blurred then the error message "Required" should be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    userEvent.type(lastNameField, 'Vijay')
    userEvent.clear(lastNameField)
    userEvent.type(firstNameField, 'Ramu')

    expect(
      screen.getByText(/Required/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPYGCFL_TEST_12:::When both the first and last name fields are empty and blurred then the error message "Required" should be displayed for both fields:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    userEvent.click(lastNameField)
    userEvent.click(firstNameField)
    userEvent.click(lastNameField)

    expect(
      screen.getAllByText(/Required/i, {
        exact: false,
      }).length,
    ).toBeGreaterThanOrEqual(2)
  })
  it(':::RJSCPYGCFL_TEST_13:::When a non-empty first name is provided and blurred then the error message should not be displayed:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })
    userEvent.type(firstNameField, 'Vijay')
    userEvent.click(lastNameField)

    expect(
      screen.queryByText(/Required/i, {
        exact: false,
      }),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPYGCFL_TEST_14:::When both the first and last names are provided and blurred then the error message should not be displayed for both fields:::5:::', () => {
    const firstNameField = screen.getByLabelText(/FIRST NAME/i, {
      exact: false,
    })
    const lastNameField = screen.getByLabelText(/LAST NAME/i, {
      exact: false,
    })

    userEvent.click(lastNameField)
    userEvent.click(firstNameField)

    userEvent.type(lastNameField, 'Vijay')
    userEvent.type(firstNameField, 'Ramu')
    userEvent.click(lastNameField)

    expect(
      screen.queryAllByText(/Required/i, {
        exact: false,
      }).length,
    ).toBe(0)
  })
})
