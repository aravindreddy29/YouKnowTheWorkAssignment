import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'jest-styled-components'

import App from '../App'

const textEditorImage =
  'https://assets.ccbp.in/frontend/react-js/text-editor-img.png'

describe(':::RJSCE98XPC_TEST_SUITE_1:::Text Editor tests', () => {
  it(':::RJSCE98XPC_TEST_1:::Page should consist of an HTML main heading element with the text content as "Text Editor":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Text Editor/i, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCE98XPC_TEST_2:::Page should consist of an HTML image element with alt attribute value as "text editor" and src as the given image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /text editor/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(textEditorImage)
  })

  it(':::RJSCE98XPC_TEST_3:::Page should consist of an HTML unordered list element to display the list of buttons:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCE98XPC_TEST_4:::Page should consist of at least three HTML list items to display the buttons:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCE98XPC_TEST_5:::Page should consist of at least three HTML button elements each inside an HTML list item:::5:::', () => {
    const {container} = render(<App />)
    const buttonElements = container.querySelectorAll('li > button')
    expect(buttonElements.length).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCE98XPC_TEST_6:::Page should consist of an HTML button element with data-testid attribute value as "bold":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('bold')).toBeInTheDocument()
  })

  it(':::RJSCE98XPC_TEST_7:::Page should consist of an HTML button element with data-testid attribute value as "italic":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('italic')).toBeInTheDocument()
  })

  it(':::RJSCE98XPC_TEST_8:::Page should consist of an HTML button element with data-testid attribute value as "underline":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('underline')).toBeInTheDocument()
  })

  it(':::RJSCE98XPC_TEST_9:::Page should consist of an HTML textarea element:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })

  it(':::RJSCE98XPC_TEST_10:::The HTML button element with data-testid attribute value as "bold" should have the color as "#f1f5f9":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('bold')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_11:::When the HTML button element with data-testid attribute value as "bold" is clicked, then the "#faff00" color is applied to the respective button :::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('bold')
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('bold')).toHaveStyle(`color: ${'#faff00'}`)
  })

  it(':::RJSCE98XPC_TEST_12:::When the HTML button element with data-testid attribute value as "bold" is clicked, then the "bold" font-weight is applied to the text in the HTML textarea element :::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('bold')
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-weight: ${'bold'}`)
  })

  it(':::RJSCE98XPC_TEST_13:::The HTML button element with data-testid attribute value as "italic" should have the color as "#f1f5f9":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('italic')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_14:::When the HTML button element with data-testid attribute value as "italic" is clicked, then the "#faff00" color is applied to the respective button :::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('italic')
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('italic')).toHaveStyle(`color: ${'#faff00'}`)
  })

  it(':::RJSCE98XPC_TEST_15:::When the HTML button element with data-testid attribute value as "italic" is clicked, then the "italic" font-style is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('italic')
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-style: ${'italic'}`)
  })

  it(':::RJSCE98XPC_TEST_16:::The HTML button element with data-testid attribute value as "underline" should have the color as "#f1f5f9":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('underline')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_17:::When the HTML button element with data-testid attribute value as "underline" is clicked, then the "#faff00" color is applied to the respective button :::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('underline')
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('underline')).toHaveStyle(`color: ${'#faff00'}`)
  })

  it(':::RJSCE98XPC_TEST_18:::When the HTML button element with data-testid attribute value as "underline" is clicked, then the "underline" text-decoration is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('underline')
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(
      `text-decoration: ${'underline'}`,
    )
  })

  it(':::RJSCE98XPC_TEST_19:::When the active "bold icon" button is clicked, then the "#f1f5f9" color is applied to the respective button:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('bold')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('bold')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_20:::When the active "bold icon" button is clicked, then the "normal" font-weight is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('bold')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-weight: ${'normal'}`)
  })

  it(':::RJSCE98XPC_TEST_21:::When the active "italic icon" button is clicked, then the "#f1f5f9" color is applied to the respective button:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('italic')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('italic')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_22:::When the active "italic icon" button is clicked, then the "normal" font-style is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('italic')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-style: ${'normal'}`)
  })

  it(':::RJSCE98XPC_TEST_23:::When the active "underline icon" button is clicked, then the "#f1f5f9" color is applied to the respective button:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('underline')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByTestId('underline')).toHaveStyle(`color: ${'#f1f5f9'}`)
  })

  it(':::RJSCE98XPC_TEST_24:::When the active "underline icon" button is clicked, then the "normal" text-decoration is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ButtonEl = screen.getByTestId('underline')
    userEvent.click(ButtonEl)
    userEvent.click(ButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(
      `text-decoration: ${'normal'}`,
    )
  })

  it(':::RJSCE98XPC_TEST_25:::When the HTML button elements with data-testid attributes values as "bold" and "italic" are clicked, then the "#faff00" color is applied to both buttons and "bold" font-weight, "italic" font-style is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const BoldButtonEl = screen.getByTestId('bold')
    const ItalicButtonEl = screen.getByTestId('italic')
    userEvent.click(BoldButtonEl)
    userEvent.click(ItalicButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-weight: ${'bold'}`)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-style: ${'italic'}`)
  })

  it(':::RJSCE98XPC_TEST_26:::When the HTML button elements with data-testid attributes values as "italic" and "underline" are clicked, then the "#faff00" color is applied to both buttons and "italic" font-style, "underline" text-decoration is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const ItalicButtonEl = screen.getByTestId('italic')
    const underlineButtonEl = screen.getByTestId('underline')
    userEvent.click(ItalicButtonEl)
    userEvent.click(underlineButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-style: ${'italic'}`)
    expect(screen.getByRole('textbox')).toHaveStyle(
      `text-decoration: ${'underline'}`,
    )
  })

  it(':::RJSCE98XPC_TEST_27:::When the HTML button elements with data-testid attributes values as "bold" and "underline" are clicked, then the "#faff00" color is applied to both buttons and "bold" font-weight, "underline" text-decoration is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const BoldButtonEl = screen.getByTestId('bold')
    const underlineButtonEl = screen.getByTestId('underline')
    userEvent.click(BoldButtonEl)
    userEvent.click(underlineButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-weight: ${'bold'}`)
    expect(screen.getByRole('textbox')).toHaveStyle(
      `text-decoration: ${'underline'}`,
    )
  })

  it(':::RJSCE98XPC_TEST_28:::When the HTML button elements with data-testid attributes values as "bold", "italic" and "underline" are clicked, then the "#faff00" color is applied to all the buttons and "bold" font-weight, "italic" font-style and "underline" text-decoration is applied to the text in the HTML textarea element:::10:::', () => {
    render(<App />)
    const BoldButtonEl = screen.getByTestId('bold')
    const ItalicButtonEl = screen.getByTestId('italic')
    const underlineButtonEl = screen.getByTestId('underline')
    userEvent.click(BoldButtonEl)
    userEvent.click(ItalicButtonEl)
    userEvent.click(underlineButtonEl)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-weight: ${'bold'}`)
    expect(screen.getByRole('textbox')).toHaveStyle(`font-style: ${'italic'}`)
    expect(screen.getByRole('textbox')).toHaveStyle(
      `text-decoration: ${'underline'}`,
    )
  })
})
