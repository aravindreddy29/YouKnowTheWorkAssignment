import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const initialCountriesList = [
  {
    id: '53c9c67a-c923-4927-8a75-fdfc4bc5ec61',
    name: 'Australia',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-australia-img.png',
    isVisited: false,
  },
  {
    id: '8baa8029-fb2c-4f06-bfcc-3dc9ad12b24d',
    name: 'Canada',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-canada-img.png',
    isVisited: false,
  },
  {
    id: '1b520f98-6548-41f3-816e-c8b887865172',
    name: 'Greenland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-greenland-img.png',
    isVisited: false,
  },
  {
    id: '25841996-fbfd-4554-add4-4c94082c8ccd',
    name: 'India',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-india-img.png',
    isVisited: true,
  },
  {
    id: '603c3568-13b0-11ec-82a8-0242ac130003',
    name: 'Netherlands',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-netherland-img.png',
    isVisited: false,
  },
  {
    id: '3c988dec-55e1-477d-a9e2-b354fd559849',
    name: 'Portugal',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-portugal-img.png',
    isVisited: false,
  },
  {
    id: 'd766f754-34f7-413e-81ec-9992821b97fa',
    name: 'Switzerland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-switzerland-img.png',
    isVisited: false,
  },
  {
    id: '7ebb4e04-b124-417f-a69e-564a456d70f1',
    name: 'Thailand',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-thailand-img.png',
    isVisited: false,
  },
  {
    id: '1e4b1dcd-6ace-4dde-ad8d-675927d5ae47',
    name: 'United Kingdom',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-united-kingdom-img.png',
    isVisited: true,
  },
  {
    id: 'e76da8ca-bc48-4981-902b-a4d2d46feb6d',
    name: 'Venezuela',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-venezuela-img.png',
    isVisited: false,
  },
]

const originalConsoleError = console.error

describe(':::RJSCELYBMA_TEST_SUITE_1:::Visit Countries Tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCELYBMA_TEST_1:::Page should consist of at least two HTML list items and the initialCountriesList, visited countries list should be rendered using a unique key as a prop for each country item and visited country item respectively:::5:::', () => {
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

  it(':::RJSCELYBMA_TEST_2:::Page should consist of an HTML main heading element with text content as "Countries":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /^Countries$/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCELYBMA_TEST_3:::Page should initially consist of two HTML unordered list elements to display the list of countries and visited countries:::5:::', () => {
    render(<App />)
    const unOrderListElements = screen.getAllByRole('list')
    expect(unOrderListElements.length).toBeGreaterThanOrEqual(2)
    expect(unOrderListElements[0].tagName).toBe('UL')
    expect(unOrderListElements[1].tagName).toBe('UL')
  })

  it(':::RJSCELYBMA_TEST_4:::Page should initially consist of twelve HTML list items to display the country items and the visited country items:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(12)
  })

  it(':::RJSCELYBMA_TEST_5:::Page should initially consist of the HTML paragraph elements with text content as values of the key "name" from the initialCountriesList provided:::5:::', () => {
    render(<App />)
    for (let index = 0; index < initialCountriesList.length; index += 1) {
      const item = screen.getAllByText(initialCountriesList[index].name, {
        exact: false,
      })
      expect(item[0]).toBeInTheDocument()
      expect(item[0].tagName).toBe('P')
    }
  })

  it(':::RJSCELYBMA_TEST_6:::Page should initially consist of eight HTML button elements with text content as "Visit":::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    expect(buttonEls.length).toBeGreaterThanOrEqual(8)
  })

  it(':::RJSCELYBMA_TEST_7:::Page should initially consist of two HTML paragraph elements with text content as "Visited":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getAllByText(/^Visited$/i, {
      exact: false,
    })
    expect(paragraphEl[0]).toBeInTheDocument()
    expect(paragraphEl[0].tagName).toBe('P')
    expect(paragraphEl[1]).toBeInTheDocument()
    expect(paragraphEl[1].tagName).toBe('P')
  })

  it(':::RJSCELYBMA_TEST_8:::Page should consist of an HTML main heading element with text content as "Visited Countries":::5:::', () => {
    render(<App />)
    const headingEl = screen.getByRole('heading', {
      name: /Visited Countries/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCELYBMA_TEST_9:::Page should initially consist of two HTML image elements with alt as "thumbnail" and src as values of the key "imageUrl" of the respective visited country items from the initialCountriesList provided:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls.length).toBeGreaterThanOrEqual(2)
    expect(imageEls[0].src).toBe(initialCountriesList[3].imageUrl)
    expect(imageEls[1].src).toBe(initialCountriesList[8].imageUrl)
  })

  it(':::RJSCELYBMA_TEST_10:::Page should initially consist of two HTML paragraph elements with the text content as the value of the key "name" in both the countries list and visited countries list if the value of the key "isVisited" true from the initialCountriesList provided:::5:::', () => {
    render(<App />)
    const firstParagraphEls = screen.getAllByText(
      initialCountriesList[3].name,
      {
        exact: false,
      },
    )
    expect(firstParagraphEls.length).toBeGreaterThanOrEqual(2)
    expect(firstParagraphEls[0].tagName).toBe('P')
    expect(firstParagraphEls[1].tagName).toBe('P')

    const secondParagaraphEls = screen.getAllByText(
      initialCountriesList[8].name,
      {
        exact: false,
      },
    )
    expect(secondParagaraphEls.length).toBeGreaterThanOrEqual(2)
    expect(secondParagaraphEls[0].tagName).toBe('P')
    expect(secondParagaraphEls[1].tagName).toBe('P')
  })

  it(':::RJSCELYBMA_TEST_11:::Page should initially consist of two HTML button elements with text content as "Remove":::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Remove/i,
      exact: false,
    })
    expect(buttonEls.length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCELYBMA_TEST_12:::When the Visit button is clicked, then the Visit button of a respective country item should be replaced with an HTML paragraph element with text content as "Visited":::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    userEvent.click(buttonEls[0])
    const paragraphEl = screen.getAllByText(/^Visited$/i, {
      exact: false,
    })
    expect(paragraphEl.length).toBeGreaterThanOrEqual(3)
    expect(paragraphEl[0].tagName).toBe('P')
  })

  it(':::RJSCELYBMA_TEST_13:::When the Visit button is clicked, an new HTML list item should be added to display the visited country item in the visited countries list:::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    userEvent.click(buttonEls[0])
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(13)
  })

  it(':::RJSCELYBMA_TEST_14:::When the Visit button is clicked, then an HTML image element with alt as "thumbnail" and src as the value of the key "imageUrl" of the respective country item should be displayed in the visited countries list:::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    userEvent.click(buttonEls[0])
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls[0].src).toBe(initialCountriesList[0].imageUrl)
  })

  it(':::RJSCELYBMA_TEST_15:::When the Visit button is clicked, then an HTML paragraph element with text content as the value of the key "name" of the respective country item should be displayed in the visited countries list:::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    userEvent.click(buttonEls[0])
    const paragraphEl = screen.getAllByText(initialCountriesList[0].name, {
      exact: false,
    })
    expect(paragraphEl[1].tagName).toBe('P')
  })

  it(':::RJSCELYBMA_TEST_16:::When the Visit button is clicked, then an HTML button element with text content as "Remove" should be displayed in respective visited country item in the visited countries list:::5:::', () => {
    render(<App />)
    const buttonEls = screen.getAllByRole('button', {
      name: /Visit/i,
      exact: false,
    })
    userEvent.click(buttonEls[0])
    const removeButtonEls = screen.getAllByRole('button', {
      name: /Remove/i,
      exact: false,
    })
    expect(removeButtonEls.length).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCELYBMA_TEST_17:::When the Remove button is clicked, then the respective country item should be removed from the visited countries list:::5:::', () => {
    render(<App />)

    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    const removeButtonElsBeforeAction = screen.getAllByRole('button', {
      name: /Remove/i,
      exact: false,
    })
    userEvent.click(removeButtonElsBeforeAction[0])
    expect(imageEls[0]).not.toBeInTheDocument()
  })

  it(':::RJSCELYBMA_TEST_18:::When the Remove button is clicked, then "Visited" text of the respective country item should be replaced with an HTML button element with text content as "Visit":::5:::', () => {
    render(<App />)
    const removeButtonEls = screen.getAllByRole('button', {
      name: /Remove/i,
      exact: false,
    })
    userEvent.click(removeButtonEls[0])
    expect(
      screen.getAllByRole('button', {name: /Visit/i, exact: false}).length,
    ).toBe(9)
  })

  it(':::RJSCELYBMA_TEST_19:::When all the visited countries are removed, then an HTML paragraph element with text content as "No Countries Visited Yet" should be displayed:::5:::', () => {
    render(<App />)

    const removeButtonEls = screen.getAllByRole('button', {
      name: /Remove/i,
      exact: false,
    })
    userEvent.click(removeButtonEls[0])
    userEvent.click(removeButtonEls[1])
    const paragraphEl = screen.getByText(/No Countries Visited Yet/i, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
