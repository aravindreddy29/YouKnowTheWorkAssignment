import {BrowserRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteLogoImage =
  'https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png'
const failureViewImage =
  'https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'
const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
const courseDetailsApiUrl = 'https://apis.ccbp.in/te/courses/:id'
const homeRoutePath = '/'
const coursesResponse = {
  courses: [
    {
      id: '736d1108-d98b-482f-bfd6-234498c3571f',
      name: 'HTML',
      logo_url:
        'https://assets.ccbp.in/frontend/react-js/tech-era/html-logo-img.png',
    },
    {
      id: 'c51b4671-adc2-4487-9f8b-ddbac7bc5641',
      name: 'CSS',
      logo_url:
        'https://assets.ccbp.in/frontend/react-js/tech-era/css-logo-img.png',
    },
    {
      id: '021354ec-68a2-4664-9e65-4e0c7d4a49bf',
      name: 'JavaScript',
      logo_url:
        'https://assets.ccbp.in/frontend/react-js/tech-era/javascript-logo-img.png',
    },
    {
      id: '6738e64c-7237-4eb8-a833-c4720a257b86',
      name: 'Flexbox',
      logo_url:
        'https://assets.ccbp.in/frontend/react-js/tech-era/flexbox-logo-img.png',
    },
    {
      id: '4f4556e1-41e3-4ba4-b25b-b908ac152377',
      name: 'React JS',
      logo_url:
        'https://assets.ccbp.in/frontend/react-js/tech-era/react-logo-img.png',
    },
  ],
  total: 5,
}
const courseDetailsResponse = {
  course_details: {
    id: '736d1108-d98b-482f-bfd6-234498c3571f',
    name: 'HTML',
    image_url: 'https://assets.ccbp.in/frontend/react-js/tech-era/html-img.png',
    description:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const handlers = [
  rest.get(coursesApiUrl, (req, res, ctx) => res(ctx.json(coursesResponse))),
  rest.get(courseDetailsApiUrl, (req, res, ctx) =>
    res(ctx.json(courseDetailsResponse)),
  ),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCEMN6X9_TEST_SUITE_1:::Home Route Tests', () => {
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

  it(':::RJSCEMN6X9_TEST_1:::Page should consist of at least two HTML list items and the courses list received in the API response should be rendered using a unique key as a prop for each course item:::10:::', async () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCEMN6X9_TEST_2:::When the "/" is provided in the URL, then the page should be navigated to Home Route:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {exact: false}),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCEMN6X9_TEST_3:::Home Route should consist of an HTML image element with alt as "website logo" and src as the given website logo image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
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

  it(':::RJSCEMN6X9_TEST_4:::Home Route should consist of an HTML image element with alt as "website logo" and src as the given website logo image URL is wrapped with Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /website logo/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_5:::When the Home Route is opened, it should initially consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCEMN6X9_TEST_6:::When the Home Route is opened, an HTTP GET request should be made to the given coursesApiUrl to get the list of courses:::10:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(coursesResponse),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(coursesResponse.courses[0].name),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(coursesApiUrl)
  })

  it(':::RJSCEMN6X9_TEST_7:::When the HTTP GET request made in Home Route is successful, then the page should consist of an HTML main heading element with text content as "Courses":::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByRole('heading', {name: /Courses/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_8:::When the HTTP GET request made in Home Route is successful, then the page should consist of at least an HTML unordered list element to display the list of courses:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const listEls = screen.getAllByRole('list')
    expect(listEls[0].tagName).toBe('UL')
  })

  it(':::RJSCEMN6X9_TEST_9:::When the HTTP GET request made in Home Route is successful, then the page should consist of the HTML list items to display the course item from the courses API response:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const listItemEls = screen.getAllByRole('listitem')
    expect(listItemEls.length).toBeGreaterThanOrEqual(
      coursesResponse.courses.length,
    )
  })

  it(':::RJSCEMN6X9_TEST_10:::When the HTTP GET request made in Home Route is successful, then the page should consist of the course items wrapped with Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(
      coursesResponse.courses.length,
    )
  })

  it(':::RJSCEMN6X9_TEST_11:::When the HTTP GET request made in Home Route is successful, then the page should consist of HTML image elements with alt and src values as the values of the keys "name" and "logo_url" in courses received in the courses API response respectively:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    await screen.findByRole('img', {
      name: coursesResponse.courses[0].name,
      exact: false,
    })

    for (let i = 1; i < coursesResponse.courses.length; i += 1) {
      const imageEl = screen.getByRole('img', {
        name: coursesResponse.courses[i].name,
        exact: false,
      })
      expect(imageEl).toBeInTheDocument()
      expect(imageEl.src).toBe(coursesResponse.courses[i].logo_url)
    }
  })

  it(':::RJSCEMN6X9_TEST_12:::When the HTTP GET request made in Home Route is successful, then the page should consist of HTML paragraph elements with text content as the value of the "name" in courses received in the courses API response:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    for (let i = 1; i < coursesResponse.courses.length; i += 1) {
      const paragraphEl = screen.getByText(coursesResponse.courses[i].name, {
        exact: false,
      })
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCEMN6X9_TEST_13:::When the HTTP GET request made in Home Route is successful, and a course item is clicked in Home Route, then the page should be navigated to the CourseItemDetails Route with "/courses/:id" in the URL:::15:::', async () => {
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(coursesResponse.courses[0].name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const paragraphEl = await screen.findByText(
      coursesResponse.courses[1].name,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    userEvent.click(paragraphEl)

    expect(window.location.pathname).toMatch(
      `courses/${coursesResponse.courses[1].id}`,
    )
    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_14:::When the HTTP GET request made in Home Route is unsuccessful, then the page should consist of an HTML image element with alt as "failure view" and src as the given failure view image URL:::5:::', async () => {
    server.use(
      rest.get(coursesApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(failureViewImage)
  })

  it(':::RJSCEMN6X9_TEST_15:::When the HTTP GET request made in Home Route is unsuccessful, then the page should consist of an HTML main heading element with text content as "Oops! Something Went Wrong":::5:::', async () => {
    server.use(
      rest.get(coursesApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    renderWithBrowserRouter(<App />)
    const headingEl = await screen.findByRole('heading', {
      name: /Oops! Something Went Wrong/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_16:::When the HTTP GET request made in Home Route is unsuccessful, then the page should consist of an HTML paragraph element with text content as "We cannot seem to find the page you are looking for":::5:::', async () => {
    server.use(
      rest.get(coursesApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    renderWithBrowserRouter(<App />)
    const paragraphEl = await screen.findByText(
      /We cannot seem to find the page you are looking for/i,
      {exact: false},
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCEMN6X9_TEST_17:::When the HTTP GET request made in Home Route is unsuccessful, then the page should consist of an HTML button element with text content as "Retry":::5:::', async () => {
    server.use(
      rest.get(coursesApiUrl, (req, res, ctx) =>
        res(ctx.status(401), ctx.json({message: 'Something went wrong'})),
      ),
    )
    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Retry/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_18:::When the HTTP GET request made in Home Route is unsuccessful, and the Retry button is clicked, then an HTTP GET request should be made to coursesApiUrl:::10:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Retry/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[1][0]).toMatch(coursesApiUrl)
  })
})
