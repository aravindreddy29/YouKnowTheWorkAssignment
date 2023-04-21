import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as fs from 'fs'
import path from 'path'

import App from '../App'

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/FruitsCounter/index.js'),
  'utf8',
)

describe(':::RJSCP431W5_TEST_SUITE_1:::Debugging Fruits Counter tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it(':::RJSCP431W5_TEST_1:::Page should initially consist of HTML main heading element with text content as "Bob ate 4 mangoes 5 bananas":::5:::', () => {
    expect(
      screen.getByRole('heading', {
        name: /Bob ate 4 mangoes 5 bananas/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_2:::Page should consist of HTML image element with alt attribute value as "mango":::5:::', () => {
    expect(
      screen.getByRole('img', {
        name: /mango/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_3:::Page should consist of HTML image element with alt attribute value as "banana":::5:::', () => {
    expect(
      screen.getByRole('img', {
        name: /banana/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_4:::Page should consist of HTML button element with text content as "Eat Banana":::5:::', () => {
    expect(
      screen.getByRole('button', {
        name: /Eat Banana/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_5:::Page should consist of HTML button element with text content as "Eat Mango":::5:::', () => {
    expect(
      screen.getByRole('button', {
        name: /Eat Mango/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_6:::JSX Code implementation should consist of at least fourteen HTML elements with attribute "className":::5:::', () => {
    expect(jsxCode.match(/className="/g).length).toBeGreaterThanOrEqual(14)
  })

  it(':::RJSCP431W5_TEST_7:::When the Eat Mango button is clicked, then the count of the mangoes eaten should be incremented by one:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Eat Mango/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /5 mangoes/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP431W5_TEST_8:::When the Eat Banana button is clicked, then the count of the bananas eaten should be incremented by one:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Eat Banana/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /6 bananas/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
})
