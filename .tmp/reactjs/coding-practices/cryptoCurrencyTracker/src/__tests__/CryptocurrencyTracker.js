import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

import App from '../App'

const cryptocurrenciesData = [
  {
    currency_name: 'Bitcoin',
    usd_value: '58682.16',
    euro_value: '49660.43',
    id: '30ebdd5b-c13d-45c2-90a1-c0903f3afe33',
    currency_logo: 'https://www.cryptocompare.com/media/19633/btc.png',
  },
  {
    currency_name: 'Ethereum',
    id: '3d95e40f-c6fb-4577-8203-e47091efb5ef',
    usd_value: '2124.45',
    euro_value: '1797.66',
    currency_logo: 'https://www.cryptocompare.com/media/20646/eth_logo.png',
  },
]

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'
const cryptocurrencyImage =
  'https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png'

const server = setupServer(
  rest.get(apiUrl, (req, res, ctx) => res(ctx.json(cryptocurrenciesData))),
)

const originalConsoleError = console.error

describe(':::RJSCPUAF4D_TEST_SUITE_1:::Cryptocurrency Tracker tests', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPUAF4D_TEST_1:::Page should consist of at least two HTML list items and the cryptocurrencies data should be rendered using a unique key as a prop for each cryptocurrency item:::5:::', async () => {
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
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPUAF4D_TEST_2:::When the page is loaded, an HTTP GET request should be made to the given apiUrl:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(cryptocurrenciesData),
    }))

    window.fetch = mockFetchFunction
    render(<App />)

    expect(window.fetch).toBeCalledWith(apiUrl)
    window.fetch = originalFetch

    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUAF4D_TEST_3:::When the HTTP GET request is made to the apiUrl, then the page should consist of an HTML container element with data-testid attribute value as "loader":::5:::', async () => {
    render(<App />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUAF4D_TEST_4:::When the HTTP GET request to the apiUrl is successful, then the HTML container element with data-testid attribute value as "loader" should be removed:::5:::', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCPUAF4D_TEST_5:::When the HTTP GET request to the apiUrl is successful, the page should consist of HTML main heading element with text content as "Cryptocurrency Tracker":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /Cryptocurrency Tracker/i,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUAF4D_TEST_6:::When the HTTP GET request to the apiUrl is successful, the page should consist of an HTML image element with alt as "cryptocurrency" and src value as the URL for the cryptocurrency image:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      name: /cryptocurrency/i,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(cryptocurrencyImage)
  })

  it(':::RJSCPUAF4D_TEST_7:::Each Cryptocurrency list item should consist of an HTML image element with alt value equal to the "currency_name" value and src value equal to the "currency_logo" value received in response:::5:::', async () => {
    const {
      currency_logo: currencyLogo,
      currency_name: currencyName,
    } = cryptocurrenciesData[0]
    server.use(
      rest.get(apiUrl, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([cryptocurrenciesData[0]])),
      ),
    )
    render(<App />)
    expect(
      await screen.findByText(currencyName, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const iconEl = screen.getByRole('img', {name: currencyName, exact: false})

    expect(iconEl).toBeInTheDocument()
    expect(iconEl.src).toBe(currencyLogo)
  })

  it(':::RJSCPUAF4D_TEST_8:::Each Cryptocurrency list item should consist of an HTML paragraph element with text content equal to the "currency_name" value received in response :::5:::', async () => {
    const {currency_name: currencyName} = cryptocurrenciesData[0]
    server.use(
      rest.get(apiUrl, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([cryptocurrenciesData[0]])),
      ),
    )
    render(<App />)
    expect(
      await screen.findByText(currencyName, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const currencyNameEl = screen.getByText(currencyName)
    expect(currencyNameEl).toBeInTheDocument()
    expect(currencyNameEl.tagName).toBe('P')
  })

  it(':::RJSCPUAF4D_TEST_9:::Each Cryptocurrency list item should consist of an HTML paragraph element with text content equal to the "usd_value" value received in response:::5:::', async () => {
    const {
      usd_value: usdValue,
      currency_name: currencyName,
    } = cryptocurrenciesData[0]
    server.use(
      rest.get(apiUrl, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([cryptocurrenciesData[0]])),
      ),
    )
    render(<App />)
    expect(
      await screen.findByText(currencyName, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const usdCurrencyValueEl = screen.getByText(usdValue, {exact: false})
    expect(usdCurrencyValueEl).toBeInTheDocument()
    expect(usdCurrencyValueEl.tagName).toBe('P')
  })

  it(':::RJSCPUAF4D_TEST_10:::Each Cryptocurrency list item should consist of an HTML paragraph element with text content equal to the "euro_value" value received in response:::5:::', async () => {
    const {
      euro_value: euroValue,
      currency_name: currencyName,
    } = cryptocurrenciesData[0]
    server.use(
      rest.get(apiUrl, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([cryptocurrenciesData[0]])),
      ),
    )
    render(<App />)
    expect(
      await screen.findByText(currencyName, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const euroCurrencyValueEl = screen.getByText(euroValue, {exact: false})
    expect(euroCurrencyValueEl).toBeInTheDocument()
    expect(euroCurrencyValueEl.tagName).toBe('P')
  })

  it(':::RJSCPUAF4D_TEST_11:::When the HTTP GET request to the apiUrl is successful, then the page should consist of HTML image elements with alt value equal to the "currency_name" value and src value equal to the "currency_logo" value received in response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const firstImageEl = screen.getByRole('img', {
      name: cryptocurrenciesData[0].currency_name,
      exact: false,
    })
    const secondImageEl = screen.getByRole('img', {
      name: cryptocurrenciesData[1].currency_name,
      exact: false,
    })
    expect(firstImageEl).toBeInTheDocument()
    expect(firstImageEl.src).toBe(cryptocurrenciesData[0].currency_logo)

    expect(secondImageEl).toBeInTheDocument()
    expect(secondImageEl.src).toBe(cryptocurrenciesData[1].currency_logo)
  })

  it(':::RJSCPUAF4D_TEST_12:::When the HTTP GET request to the apiUrl is successful, then the page should consist of HTML paragraph elements with text content equal to the "currency_name" value received in response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    const bitcoinNameEl = screen.getByText(
      cryptocurrenciesData[0].currency_name,
    )
    const ethereumNameEl = screen.getByText(
      cryptocurrenciesData[1].currency_name,
    )

    expect(bitcoinNameEl).toBeInTheDocument()
    expect(bitcoinNameEl.tagName).toBe('P')

    expect(ethereumNameEl).toBeInTheDocument()
    expect(ethereumNameEl.tagName).toBe('P')
  })

  it(':::RJSCPUAF4D_TEST_13:::When the HTTP GET request to the apiUrl is successful, then the page should consist of HTML paragraph elements with text content equal to the "usd_value" value received in response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    const bitcoinUSDValueEl = screen.getByText(
      cryptocurrenciesData[0].usd_value,
    )
    const ethereumUSDValueEl = screen.getByText(
      cryptocurrenciesData[1].usd_value,
    )

    expect(bitcoinUSDValueEl).toBeInTheDocument()
    expect(bitcoinUSDValueEl.tagName).toBe('P')

    expect(ethereumUSDValueEl).toBeInTheDocument()
    expect(ethereumUSDValueEl.tagName).toBe('P')
  })

  it(':::RJSCPUAF4D_TEST_14:::When the HTTP GET request to the apiUrl is successful, then the page should consist of HTML paragraph elements with text content equal to the "euro_value" value received in response:::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByText(cryptocurrenciesData[0].currency_name, {
        exact: false,
      }),
    ).toBeInTheDocument()
    const bitcoinUSDValueEl = screen.getByText(
      cryptocurrenciesData[0].euro_value,
    )
    const ethereumUSDValueEl = screen.getByText(
      cryptocurrenciesData[1].euro_value,
    )
    expect(bitcoinUSDValueEl).toBeInTheDocument()
    expect(bitcoinUSDValueEl.tagName).toBe('P')

    expect(ethereumUSDValueEl).toBeInTheDocument()
    expect(ethereumUSDValueEl.tagName).toBe('P')
  })
})
