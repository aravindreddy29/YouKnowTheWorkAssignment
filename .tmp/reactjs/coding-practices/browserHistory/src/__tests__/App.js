import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const appLogo =
  'https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png'
const searchImage = 'https://assets.ccbp.in/frontend/react-js/search-img.png'
const deleteImage = 'https://assets.ccbp.in/frontend/react-js/delete-img.png'
const initialHistoryList = [
  {
    id: 0,
    timeAccessed: '07:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/instagram-img.png',
    title: 'Instagram',
    domainUrl: 'instagram.com',
  },
  {
    id: 1,
    timeAccessed: '05:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/twitter-img.png',
    title: 'Twitter. It’s what’s happening / Twitter',
    domainUrl: 'twitter.com',
  },
  {
    id: 2,
    timeAccessed: '04:35 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/facebook-img.png',
    title: 'Facebook – log in or sign up',
    domainUrl: 'facebook.com',
  },
  {
    id: 3,
    timeAccessed: '04:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/linkedin-img.png',
    title: 'LinkedIn: Log In or Sign Up',
    domainUrl: 'linkedin.com',
  },
  {
    id: 4,
    timeAccessed: '04:00 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/hashnode-img.png',
    title: 'Hashnode: Everything you need to start blogging as a developer!',
    domainUrl: 'hashnode.com',
  },
  {
    id: 5,
    timeAccessed: '03:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/github-img.png',
    title: 'GitHub: Where the world builds software · GitHub',
    domainUrl: 'github.com',
  },

  {
    id: 6,
    timeAccessed: '02:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/react-img.png',
    title: 'React – A JavaScript library for building user interfaces',
    domainUrl: 'reactjs.org',
  },
  {
    id: 7,
    timeAccessed: '01:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/stackoverflow-img.png',
    title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
    domainUrl: 'stackoverflow.com',
  },
  {
    id: 8,
    timeAccessed: '09:25 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/gmail-img.png',
    title: 'Gmail',
    domainUrl: 'mail.google.com',
  },
  {
    id: 9,
    timeAccessed: '09:00 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/google-img.png',
    title: 'Google',
    domainUrl: 'google.com',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPK3BCW_TEST_SUITE_1:::Browser History tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPK3BCW_TEST_1:::Page should consist of at least two HTML list items rendered using a unique key as a prop to display historyItem from the initialHistoryList:::5:::', () => {
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

  it(':::RJSCPK3BCW_TEST_2:::Page should consist of an HTML image element with alt attribute value as "app logo" and src as the given logo URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /app logo/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(appLogo)
  })

  it(':::RJSCPK3BCW_TEST_3:::Page should consist of an HTML image element with alt attribute value as "search" and src as the given search image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /search/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(searchImage)
  })

  it(':::RJSCPK3BCW_TEST_4:::Page should consist of an HTML input element with type attribute value as "search":::5:::', () => {
    render(<App />)
    const searchEl = screen.getByRole('searchbox')
    expect(searchEl.type).toBe('search')
  })

  it(':::RJSCPK3BCW_TEST_5:::Page should consist of an HTML unordered list element to display the list of historyItems:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')
  })

  it(':::RJSCPK3BCW_TEST_6:::Page should consist of at least ten HTML list elements to display the list of historyItems:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(10)
  })

  it(':::RJSCPK3BCW_TEST_7:::Page should consist of an HTML paragraph elements with text content as the values of the key "timeAccessed" in each historyItem of given initialHistoryList:::5:::', () => {
    render(<App />)
    for (let index = 0; index < 10; index += 1) {
      const paragraphEl1 = screen.getByText(
        new RegExp(`^${initialHistoryList[index].timeAccessed}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl1).toBeInTheDocument()
      expect(paragraphEl1.tagName).toBe('P')
    }
  })

  it(':::RJSCPK3BCW_TEST_8:::Page should consist of an HTML image elements with alt attribute value as "domain logo" and src as the value of key "logoUrl" in each historyItem of given initialHistoryList:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /domain logo/i,
      exact: false,
    })
    for (let index = 0; index < 10; index += 1) {
      expect(imgEls[index]).toBeInTheDocument()
      expect(imgEls[index].src).toBe(initialHistoryList[index].logoUrl)
    }
  })

  it(':::RJSCPK3BCW_TEST_9:::Page should consist of an HTML paragraph elements with text content as the values of the key "title" in each historyItem of given initialHistoryList:::5:::', () => {
    render(<App />)
    for (let index = 0; index < 10; index += 1) {
      const paragraphEl = screen.getByText(
        new RegExp(`^${initialHistoryList[index].title}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCPK3BCW_TEST_10:::Page should consist of an HTML paragraph elements with text content as the values of the key "domainUrl" in each historyItem of given initialHistoryList:::5:::', () => {
    render(<App />)
    for (let index = 0; index < 10; index += 1) {
      const paragraphEl = screen.getByText(
        new RegExp(`^${initialHistoryList[index].domainUrl}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCPK3BCW_TEST_11:::Page should consist of at least ten HTML button elements with data-testid as "delete":::5:::', () => {
    render(<App />)
    const btnEls = screen.getAllByTestId('delete')
    expect(btnEls.length).toBeGreaterThanOrEqual(10)
    expect(btnEls[0].tagName).toBe('BUTTON')
  })

  it(':::RJSCPK3BCW_TEST_12:::Page should consist of at least ten HTML image elements with alt attribute value as "delete" and src as the given delete image URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {name: /delete/i})
    expect(imageEls.length).toBeGreaterThanOrEqual(10)
    expect(imageEls[0].src).toBe(deleteImage)
  })

  it(':::RJSCPK3BCW_TEST_13:::When a non-empty value is provided in the search input element, then the text provided should be displayed in the search input element:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'LinkedIn')
    expect(screen.getByRole('searchbox')).toHaveValue('LinkedIn')
  })

  it(':::RJSCPK3BCW_TEST_14:::When a non-empty value is provided in the search input element, the historyItems should be filtered irrespective of the case:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'LinkedIn')
    expect(screen.getByText(initialHistoryList[3].title)).toBeInTheDocument()
  })

  it(':::RJSCPK3BCW_TEST_15:::When a non-empty value is provided in the search input element, and no history item includes the value given in the search input, then the page should consist of an HTML paragraph element with text content as "There is no history to show" :::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'notion')
    const paragraphEl = screen.getByText(/There is no history to show/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPK3BCW_TEST_16:::When an HTML button element with data-testid as "delete" of a history item is clicked, then the respective history item should be deleted:::5:::', () => {
    render(<App />)
    const btnEls = screen.getAllByTestId('delete')
    userEvent.click(btnEls[0])
    expect(
      screen.queryByText(initialHistoryList[0].title, {exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPK3BCW_TEST_17:::When all historyItems are deleted, then the page should consist of an HTML paragraph element with text content as "There is no history to show":::5:::', () => {
    render(<App />)
    const btnEls = screen.getAllByTestId('delete')
    for (let index = 0; index < 10; index += 1) {
      userEvent.click(btnEls[index])
    }
    const paragraphEl = screen.getByText(/There is no history to show/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
