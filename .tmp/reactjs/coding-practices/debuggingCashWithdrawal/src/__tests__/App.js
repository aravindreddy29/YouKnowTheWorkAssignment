import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const denominationsList = [
  {
    id: 1,
    value: 50,
  },
  {
    id: 2,
    value: 100,
  },
  {
    id: 3,
    value: 200,
  },
  {
    id: 4,
    value: 500,
  },
]

const originalConsoleError = console.error

describe(':::RJSCPZ1R1E_TEST_SUITE_1:::Debugging Cash Withdrawal tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPZ1R1E_TEST_1:::Page should consist of at least two HTML list items and the denominationsList should be rendered using a unique key as a prop for each denomination item:::5:::', () => {
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

  it(':::RJSCPZ1R1E_TEST_2:::Page should consist of HTML paragraph element with text content as "Your Balance":::5:::', () => {
    render(<App />)

    const paragraphEl = screen.getByText(/Your Balance/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPZ1R1E_TEST_3:::Page should initially consist of HTML paragraph element with text content as "2000":::5:::', () => {
    render(<App />)

    const paragraphEl = screen.getByText(/2000/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPZ1R1E_TEST_4:::Page should consist of HTML paragraph element with text content as "Withdraw":::5:::', () => {
    render(<App />)

    const paragraphEl = screen.getByText(/Withdraw/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPZ1R1E_TEST_5:::Page should consist of HTML paragraph element with text content as "CHOOSE SUM (IN RUPEES)":::5:::', () => {
    render(<App />)

    const paragraphEl = screen.getByText(/CHOOSE SUM \(IN RUPEES\)/i, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
  it(':::RJSCPZ1R1E_TEST_6:::Page should consist of HTML unordered list element to display the list of denominations:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPZ1R1E_TEST_7:::Page should consist of at least four HTML list items to display the given list of denominations in denominationsList:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4)
  })

  it(':::RJSCPZ1R1E_TEST_8:::Page should consist of HTML button elements with text content as values of the key "value" from denominationsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {
        name: denominationsList[0].value,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: denominationsList[1].value,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: denominationsList[2].value,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: denominationsList[3].value,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZ1R1E_TEST_9:::When a denomination button is clicked, then the respective amount should be deducted from the balance available:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {
        name: denominationsList[1].value,
        exact: false,
      }),
    )
    expect(screen.getByText(/1900/i, {exact: false})).toBeInTheDocument()
  })
})
