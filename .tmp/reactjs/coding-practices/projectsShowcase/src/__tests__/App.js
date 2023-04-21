import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const projectsApiUrl = 'https://apis.ccbp.in/ps/projects'
const websiteLogoImage =
  'https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png'
const failureViewImage =
  'https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
const projectsResponse = {
  projects: [
    {
      id: 'f680c5fb-a4d0-4f43-b356-785d920208df',
      name: 'Music Page',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/projects-showcase/music-page-img.png',
    },
    {
      id: '86f8d60b-661b-4883-b35f-3755d96da219',
      name: 'Tourism Website',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/projects-showcase/tourism-website-img.png',
    },
    {
      id: '9ed10776-db55-42ea-8bb4-634eee354b71',
      name: 'Advanced Technologies',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/projects-showcase/advanced-technologies-img.png',
    },
  ],
}

const handlers = [
  rest.get(projectsApiUrl, (req, res, ctx) => res(ctx.json(projectsResponse))),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCEQHZ58_TEST_SUITE_1:::Projects Showcase Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
    window.fetch = originalFetch
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCEQHZ58_TEST_1:::Page should consist of at least two HTML list items and the categories list and the projects list received in the API response should be rendered using a unique key as a prop for each category option and project item respectively:::10:::', async () => {
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
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCEQHZ58_TEST_2:::Page should consist of an HTML image element with alt as "website logo" and src as the given website logo image URL:::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogoImage)
  })

  it(':::RJSCEQHZ58_TEST_3:::Page should initially consist of an HTML select element with a value attribute as "ALL":::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').value).toMatch(/ALL/i)
  })

  it(':::RJSCEQHZ58_TEST_4:::Page should consist of HTML option elements with value attribute as the value of the key "id" from categoriesList provided:::10:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    categoriesList.forEach(eachCategory => {
      const optionEl = screen.getByRole('option', {
        name: eachCategory.displayText,
        exact: false,
      })
      expect(optionEl.value).toBe(eachCategory.id)
    })
  })

  it(':::RJSCEQHZ58_TEST_5:::Page should consist of the HTML option elements with text content as the value of the key "displayText" from categoriesList provided:::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    categoriesList.forEach(eachCategory =>
      expect(
        screen.getByRole('option', {
          name: eachCategory.displayText,
          exact: false,
        }),
      ).toBeInTheDocument(),
    )
  })

  it(':::RJSCEQHZ58_TEST_6:::When the page is opened, then it should initially consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCEQHZ58_TEST_7:::When the page is opened, then an HTTP GET request should be made to projectsApiUrl:::5:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(projectsResponse),
    }))
    window.fetch = mockFetchFunction

    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(projectsApiUrl)
  })

  it(':::RJSCEQHZ58_TEST_8:::When the page is opened initially, then an HTTP GET request should be made to projectsApiUrl with query parameter as "category" and its value as "ALL":::10:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(projectsResponse),
    }))
    window.fetch = mockFetchFunction

    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(
      `${projectsApiUrl}?category=ALL`,
    )
  })

  it(':::RJSCEQHZ58_TEST_9:::When the HTTP GET request is successful, then the page should consist of at least an HTML unordered list element to display the list of projects:::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const listEls = screen.getAllByRole('list')
    expect(listEls[0].tagName).toBe('UL')
  })

  it(':::RJSCEQHZ58_TEST_10:::When the HTTP GET request is successful, then the page should consist of the HTML list items to display the project item received in the projects API response:::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const listItemEls = screen.getAllByRole('listitem')
    expect(listItemEls.length).toBeGreaterThanOrEqual(
      projectsResponse.projects.length,
    )
  })

  it(':::RJSCEQHZ58_TEST_11:::When the HTTP GET request is successful, then the page should consist of HTML image elements with alt and src as the values of the keys "name" and "image_url" in projects received in the projects API response respectively:::10:::', async () => {
    render(<App />)

    const imageEl = await screen.findByRole('img', {
      name: projectsResponse.projects[0].name,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()

    expect(imageEl.src).toBe(projectsResponse.projects[0].image_url)

    for (let i = 1; i < projectsResponse.projects.length; i += 1) {
      const imageEl = screen.getByRole('img', {
        name: projectsResponse.projects[i].name,
        exact: false,
      })
      expect(imageEl).toBeInTheDocument()
      expect(imageEl.src).toBe(projectsResponse.projects[i].image_url)
    }
  })

  it(':::RJSCEQHZ58_TEST_12:::When the HTTP GET request is successful, then the page should consist of HTML paragraph elements with text content as the value of the key "name" in projects received in the projects API response:::5:::', async () => {
    render(<App />)

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    for (let i = 1; i < projectsResponse.projects.length; i += 1) {
      const paragraphEl = screen.getByText(projectsResponse.projects[i].name, {
        exact: false,
      })
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCEQHZ58_TEST_13:::When a category option is selected in the HTML select element, then the selected option should be updated as the value of the HTML select element:::10:::', async () => {
    render(<App />)

    const selectEl = screen.getByRole('combobox')

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(selectEl.value).toBe(categoriesList[0].id)

    for (let i = 1; i < categoriesList.length; i += 1) {
      userEvent.selectOptions(selectEl, categoriesList[i].id)

      expect(
        await screen.findByText(projectsResponse.projects[0].name, {
          exact: false,
        }),
      ).toBeInTheDocument()
      expect(selectEl.value).toBe(categoriesList[i].id)
    }
  })

  it(':::RJSCEQHZ58_TEST_14:::When a category option is selected in the HTML select element, then an HTTP GET request should be made to projectsApiUrl with query parameter as "category" and its value as the value of the key "id" of the active category option:::15:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(projectsResponse),
    }))
    window.fetch = mockFetchFunction

    render(<App />)

    const selectEl = screen.getByRole('combobox')

    expect(
      await screen.findByText(projectsResponse.projects[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(
      `${projectsApiUrl}?category=ALL`,
    )

    for (let i = 1; i < categoriesList.length; i += 1) {
      userEvent.selectOptions(selectEl, categoriesList[i].id)

      expect(
        await screen.findByText(projectsResponse.projects[0].name, {
          exact: false,
        }),
      ).toBeInTheDocument()

      expect(mockFetchFunction.mock.calls[i][0]).toMatch(
        `${projectsApiUrl}?category=${categoriesList[i].id}`,
      )
    }
  })

  it(':::RJSCEQHZ58_TEST_15:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML image element with alt as "failure view" and src as the given failure view image URL:::5:::', async () => {
    server.use(
      rest.get(projectsApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    render(<App />)

    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(failureViewImage)
  })

  it(':::RJSCEQHZ58_TEST_16:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML main heading element with text content as "Oops! Something Went Wrong":::5:::', async () => {
    server.use(
      rest.get(projectsApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    render(<App />)

    const headingEl = await screen.findByRole('heading', {
      name: /Oops! Something Went Wrong/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCEQHZ58_TEST_17:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML paragraph element with text content as "We cannot seem to find the page you are looking for":::5:::', async () => {
    server.use(
      rest.get(projectsApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    render(<App />)

    const paragraphEl = await screen.findByText(
      /We cannot seem to find the page you are looking for/i,
      {exact: false},
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCEQHZ58_TEST_18:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML button element with text content as "Retry":::5:::', async () => {
    server.use(
      rest.get(projectsApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    render(<App />)

    const buttonEl = await screen.findByRole('button', {
      name: /Retry/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it(':::RJSCEQHZ58_TEST_19:::When the HTTP GET request is unsuccessful, and the Retry button is clicked, then an HTTP GET request should be made to projectsApiUrl:::10:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    window.fetch = mockFetchFunction

    render(<App />)

    const buttonEl = await screen.findByRole('button', {
      name: /Retry/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[1][0]).toMatch(projectsApiUrl)
  })
})
