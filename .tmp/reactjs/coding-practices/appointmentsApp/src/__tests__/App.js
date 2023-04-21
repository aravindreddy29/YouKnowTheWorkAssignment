import {render, fireEvent, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import App from '../App'

const appointmentsImage =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'
const star =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const starFilled =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const originalConsoleError = console.error

describe(':::RJSCPW369F_TEST_SUITE_1:::Appointments App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })
  it(':::RJSCPW369F_TEST_1:::When a new appointment is added, the page should consist of at least one HTML list item and the appointments list should be rendered using a unique key as a prop for each appointment item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)

    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPW369F_TEST_2:::Page should consist of HTML main heading element with text content as "Add Appointment":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {name: /Add Appointment/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_3:::Page should consist of HTML input element with label text as "Title":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_4:::Page should consist of HTML input element with label text as "Date" and type attribute value as "date":::5:::', () => {
    render(<App />)

    const dateField = screen.getByLabelText(/Date/i, {exact: false})
    expect(dateField).toBeInTheDocument()
    expect(dateField.getAttribute('type')).toBe('date')
  })

  it(':::RJSCPW369F_TEST_5:::Page should consist of HTML button element with text content as "Add":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Add/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_6:::Page should consist of HTML image element with alt as "appointments" and src attribute value as the URL for appointments image:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /appointments/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(appointmentsImage)
  })

  it(':::RJSCPW369F_TEST_7:::Page should consist of HTML main heading element with text content as "Appointments":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Appointments/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_8:::Page should consist of HTML button element with text content as "Starred":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Starred/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_9:::Page should consist of HTML unordered list element to display the list of appointments:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPW369F_TEST_10:::When a non-empty value is provided in the HTML input element with the label text "Title", the value inside the input element should be updated:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    expect(
      screen.getByRole('textbox', {name: /Title/i, exact: false}).value,
    ).toBe('Dentist')
  })

  it(':::RJSCPW369F_TEST_11:::When a non-empty value is provided in the HTML input element with the label text "Date", the value inside the input element should be updated:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    expect(dateField.value).toBe('2021-07-19')
  })

  it(':::RJSCPW369F_TEST_12:::When non-empty values are provided in the HTML input elements for title and date, and the Add button is clicked, the values inside the HTML input elements should be updated to their initial values:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(
      screen.getByRole('textbox', {name: /Title/i, exact: false}).value,
    ).toBe('')
    expect(dateField.value).toBe('')
  })

  it(':::RJSCPW369F_TEST_13:::When non-empty values are provided in the HTML input elements for title and date, and the Add button is clicked, the page should consist of an HTML list item to display the appointment:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPW369F_TEST_14:::When non-empty values are provided in the HTML input elements for title and date, and the Add button is clicked, an HTML paragraph element with text content as the title provided should be displayed:::5:::', () => {
    render(<App />)

    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByText(/Dentist/i, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/Dentist/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPW369F_TEST_15:::When non-empty values are provided in the HTML input elements for title and date, and the Add button is clicked, an HTML paragraph element with text content as the formatted date should be displayed:::5:::', () => {
    render(<App />)

    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByText(/19 July 2021, Monday/i)).toBeInTheDocument()
    expect(
      screen.getByText(/19 July 2021, Monday/i, {exact: false}).tagName,
    ).toBe('P')
  })

  it(':::RJSCPW369F_TEST_16:::When a new appointment is added, the appointment should consist of an HTML button element with data-testid as "star":::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByTestId('star')).toBeInTheDocument()
    expect(screen.getByTestId('star').tagName).toBe('BUTTON')
  })

  it(':::RJSCPW369F_TEST_17:::When a new appointment is added, the appointment should consist of an HTML image element with alt as "star" and src value as URL for the star image:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(
      screen.getByRole('img', {name: /star/i, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /star/i, exact: false}).src).toBe(
      star,
    )
  })

  it(':::RJSCPW369F_TEST_18:::When a new appointment is added and the HTML button with data-testid as "star" is clicked, the appointment should consist of an HTML image with alt as "star" and src value as URL for the filled star image:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(screen.getByTestId('star'))
    expect(screen.getByRole('img', {name: /star/i, exact: false}).src).toBe(
      starFilled,
    )
  })

  it(':::RJSCPW369F_TEST_19:::When the HTML button with text content as "Starred" is active, only the list of starred appointments should be displayed:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(screen.getAllByTestId('star')[0])
    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Session',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(
      screen.getByRole('button', {name: /starred/i, exact: false}),
    )
    expect(
      screen.queryByText(/Session/i, {exact: false}),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Dentist', {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCPW369F_TEST_20:::When the HTML button with text content as "Starred" is inactive, all the list of appointments should be displayed:::5:::', () => {
    render(<App />)
    const dateField = screen.getByLabelText(/DATE/i, {
      exact: false,
    })

    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Dentist',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(screen.getAllByTestId('star')[0])
    userEvent.type(
      screen.getByRole('textbox', {name: /Title/i, exact: false}),
      'Session',
    )
    fireEvent.change(dateField, {target: {value: '2021-07-19'}})
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByText(/Dentist/i, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/Session/i, {exact: false})).toBeInTheDocument()
  })
})
