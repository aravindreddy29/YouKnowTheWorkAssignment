import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

import App from '../App'

const packagesList = {
  packages: [
    {
      id: 1,
      name: 'Best of Paris in 7 days tour',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/travel-guide/paris-img.png',
      description:
        'Paris, France capital, is a major European city and a global centre for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    },
    {
      id: 2,
      name: 'Best of Ireland in 7 days tour',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/travel-guide/ireland-img.png',
      description:
        'The Republic of Ireland occupies most of the island of Ireland, off the coast of England and Wales. Its capital, Dublin, is the birthplace of writers like Oscar Wilde, and home of Guinness beer.',
    },
    {
      id: 3,
      name: 'Best of Rome in 7 days tour',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/travel-guide/rome-img.png',
      description:
        'Rome is the capital city and a special comune of Italy, as well as the capital of the Lazio region. The city has been a major human settlement for almost three millennia. With 2,860,009 residents in 1,285 km.',
    },
  ],
  total: 3,
}

const apiUrlPackages = 'https://apis.ccbp.in/tg/packages'

const server = setupServer(
  rest.get(apiUrlPackages, (req, res, ctx) => res(ctx.json(packagesList))),
)

const originalFetch = window.fetch

describe(':::RJSCET6A77_TEST_SUITE_1:::Travel Guide Test Cases', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    window.fetch = originalFetch
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCET6A77_TEST_1:::Page should consist of at least two HTML list items and the packages list received in the response should be rendered using a unique key as a prop for each package item:::5:::', async () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].name),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCET6A77_TEST_2:::Page should consist of an HTML main heading element with the text content as "Travel Guide":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Travel Guide/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCET6A77_TEST_3:::When the page is loaded initially an HTTP GET request should be made to the given apiUrlPackages to get the list of packages:::5:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(packagesList),
    }))
    window.fetch = mockFetchFunction
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].name),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(apiUrlPackages)
  })

  it(':::RJSCET6A77_TEST_4:::Page should initially consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCET6A77_TEST_5:::When the HTTP GET request is successful, then the page should consist of HTML unordered list element to display the list of packages:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].name),
    ).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCET6A77_TEST_6:::When the HTTP GET request is successful, then the page should consist of at least three HTML list items to display the list of packages:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].name),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCET6A77_TEST_7:::When the HTTP GET request is successful, then the page should consist of HTML image elements with alt as the value of the key "name" and src as the value of the key "image_url" in each package from the packages received from the response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('img', {
        name: packagesList.packages[0].name,
        exact: false,
      }),
    ).toBeInTheDocument()
    for (let index = 1; index < 3; index += 1) {
      const imageEl = screen.getByRole('img', {
        name: packagesList.packages[index].name,
        exact: false,
      })
      expect(imageEl).toBeInTheDocument()
      expect(imageEl.src).toBe(packagesList.packages[index].image_url)
    }
  })

  it(':::RJSCET6A77_TEST_8:::When the HTTP GET request is successful, then the page should consist of HTML main heading elements with text content as the value of the key "name" in each package from the packages received from the response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: packagesList.packages[0].name,
        exact: false,
      }),
    ).toBeInTheDocument()
    for (let index = 1; index < 3; index += 1) {
      const HeadingEl = screen.getByRole('heading', {
        name: packagesList.packages[index].name,
        exact: false,
      })
      expect(HeadingEl).toBeInTheDocument()
    }
  })

  it(':::RJSCET6A77_TEST_9:::When the HTTP GET request is successful, then the page should consist of HTML paragraph elements with text content as the value of the key "description" in each package from the packages received from the response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(packagesList.packages[0].description),
    ).toBeInTheDocument()
    for (let index = 1; index < 3; index += 1) {
      const paragraphEl = screen.getByText(
        packagesList.packages[index].description,
      )
      expect(paragraphEl).toBeInTheDocument()
    }
  })
})
