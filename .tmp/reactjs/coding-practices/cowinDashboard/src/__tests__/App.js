import 'jest-styled-components'

import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const logo = 'https://assets.ccbp.in/frontend/react-js/cowin-logo.png'
const failureView =
  'https://assets.ccbp.in/frontend/react-js/api-failure-view.png'

const fixtureData = {
  last_7_days_vaccination: [
    {
      vaccine_date: '30th Jul',
      dose_1: 3757930,
      dose_2: 1817805,
    },
    {
      vaccine_date: '31st Jul',
      dose_1: 4520714,
      dose_2: 1701922,
    },
    {
      vaccine_date: '1st Aug',
      dose_1: 1074649,
      dose_2: 721604,
    },
    {
      vaccine_date: '2nd Aug',
      dose_1: 4674417,
      dose_2: 1690661,
    },
    {
      vaccine_date: '3rd Aug',
      dose_1: 5286465,
      dose_2: 1269831,
    },
    {
      vaccine_date: '4th Aug',
      dose_1: 2927764,
      dose_2: 1012949,
    },
    {
      vaccine_date: '5th Aug',
      dose_1: 4343295,
      dose_2: 1437632,
    },
  ],
  vaccination_by_age: [
    {
      age: '18-44',
      count: 482792375,
    },
    {
      age: '45-60',
      count: 206837094,
    },
    {
      age: 'Above 60',
      count: 160391841,
    },
  ],
  vaccination_by_gender: [
    {
      count: 4809680,
      gender: 'Male',
    },
    {
      count: 4555697,
      gender: 'Female',
    },
    {
      count: 12345657,
      gender: 'Others',
    },
  ],
}

const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

const server = setupServer(
  rest.get(vaccinationDataApiUrl, (req, res, ctx) =>
    res(ctx.json(fixtureData)),
  ),
)
const originalConsoleError = console.error

describe(':::RJSCP2FAS0_TEST_SUITE_1:::CoWIN Dashboard tests', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
  })
  afterAll(() => server.close())

  it(':::RJSCP2FAS0_TEST_1:::Page should consist of an HTML image element with alt as "website logo" and src value as given website logo URL:::5:::', async () => {
    render(<App />)

    const websiteLogo = await screen.findByRole('img', {
      name: /website logo/i,
      exact: false,
    })

    expect(websiteLogo).toBeInTheDocument()
    expect(websiteLogo.src).toBe(logo)
  })

  it(':::RJSCP2FAS0_TEST_2:::Page should consist of an HTML main heading element with text content as "CoWIN Vaccination in India":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /CoWIN Vaccination in India/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP2FAS0_TEST_3:::When the page is opened, an HTTP GET request should be made to vaccinationDataApiUrl:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(fixtureData),
    }))
    window.fetch = mockFetchFunction
    render(<App />)
    expect(window.fetch).toBeCalledWith(vaccinationDataApiUrl)
    expect(
      await screen.findByText(
        fixtureData.last_7_days_vaccination[0].vaccine_date,
      ),
    ).toBeInTheDocument()
    window.fetch = originalFetch
  })

  it(':::RJSCP2FAS0_TEST_4:::When the page is opened, an HTML container element with the data-testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCP2FAS0_TEST_5:::Page should consist of an HTML main heading element with text content as "Vaccination Coverage":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Vaccination Coverage/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP2FAS0_TEST_6:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the Bar chart for Vaccination Coverage should be displayed:::5:::', async () => {
    const {container} = render(<App />)
    expect(
      await screen.findByText(
        fixtureData.last_7_days_vaccination[0].vaccine_date,
      ),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(
        container.getElementsByClassName('recharts-cartesian-axis').length,
      ).toBeGreaterThanOrEqual(2)
    })
  })

  it(':::RJSCP2FAS0_TEST_7:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the Bar chart for Vaccination Coverage should be displayed along with "XAxis" component:::5:::', async () => {
    const {container} = render(<App />)
    expect(
      await screen.findByText(
        fixtureData.last_7_days_vaccination[0].vaccine_date,
      ),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(
        container.getElementsByClassName('recharts-xAxis').length,
      ).toBeGreaterThanOrEqual(1)
    })
  })

  it(':::RJSCP2FAS0_TEST_8:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the Bar chart for Vaccination Coverage should be displayed along with "YAxis" component:::5:::', async () => {
    const {container} = render(<App />)

    await waitFor(() => {
      expect(
        container.getElementsByClassName('recharts-yAxis').length,
      ).toBeGreaterThanOrEqual(1)
    })
  })

  it(':::RJSCP2FAS0_TEST_9:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the Bar chart should display the "Bars" for the response:::5:::', async () => {
    const {container} = render(<App />)
    expect(
      await screen.findByText(
        fixtureData.last_7_days_vaccination[0].vaccine_date,
      ),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(
        container.querySelectorAll('.recharts-rectangle').length,
      ).toBeGreaterThanOrEqual(14)
    })
  })
  it(':::RJSCP2FAS0_TEST_10:::Page should consist of an HTML main heading element with text content as "Vaccination by gender":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Vaccination by gender/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCP2FAS0_TEST_11:::Page should consist of an HTML main heading element with text content as "Vaccination by Age":::5:::', async () => {
    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Vaccination by age/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP2FAS0_TEST_12:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the Pie charts for Vaccination by gender and Vaccination by age should be displayed respectively:::5:::', async () => {
    const {container} = render(<App />)

    await waitFor(() => {
      expect(
        container.getElementsByClassName('recharts-pie').length,
      ).toBeGreaterThanOrEqual(2)
    })
  })

  it(':::RJSCP2FAS0_TEST_13:::When the HTTP GET request made to vaccinationDataApiUrl is successful, then the charts for the Vaccination Coverage, Vaccination by gender, and Vaccination by age should display the chart legends using "Legend" components provided by recharts :::5:::', async () => {
    const {container} = render(<App />)

    await waitFor(() => {
      expect(
        container.getElementsByClassName('recharts-legend-item-text').length,
      ).toBeGreaterThanOrEqual(8)
    })
  })

  it(':::RJSCP2FAS0_TEST_14:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML image element with alt attribute value as "failure view" and src as the given Failure view image URL :::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve({}),
      ok: false,
    }))
    window.fetch = mockFetchFunction

    render(<App />)

    expect(
      await screen.findByRole('img', {name: /failure view/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /failure view/i, exact: false}).src,
    ).toBe(failureView)

    window.fetch = originalFetch
  })
  it(':::RJSCP2FAS0_TEST_15:::When the HTTP GET request is unsuccessful, then the page should consist of an HTML main heading element with text content as "Something went wrong" :::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve({}),
      ok: false,
    }))
    window.fetch = mockFetchFunction

    render(<App />)
    expect(
      await screen.findByRole('heading', {
        name: /Something went wrong/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    window.fetch = originalFetch
  })
})
