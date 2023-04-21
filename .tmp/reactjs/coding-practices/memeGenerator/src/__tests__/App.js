import 'jest-styled-components'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const fontSizesOptionsList = [
  {
    optionId: '8',
    displayText: '8',
  },
  {
    optionId: '12',
    displayText: '12',
  },
  {
    optionId: '16',
    displayText: '16',
  },
  {
    optionId: '20',
    displayText: '20',
  },
  {
    optionId: '24',
    displayText: '24',
  },
  {
    optionId: '28',
    displayText: '28',
  },
  {
    optionId: '32',
    displayText: '32',
  },
]

const backgroundImage =
  'https://assets.ccbp.in/frontend/react-js/nature-img.png'

describe(':::RJSCPSMPT7_TEST_SUITE_1:::Meme Generator Tests', () => {
  it(':::RJSCPSMPT7_TEST_1:::Page should consist of at least two HTML options elements and the fontSizesOptionsList should be rendered using a unique key as a prop for each font size option respectively:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('option').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPSMPT7_TEST_2:::Page should consist of HTML main heading element with text content as "Meme Generator":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Meme Generator/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPSMPT7_TEST_3:::Page should consist of an HTML input element with label text as "Image URL":::5:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Image URL/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPSMPT7_TEST_4:::Page should consist of an HTML input element with label text as "Top Text":::5:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Top Text/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPSMPT7_TEST_5:::Page should consist of an HTML input element with label text as "Bottom Text":::5:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Bottom Text/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPSMPT7_TEST_6:::Page should consist of an HTML select element with label text as "Font Size":::5:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Font Size/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPSMPT7_TEST_7:::Page should consist of HTML form element to display all the input and select elements:::5:::', () => {
    const {container} = render(<App />)
    const formElement = container.querySelectorAll('form')
    expect(formElement.length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPSMPT7_TEST_8:::Page should initially consist of HTML select element with value equal to "8":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').value).toMatch(/8/i)
  })

  it(':::RJSCPSMPT7_TEST_9:::Page should consist of HTML button element with text content as "Generate":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Generate/, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPSMPT7_TEST_10:::Page should consist of HTML option elements with values equal to the value of the key "optionId" in the fontSizesOptionsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[0].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[0].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[1].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[1].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[2].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[2].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[3].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[3].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[4].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[4].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[5].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[5].optionId)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[6].displayText,
        exact: false,
      }).value,
    ).toBe(fontSizesOptionsList[6].optionId)
  })

  it(':::RJSCPSMPT7_TEST_11:::Page should consist of HTML option elements with text content as the value of the key "displayText" in the fontSizesOptionsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[0].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[1].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[2].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[3].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[4].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[5].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: fontSizesOptionsList[6].displayText,
        exact: false,
      }),
    )
  })

  it(':::RJSCPSMPT7_TEST_12:::When a non-empty value is provided for the HTML input element with label text "Image URL", the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Image URL/i), 'background-image-url')
    expect(screen.getByLabelText(/Image URL/i).value).toBe(
      'background-image-url',
    )
  })
  it(':::RJSCPSMPT7_TEST_13:::When a non-empty value is provided for the HTML input element with label text "Top Text", the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Top Text/i), 'top text')
    expect(screen.getByLabelText(/Top Text/i).value).toBe('top text')
  })
  it(':::RJSCPSMPT7_TEST_14:::When a non-empty value is provided for the HTML input element with label text "Bottom Text", the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Bottom Text/i), 'bottom text')
    expect(screen.getByLabelText(/Bottom Text/i).value).toBe('bottom text')
  })

  it(':::RJSCPSMPT7_TEST_15:::When a option is selected in the HTML select element, the selected option should be updated as the value of the select element:::5:::', () => {
    render(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    expect(screen.getByRole('combobox').value).toBe(
      fontSizesOptionsList[2].optionId,
    )
  })
  it(':::RJSCPSMPT7_TEST_16:::Page should consist of a styled component as container element with data-testid as "meme":::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Image Url/i), backgroundImage)
    expect(screen.getByLabelText(/Image Url/i).value).toBe(backgroundImage)
    userEvent.type(
      screen.getByLabelText(/Top Text/i),
      'Top text on the meme page',
    )
    userEvent.type(
      screen.getByLabelText(/Bottom Text/i),
      'Bottom text on the meme page',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )

    expect(screen.getByTestId('meme')).toBeInTheDocument()
  })
  it(':::RJSCPSMPT7_TEST_17:::When a valid image url is provided for the HTML input element with label text "Image URL" and "Generate" button is clicked, then the provided image Url should be applied as a background-image for the styled component with data-testid as "meme":::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Image Url/i), backgroundImage)
    expect(screen.getByLabelText(/Image Url/i).value).toBe(backgroundImage)
    userEvent.type(
      screen.getByLabelText(/Top Text/i),
      'Top text on the meme page',
    )
    userEvent.type(
      screen.getByLabelText(/Bottom Text/i),
      'Bottom text on the meme page',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByTestId('meme')).toHaveStyle(
      `background-image: url(${backgroundImage})`,
    )
  })

  it(':::RJSCPSMPT7_TEST_18:::When a non-empty value is provided for the HTML input element with label text as "Top Text" and "Generate" button is clicked, then a paragraph styledComponent with text content as provided value should be displayed:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Image Url/i), backgroundImage)
    userEvent.type(
      screen.getByLabelText(/Bottom Text/i),
      'Bottom text on the meme page',
    )
    userEvent.type(
      screen.getByLabelText(/Top Text/i),
      'Top text on the meme page',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByText(/Top text on the meme page/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Top text on the meme page/i, {exact: false}).tagName,
    ).toBe('P')
  })
  it(':::RJSCPSMPT7_TEST_19:::When a non-empty value is provided for the HTML input element with label text as "Bottom Text" and "Generate" button is clicked, then a paragraph styledComponent with text content as provided value should be displayed:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Image Url/i), backgroundImage)
    userEvent.type(
      screen.getByLabelText(/Top Text/i),
      'Top text on the meme page',
    )
    userEvent.type(
      screen.getByLabelText(/Bottom Text/i),
      'Bottom text on the meme page',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(
      screen.getByText(/Bottom text on the meme page/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Bottom text on the meme page/i, {exact: false}).tagName,
    ).toBe('P')
  })
  it(':::RJSCPSMPT7_TEST_20:::When non-empty values are provided for the HTML input and select elements and "Generate" button is clicked then provided font size value in the select element should be applied to both top and bottom text in the generated meme:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByLabelText(/Top Text/i),
      'Top text on the meme page',
    )
    userEvent.type(
      screen.getByLabelText(/Bottom Text/i),
      'Bottom text on the meme page',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      fontSizesOptionsList[2].displayText,
    )
    expect(screen.getByRole('combobox').value).toBe(
      fontSizesOptionsList[2].optionId,
    )

    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByText(/Bottom text on the meme page/i)).toHaveStyle(
      `font-size:${fontSizesOptionsList[2].optionId}px`,
    )
  })
})
