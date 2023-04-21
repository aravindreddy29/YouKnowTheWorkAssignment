import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const stopwatchImg =
  'https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png'

describe(':::RJSCP90ZT3_TEST_SUITE_1:::Debugging Stopwatch tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it(':::RJSCP90ZT3_TEST_1:::Page should consist of HTML heading element with text content as "Stopwatch":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {name: /Stopwatch/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_2:::Page should consist of HTML button element with text content as "Start":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('button', {name: /Start/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_3:::Page should consist of two HTML button elements with text content as "Stop" and "Reset":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('button', {name: /Stop/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: /Reset/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_4:::Page should initially consist of HTML heading element with text content as "00:00":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {name: /00:00/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_5:::Page should consist of HTML image element with alt as "stopwatch" and src attribute value as the URL for the stopwatch image:::5:::', () => {
    render(<App />)

    const imageEl = screen.getByRole('img', {name: /stopwatch/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(stopwatchImg)
  })

  it(':::RJSCP90ZT3_TEST_6:::When the Start button is clicked, then the timer should start:::5:::', () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)

    expect(
      screen.getByRole('heading', {name: /00:01/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_7:::When the Stop button is clicked, then the timer should stop:::5:::', () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)
    userEvent.click(screen.getByRole('button', {name: /Stop/i, exact: false}))

    expect(
      screen.getByRole('heading', {name: /00:01/i, exact: false}),
    ).toBeInTheDocument()

    jest.runTimersToTime(1000)

    expect(
      screen.getByRole('heading', {name: /00:01/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_8:::When the Reset button is clicked, then the timer should be reset to zero:::5:::', () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', {name: /Reset/i, exact: false}))

    expect(
      screen.getByRole('heading', {name: /00:00/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_9:::When the Start button is clicked after stopping the timer, then the timer should run from where it was stopped:::5:::', () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)
    userEvent.click(screen.getByRole('button', {name: /Stop/i, exact: false}))

    expect(
      screen.getByRole('heading', {name: /00:01/i, exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)

    expect(
      screen.getByRole('heading', {name: /00:02/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP90ZT3_TEST_10:::When the Start button is clicked, then the "setInterval" method should be called:::5:::', () => {
    const spy = jest.spyOn(window, 'setInterval')
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    expect(spy).toHaveBeenCalled()
  })

  it(':::RJSCP90ZT3_TEST_11:::When the Stop button is clicked after starting the timer, then the "clearInterval" method should be called:::5:::', () => {
    const spy = jest.spyOn(window, 'clearInterval')
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)
    userEvent.click(screen.getByRole('button', {name: /Stop/i, exact: false}))
    expect(spy).toHaveBeenCalled()
  })

  it(':::RJSCP90ZT3_TEST_12:::When the Reset button is clicked after starting the timer, then the "clearInterval" method should be called:::5:::', () => {
    const spy = jest.spyOn(window, 'clearInterval')
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Start/i, exact: false}))
    jest.runTimersToTime(1000)
    userEvent.click(screen.getByRole('button', {name: /Reset/i, exact: false}))
    expect(spy).toHaveBeenCalled()
  })
})
