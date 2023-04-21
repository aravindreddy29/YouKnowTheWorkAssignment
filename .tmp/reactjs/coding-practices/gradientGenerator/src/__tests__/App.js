import 'jest-styled-components'

import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const originalConsoleError = console.error

const gradientDirectionsList = [
  {directionId: 'TOP', value: 'top', displayText: 'Top'},
  {directionId: 'BOTTOM', value: 'bottom', displayText: 'Bottom'},
  {directionId: 'RIGHT', value: 'right', displayText: 'Right'},
  {directionId: 'LEFT', value: 'left', displayText: 'Left'},
]

describe(':::RJSCP13IIH_TEST_SUITE_1:::Gradient Generator Tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCP13IIH_TEST_1:::Page should consist of at least two HTML list items and the gradientDirectionsList should be rendered using a unique key as a prop for each gradientDirection item respectively:::5:::', () => {
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

  it(':::RJSCP13IIH_TEST_2:::Page should consist of an HTML main heading element with text content starting with "Generate a CSS Color Gradient":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Generate a CSS Color Gradient/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP13IIH_TEST_3:::Page should consist of HTML paragraph element with text content as "Choose Direction":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/Choose Direction/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Choose Direction/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCP13IIH_TEST_4:::Page should consist of HTML unordered list element to display the list of gradient directions:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCP13IIH_TEST_5:::Page should consist of at least four HTML list items to display the gradient directions:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4)
  })

  it(':::RJSCP13IIH_TEST_6:::Page should consist of HTML button elements with text content as values of the key "displayText" of each item in gradientDirectionsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {
        name: gradientDirectionsList[0].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: gradientDirectionsList[1].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: gradientDirectionsList[2].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: gradientDirectionsList[3].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP13IIH_TEST_7:::Page should consist of HTML paragraph element with text content as "Pick the Colors":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/Pick the Colors/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Pick the Colors/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCP13IIH_TEST_8:::Page should initially consist of HTML paragraph element with text content as "#8ae323":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/#8ae323/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/#8ae323/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCP13IIH_TEST_9:::Page should initially consist of HTML paragraph element with text content as "#014f7b":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/#014f7b/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/#014f7b/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCP13IIH_TEST_10:::Page should consist of two HTML input elements with HTML type attribute and value as "color":::5:::', () => {
    const {container} = render(<App />)
    const colorInputElements = container.querySelectorAll('input[type="color"]')
    expect(colorInputElements.length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCP13IIH_TEST_11:::Page should consist of HTML button element with text content as "Generate":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP13IIH_TEST_12:::When a value is provided in the first HTML input element with type attribute value as "color", then the value provided should be updated in the value of the input element:::5:::', () => {
    const {container} = render(<App />)
    const firstColorInput = container.querySelectorAll('input[type="color"]')[0]

    fireEvent.change(firstColorInput, {target: {value: '#000000'}})
    expect(firstColorInput.value).toBe('#000000')
  })

  it(':::RJSCP13IIH_TEST_13:::When a value is provided in the second HTML input element with type attribute value as "color", then the value provided should be updated in the value of the input element:::5:::', () => {
    const {container} = render(<App />)
    const secondColorInput = container.querySelectorAll(
      'input[type="color"]',
    )[1]

    fireEvent.change(secondColorInput, {target: {value: '#ffffff'}})
    expect(secondColorInput.value).toBe('#ffffff')
  })

  it(':::RJSCP13IIH_TEST_14:::Page should consist of HTML container element with data-testid as "gradientGenerator":::5:::', () => {
    const {container} = render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Left/i, exact: false}))
    const firstColorInput = container.querySelectorAll('input[type="color"]')[0]
    fireEvent.change(firstColorInput, {target: {value: '#000000'}})

    const secondColorInput = container.querySelectorAll(
      'input[type="color"]',
    )[1]

    fireEvent.change(secondColorInput, {target: {value: '#ffffff'}})

    expect(screen.getByTestId('gradientGenerator')).toBeInTheDocument()
  })

  it(':::RJSCP13IIH_TEST_15:::The HTML container element with data-testid as "gradientGenerator" should initially have the linear gradient direction as "top":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('gradientGenerator')).toHaveStyleRule(
      'background-image',
      expect.stringContaining('top'),
    )
  })

  it(':::RJSCP13IIH_TEST_16:::When the gradient direction button is clicked, the active gradient direction button should have CSS property opacity with the value of 1:::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Left/i, exact: false}))
    expect(
      screen.getByRole('button', {name: /Left/i, exact: false}),
    ).toHaveStyleRule('opacity', '1')
  })

  it(':::RJSCP13IIH_TEST_17:::When the gradient direction button is inactive, it should have CSS property opacity with the value of 0.5:::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('button', {name: /Left/i, exact: false}),
    ).toHaveStyleRule('opacity', '0.5')
  })

  it(':::RJSCP13IIH_TEST_18:::When the gradient direction and "Generate" button are clicked, then the active direction should be applied as the direction to the linear-gradient for the HTML container element with data-testid as "gradientGenerator":::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Left/i, exact: false}))
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByTestId('gradientGenerator')).toHaveStyleRule(
      'background-image',
      expect.stringContaining('left'),
    )
  })

  it(':::RJSCP13IIH_TEST_19:::When a value is provided in the first HTML input element with type attribute value as "color" and the "Generate" button is clicked, then the provided color should be applied as the first color to the linear-gradient for the HTML container element with data-testid as "gradientGenerator":::5:::', () => {
    const {container} = render(<App />)

    const fromColorInput = container.querySelectorAll('input[type="color"]')[0]

    fireEvent.change(fromColorInput, {target: {value: '#000000'}})

    expect(fromColorInput.value).toBe('#000000')
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByTestId('gradientGenerator')).toHaveStyleRule(
      'background-image',
      expect.stringContaining('#000000'),
    )
  })

  it(':::RJSCP13IIH_TEST_20:::When a value is provided in the second HTML input element with type attribute value as "color" and the "Generate" button is clicked, then the provided color should be applied as the second color to the linear-gradient for the HTML container element with data-testid as "gradientGenerator":::5:::', () => {
    const {container} = render(<App />)

    const secondColorInput = container.querySelectorAll(
      'input[type="color"]',
    )[1]

    fireEvent.change(secondColorInput, {target: {value: '#ffffff'}})

    expect(secondColorInput.value).toBe('#ffffff')
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByTestId('gradientGenerator')).toHaveStyleRule(
      'background-image',
      expect.stringContaining('#ffffff'),
    )
  })
})
