import {setupServer} from 'msw/node'
import {rest} from 'msw'
import * as fs from 'fs'
import path from 'path'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GithubPopularRepositoriesApp from '../App'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const repositoriesData = [
  {
    name: 'EbookFoundation test',
    id: 13491895,
    issues_count: 26,
    forks_count: 41498,
    stars_count: 182166,
    avatar_url: 'https://avatars.githubusercontent.com/u/14127308?v=4',
  },
  {
    name: 'vuejs test',
    id: 11730342,
    issues_count: 542,
    forks_count: 28636,
    stars_count: 181555,
    avatar_url: 'https://avatars.githubusercontent.com/u/6128107?v=4',
  },
  {
    name: 'facebook test',
    id: 10270250,
    issues_count: 686,
    forks_count: 33466,
    stars_count: 166536,
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
]

const apiUrl = 'https://apis.ccbp.in/popular-repos'
const starsCountImage =
  'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const forksCountImage =
  'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const issuesCountImage =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const server = setupServer(
  rest.get(apiUrl, (req, res, ctx) =>
    res(ctx.json({popular_repos: repositoriesData})),
  ),
)

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/GithubPopularRepos/index.js'),
  'utf8',
)

const originalConsoleError = console.error

describe(':::RJSCPYR39R_TEST_SUITE_1:::Github popular repos App Component Test Cases', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
  })
  afterAll(() => server.close())

  it(':::RJSCPYR39R_TEST_1:::Page should consist of at least two HTML list items and the languageFiltersData and the repositories list received from the response should be rendered using a unique key as a prop for each language filter item and repository item respectively:::5:::', async () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<GithubPopularRepositoriesApp />)

    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPYR39R_TEST_2:::JSX code implementation in the component GithubPopularRepos should consist of import statement for Loader component from the package react-loader-spinner:::5:::', () => {
    expect(
      jsxCode.match(/import Loader from 'react-loader-spinner'/).length,
    ).toBe(1)
  })

  it(':::RJSCPYR39R_TEST_3:::Page should consist of an HTML heading element with "Popular" as text content:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {name: /Popular/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYR39R_TEST_4:::Page should consist of HTML button elements with text content as the value of key "language" from the language filter items:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(screen.getByRole('button', {name: languageFiltersData[0].language}))
    expect(screen.getByRole('button', {name: languageFiltersData[1].language}))
    expect(screen.getByRole('button', {name: languageFiltersData[2].language}))
    expect(screen.getByRole('button', {name: languageFiltersData[3].language}))
    expect(screen.getByRole('button', {name: languageFiltersData[4].language}))
  })

  it(':::RJSCPYR39R_TEST_5:::When the page is opened, an HTTP GET request should be made to githubReposApiUrl:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({popular_repos: repositoriesData}),
    }))
    window.fetch = mockFetchFunction

    render(<GithubPopularRepositoriesApp />)

    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(expect.stringContaining(`${apiUrl}`))
    window.fetch = originalFetch
  })

  it(':::RJSCPYR39R_TEST_6:::When the page is opened initially, an HTTP GET request should be made with "ALL" as the value to query parameter "language":::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({popular_repos: repositoriesData}),
    }))
    window.fetch = mockFetchFunction

    render(<GithubPopularRepositoriesApp />)

    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(`${apiUrl}?language=ALL`)
    window.fetch = originalFetch
  })

  it(':::RJSCPYR39R_TEST_7:::When a language filter button is clicked, an HTTP GET request should be made with the id of the languageFilter as value to query parameter "language":::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({popular_repos: repositoriesData}),
    }))
    window.fetch = mockFetchFunction

    render(<GithubPopularRepositoriesApp />)

    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(`${apiUrl}?language=`),
    )

    userEvent.click(
      screen.getByRole('button', {name: languageFiltersData[1].language}),
    )
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(
        `${apiUrl}?language=${languageFiltersData[1].id}`,
      ),
    )

    userEvent.click(
      screen.getByRole('button', {name: languageFiltersData[2].language}),
    )
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(
        `${apiUrl}?language=${languageFiltersData[2].id}`,
      ),
    )

    userEvent.click(
      screen.getByRole('button', {name: languageFiltersData[3].language}),
    )
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(
        `${apiUrl}?language=${languageFiltersData[3].id}`,
      ),
    )

    userEvent.click(
      screen.getByRole('button', {name: languageFiltersData[4].language}),
    )
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(
        `${apiUrl}?language=${languageFiltersData[4].id}`,
      ),
    )

    userEvent.click(
      screen.getByRole('button', {name: languageFiltersData[0].language}),
    )

    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    expect(window.fetch).toBeCalledWith(
      expect.stringContaining(
        `${apiUrl}?language=${languageFiltersData[0].id}`,
      ),
    )
    window.fetch = originalFetch
  })

  it(':::RJSCPYR39R_TEST_8:::When the page is opened, an HTML container element with data-testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCPYR39R_TEST_9:::When the HTTP GET request is successful, then the page should consist of at least four HTML image elements to display avatar_url, star icon URL, forks icon URL, and issues icon URL:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    const imgElements = screen.getAllByRole('img')
    expect(imgElements.length).toBeGreaterThanOrEqual(
      repositoriesData.length * 4,
    )
  })

  it(':::RJSCPYR39R_TEST_10:::When the HTTP GET request is successful, then the page should consist of HTML image elements with alt as the value of the key "name" and src as the value of key "avatar_url" in popular_repos from the repositories received from the response:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    const firstImgEl = screen.getByRole('img', {
      name: repositoriesData[0].name,
      exact: false,
    })
    const secondImgEl = screen.getByRole('img', {
      name: repositoriesData[1].name,
      exact: false,
    })
    const thirdImgEl = screen.getByRole('img', {
      name: repositoriesData[2].name,
      exact: false,
    })

    expect(firstImgEl.src).toBe(repositoriesData[0].avatar_url)
    expect(secondImgEl.src).toBe(repositoriesData[1].avatar_url)
    expect(thirdImgEl.src).toBe(repositoriesData[2].avatar_url)
  })

  it(':::RJSCPYR39R_TEST_11:::When the HTTP GET request is successful, then the page should consist of an HTML image elements with alt as "stars" and src as given star icon URL:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    const imageEl = screen.getAllByRole('img', {
      name: /stars/i,
      exact: false,
    })

    expect(imageEl.length).toBeGreaterThanOrEqual(3)
    expect(imageEl[0].src).toBe(starsCountImage)
  })

  it(':::RJSCPYR39R_TEST_12:::When the HTTP GET request is successful, then the page should consist of an HTML image elements with alt as "forks" and src as given forks icon URL:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    const imageEl = screen.getAllByRole('img', {
      name: /forks/i,
      exact: false,
    })

    expect(imageEl.length).toBeGreaterThanOrEqual(3)
    expect(imageEl[0].src).toBe(forksCountImage)
  })

  it(':::RJSCPYR39R_TEST_13:::When the HTTP GET request is successful, then the page should consist of an HTML image elements with alt as "open issues" and src as given issues icon URL:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(await screen.findByText(/EbookFoundation test/i)).toBeInTheDocument()

    const imageEl = screen.getAllByRole('img', {
      name: /open issues/i,
      exact: false,
    })

    expect(imageEl.length).toBeGreaterThanOrEqual(3)
    expect(imageEl[0].src).toBe(issuesCountImage)
  })

  it(':::RJSCPYR39R_TEST_14:::When the HTTP GET request is successful, then the page should consist of an HTML main heading element with text content as the value of the key "name" in each item from the repositories received from the response:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)

    expect(
      await screen.findByRole('heading', {name: repositoriesData[0].name}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: repositoriesData[1].name}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: repositoriesData[2].name}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYR39R_TEST_15:::When the HTTP GET request is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "stars_count" in each item from the repositories received from the response:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(
      await screen.findByText(/182166/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/182166/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    expect(screen.getByText(/181555/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/166536/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPYR39R_TEST_16:::When the HTTP GET request is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "forks_count" in each item from the repositories received from the response:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(
      await screen.findByText(/41498/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/41498/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/28636/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/33466/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPYR39R_TEST_17:::When the HTTP GET request is successful, then the page should consist of an HTML paragraph element with text content as the value of the key "issues_count" in each item from the repositories received from the response:::5:::', async () => {
    render(<GithubPopularRepositoriesApp />)
    expect(
      await screen.findByText(/26/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/26/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/542/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/686/i, {exact: false}).tagName).toBe('P')
  })
})
