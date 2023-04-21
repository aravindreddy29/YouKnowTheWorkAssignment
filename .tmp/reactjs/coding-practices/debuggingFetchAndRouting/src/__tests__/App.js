import {BrowserRouter} from 'react-router-dom'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const headerLogo = 'https://assets.ccbp.in/frontend/react-js/wave-logo-img.png'

const blogsListData = [
  {
    id: 1,
    title: 'React v16.9.0 and the Roadmap Update',
    image_url: 'https://miro.medium.com/max/1050/1*i3hzpSEiEEMTuWIYviYweQ.png',
    avatar_url:
      'https://miro.medium.com/max/4096/1*wiOSfPd2sY0gXSNK9vv6bg.jpeg',
    author: 'Dan Abramov,',
    topic: 'React.js',
  },
  {
    id: 2,
    title: 'React v16.7: No, This Is Not the One With Hooks',
    image_url: 'https://miro.medium.com/max/3158/1*kEPCQNY4dwVyaFuLEwJcNQ.png',
    avatar_url: 'https://avatars.githubusercontent.com/u/3624098?v=4',
    author: 'Andrew Clark',
    topic: 'React.js',
  },
]

const blogItemDetails = {
  id: 2,
  title: 'React v16.7: No, This Is Not the One With Hooks',
  image_url: 'https://miro.medium.com/max/3158/1*kEPCQNY4dwVyaFuLEwJcNQ.png',
  avatar_url: 'https://avatars.githubusercontent.com/u/3624098?v=4',
  author: 'Andrew Clark',
  content:
    'React follows semantic versioning. Typically, this means that we use patch versions for bugfixes, and minors for new (non-breaking) features. However, we reserve the option to release minor versions even if they do not include new features. The motivation is to reserve patches for changes that have a very low chance of breaking. Patches are the most important type of release because they sometimes contain critical bugfixes.',
  topic: 'React.js',
}

const apiUrl = 'https://apis.ccbp.in/blogs'

const server = setupServer(
  rest.get('https://apis.ccbp.in/blogs/2', (req, res, ctx) =>
    res(ctx.json(blogItemDetails)),
  ),
  rest.get('https://apis.ccbp.in/blogs', (req, res, ctx) =>
    res(ctx.json(blogsListData)),
  ),
)

const aboutRoutePath = '/about'
const homeRoutePath = '/'
const contactRoutePath = '/contact'
const blogItemDetailsPath = '/blogs/2'
const notFoundRoutePath = '/consdsadsad'

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPAYVCK_TEST_SUITE_1:::Debugging Fetch And Routing tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPAYVCK_TEST_1:::Page should consist of an HTML image element in the header with the given logo URL as src and alt text as "wave":::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {name: /wave/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(headerLogo)
  })

  it(':::RJSCPAYVCK_TEST_2:::Page should consist of Link from react-router-dom in the header with "Home" as text content:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {name: /Home/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_3:::Page should consist of Link from react-router-dom in the header with "About" as text content:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_4:::Page should consist of Link from react-router-dom in the header with "Contact" as text content:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_5:::When the Home Route is opened, it should initially consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    renderWithBrowserRouter()
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCPAYVCK_TEST_6:::When the "/about" is provided in the browser tab, then the page should be navigated to About Route and consist of an HTML heading element with "About" as text content:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})

    expect(
      screen.getByRole('heading', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_7:::When the "/contact" is provided in the browser tab, then the page should be navigated to Contact Route and consist of an HTML heading element with "Contact" as text content:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: contactRoutePath})

    expect(
      screen.getByRole('heading', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_8:::When the "/bad-path" is provided in the browser tab, then the page should be navigated to Not Found Route and consist of an HTML heading element with "Not Found" as text content:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    expect(
      screen.getByRole('heading', {name: /Not Found/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_9:::When the About link in the header is clicked, then the page should be navigated to About Route with "/about" in URL path:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('link', {name: /About/i, exact: false}))
    expect(window.location.pathname).toBe(aboutRoutePath)
  })

  it(':::RJSCPAYVCK_TEST_10:::When the Contact link in the header is clicked, then the page should be navigated to Contact Route with "/contact" in URL path:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('link', {name: /Contact/i, exact: false}))
    expect(window.location.pathname).toBe(contactRoutePath)
  })

  it(':::RJSCPAYVCK_TEST_11:::When the Home link in the header is clicked, then the page should be navigated to Home Route with "/" in URL path:::5:::', async () => {
    renderWithBrowserRouter(<App />, {
      route: contactRoutePath,
    })

    userEvent.click(screen.getByRole('link', {name: /Home/i, exact: false}))
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCPAYVCK_TEST_12:::Page should consist of an HTML heading element with "Wade Warren" as text content when rendering Home Route initially:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(homeRoutePath)
    expect(
      screen.getByRole('heading', {name: /Wade Warren/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_13:::Page should consist of an HTML image element with alt text as "profile":::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByAltText(/profile/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_14:::Page should consist of an HTML paragraph element with "Software developer at UK" as text content when rendering HomeRoute initially:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/Software Developer at UK/i, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPAYVCK_TEST_15:::Home Route should consist of HTML heading elements with text content as the value of the "title" key received in the API response:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {name: blogsListData[0].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: blogsListData[1].title, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_16:::Home Route should consist of HTML paragraph elements with text content as the value of the "author" key received in response for each blog item:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const firstParagraphEl = screen.getByText(blogsListData[0].author, {
      exact: false,
    })
    const secondParagraphEl = screen.getByText(blogsListData[1].author, {
      exact: false,
    })

    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')
  })

  it(':::RJSCPAYVCK_TEST_17:::When the Home Route is opened, an HTTP GET request should be made to the given blogsApiUrl to get the list of blogs:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(blogsListData),
    }))

    window.fetch = mockFetchFunction

    renderWithBrowserRouter()

    expect(window.fetch).toBeCalledWith(apiUrl)
    window.fetch = originalFetch

    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_18:::Each blog item should be wrapped with Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: new RegExp(blogsListData[0].title),
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: new RegExp(blogsListData[1].title),
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_19:::When a blog item is clicked in Home Route, then the page should be navigated to the Blog Item Details Route with "/blogs/:id" in the URL:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(blogsListData[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getAllByRole('link')[4])
    expect(
      await screen.findByRole('heading', {
        name: blogItemDetails.title,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(blogItemDetailsPath)
  })

  it(':::RJSCPAYVCK_TEST_20:::When "/blogs/:id" is provided in the URL, then the page should be navigated to the Blog Item Details Route and consist of an HTML heading element with text content as the value of the "title" key received in the API response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: blogItemDetailsPath})

    expect(
      await screen.findByRole('heading', {
        name: blogItemDetails.title,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPAYVCK_TEST_21:::When navigated to a blog post, then the page should consist of an HTML image element with alt as the value of the "title" key and src as the value of the "image_url" key received in the API response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: blogItemDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: blogItemDetails.title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      name: blogItemDetails.title,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(blogsListData[1].image_url)
  })

  it(':::RJSCPAYVCK_TEST_22:::When navigated to a blog post, then the page should consist of an HTML image element with alt as the value of the "author" key and src as the value of the "avatar_url" key received in the API response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: blogItemDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: blogItemDetails.title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      name: blogItemDetails.author,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(blogsListData[1].avatar_url)
  })

  it(':::RJSCPAYVCK_TEST_23:::When navigated to a blog post, then the page should consist of an HTML paragraph element with text content as the value of the "content" key received in the API response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: blogItemDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: blogItemDetails.title,
        exact: false,
      }),
    ).toBeInTheDocument()

    const paragraphEl = screen.getByText(blogItemDetails.content, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
