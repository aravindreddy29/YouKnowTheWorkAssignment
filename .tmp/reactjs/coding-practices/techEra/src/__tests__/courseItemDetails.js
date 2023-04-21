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
const courseDetailsApiUrl =
  'https://apis.ccbp.in/te/courses/736d1108-d98b-482f-bfd6-234498c3571f'
const homeRoutePath = '/'
const courseItemDetailsRoutePath =
  '/courses/736d1108-d98b-482f-bfd6-234498c3571f'
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

const renderWithBrowserRouter = (
  ui,
  {route = courseItemDetailsRoutePath} = {},
) => {
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

describe(':::RJSCEMN6X9_TEST_SUITE_3:::CourseItemDetails Route Tests', () => {
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

  it(':::RJSCEMN6X9_TEST_24:::When the "/courses:/id" is provided in the URL, then the page should be navigated to CourseItemDetails Route:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(courseItemDetailsRoutePath)
  })

  it(':::RJSCEMN6X9_TEST_25:::CourseItemDetails Route should consist of an HTML image element with alt as "website logo" and src as the given website logo image URL:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogoImage)
  })

  it(':::RJSCEMN6X9_TEST_26:::CourseItemDetails Route should consist of an HTML image element with alt as "website logo" and src as the given website logo image URL is wrapped with Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /website logo/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_27:::When the CourseItemDetails Route is opened, it should initially consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCEMN6X9_TEST_28:::When the CourseItemDetails Route is opened, an HTTP GET request should be made to the given courseItemDetailsApiUrl to get the course item details:::10:::', async () => {
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(courseDetailsResponse),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(courseDetailsApiUrl)
  })

  it(':::RJSCEMN6X9_TEST_29:::When the HTTP GET request made in CourseItemDetails Route is successful, then the page should consist of an HTML image element with alt and src values equal to the "name" and "logo_url" in course_details received in the course details API response:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    const imageEl = await screen.findByRole('img', {
      name: courseDetailsResponse.course_details.name,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(courseDetailsResponse.course_details.image_url)
  })

  it(':::RJSCEMN6X9_TEST_30:::When the HTTP GET request made in CourseItemDetails Route is successful, then the page should consist of an HTML main heading element with text content as the value of the key "name" in course_details received in the course details API response:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    const headingEl = await screen.findByRole('heading', {
      name: courseDetailsResponse.course_details.name,
      exact: false,
    })

    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCEMN6X9_TEST_31:::When the HTTP GET request made in CourseItemDetails Route is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "description" in course_details received in the course details API response:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    const paragraphEl = await screen.findByText(
      courseDetailsResponse.course_details.description,
      {exact: false},
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCEMN6X9_TEST_32:::When the HTTP GET request made in courseItemDetails Route is unsuccessful, then the page should consist of an HTML main heading element with text content as "Oops! Something Went Wrong":::5:::', async () => {
    server.use(
      rest.get(courseDetailsApiUrl, (req, res, ctx) =>
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

  it(':::RJSCEMN6X9_TEST_33:::When the HTTP GET request made in courseItemDetails Route is unsuccessful, then the page should consist of an HTML image element with alt as "failure view" and src as the given failure view image URL:::5:::', async () => {
    server.use(
      rest.get(courseDetailsApiUrl, (req, res, ctx) =>
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

  it(':::RJSCEMN6X9_TEST_34:::When the HTTP GET request made in courseItemDetails Route is unsuccessful, then the page should consist of an HTML paragraph element with text content as "We cannot seem to find the page you are looking for":::5:::', async () => {
    server.use(
      rest.get(courseDetailsApiUrl, (req, res, ctx) =>
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

  it(':::RJSCEMN6X9_TEST_35:::When the HTTP GET request made in courseItemDetails Route is unsuccessful, then the page should consist of an HTML button element with text content as "Retry":::5:::', async () => {
    server.use(
      rest.get(courseDetailsApiUrl, (req, res, ctx) =>
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

  it(':::RJSCEMN6X9_TEST_36:::When the website logo in the Header is clicked, then the page should be navigated to Home Route:::10:::', async () => {
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(
        courseDetailsResponse.course_details.description,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCEMN6X9_TEST_37:::When the HTTP GET request made in courseItemDetails Route is unsuccessful, and the Retry button is clicked, then an HTTP GET request should be made to courseDetailsApiUrl:::10:::', async () => {
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
    expect(mockFetchFunction.mock.calls[1][0]).toMatch(courseDetailsApiUrl)
  })
})
