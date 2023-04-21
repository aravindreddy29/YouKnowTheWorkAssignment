import 'jest-styled-components'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const rulesImage =
  'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png'

describe(':::RJSCPYF1D1_TEST_SUITE_1:::Rock Paper Scissors tests', () => {
  let rockMockRandom
  let paperMockRandom
  let scissorMockRandom

  it(':::RJSCPYF1D1_TEST_1:::Page should consist of HTML main heading element with text content as "Rock Paper Scissors":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Rock Paper Scissors/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYF1D1_TEST_2:::Page should consist of HTML paragraph element with text content as "Score":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/Score/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCPYF1D1_TEST_3:::Page should initially consist of an HTML paragraph element with "0" as text content:::5:::', () => {
    render(<App />)
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    expect(screen.getByText(/0/i).tagName).toBe('P')
  })

  it(':::RJSCPYF1D1_TEST_4:::Page should initially consist of HTML button elements with data-testid attribute values as "rockButton", "paperButton" and "scissorsButton":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('rockButton')).toBeInTheDocument()
    expect(screen.getByTestId('rockButton').tagName).toBe('BUTTON')
    expect(screen.getByTestId('paperButton')).toBeInTheDocument()
    expect(screen.getByTestId('paperButton').tagName).toBe('BUTTON')
    expect(screen.getByTestId('scissorsButton')).toBeInTheDocument()
    expect(screen.getByTestId('scissorsButton').tagName).toBe('BUTTON')
  })

  it(':::RJSCPYF1D1_TEST_5:::Page should initially consist of HTML image elements with alt attribute value as the values of the key "id" and src attribute value as the values of the key "imageUrl" in choicesList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('img', {name: choicesList[0].id, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: choicesList[0].id, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
    expect(
      screen.getByRole('img', {name: choicesList[1].id, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: choicesList[1].id, exact: false}).src,
    ).toBe(choicesList[1].imageUrl)
    expect(
      screen.getByRole('img', {name: choicesList[2].id, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: choicesList[2].id, exact: false}).src,
    ).toBe(choicesList[2].imageUrl)
  })

  it(':::RJSCPYF1D1_TEST_6:::Page should initially consist of HTML button element with text content as "Rules":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Rules/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYF1D1_TEST_7:::When the HTML button element with text content as "Rules" is clicked, it should trigger a popup using react-popup:::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Rules/i, exact: false}))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPYF1D1_TEST_8:::When the HTML button with text content "Rules" is clicked, then the page should consist of HTML image element with alt attribute value as "rules" and src attribute value as URL for rules image:::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByRole('button', {name: /Rules/i, exact: false}))
    expect(
      screen.getByRole('img', {name: /rules/i, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rules/i, exact: false}).src).toBe(
      rulesImage,
    )
  })

  it(':::RJSCPYF1D1_TEST_9:::When the HTML button with data-testid "rockButton" is clicked, then the page should consist of an HTML main heading element with text content as "Rock Paper Scissors":::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(
      screen.getByRole('heading', {
        name: /Rock Paper Scissors/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYF1D1_TEST_10:::When the HTML button with data-testid "rockButton" is clicked, then the page should consist of an HTML paragraph element with text content as "Score":::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(
      screen.getByText(/Score/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCPYF1D1_TEST_11:::When the HTML button with data-testid "rockButton" is clicked, then the page should consist of an HTML button element with text content as "PLAY AGAIN":::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(
      screen.getByRole('button', {
        name: /PLAY AGAIN/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYF1D1_TEST_12:::Page should initially consist of an HTML paragraph element with "0" as text content with "font-family" value as "Roboto":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    expect(screen.getByText(/0/i).tagName).toBe('P')
    expect(screen.getByText(/0/i)).toHaveStyleRule(
      'font-family',
      expect.stringContaining('Roboto'),
    )
  })

  it(':::RJSCPYF1D1_TEST_13:::In the "GameResultView", the page should consist of HTML image element with alt attribute value as "your choice" and src attribute value as URL for your choice image:::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(
      screen.getByRole('img', {name: /your choice/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /your choice/i, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
  })

  it(':::RJSCPYF1D1_TEST_14:::In the "GameResultView", the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for opponent choice image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_15:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is rock, then the page should consist of an HTML paragraph element with text content as "IT IS DRAW":::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/IT IS DRAW/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_16:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is rock, then the page should consist of an HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for rock image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_17:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is rock, then the score value will be the same:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    expect(screen.getByText(/0/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_18:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is a scissors, then the page should consist of an HTML paragraph element with text content as "YOU WON":::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU WON/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_19:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is a scissors, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for scissors image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[1].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_20:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is a scissors, then the score value will be incremented by one:::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/1/i)).toBeInTheDocument()
    expect(screen.getByText(/1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_21:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is paper, then the page should consist of an HTML paragraph element with text content as "YOU LOSE":::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU LOSE/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_22:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is paper, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for paper image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[2].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_23:::When the HTML button with data-testid "rockButton" is clicked, and if the opponent choice is paper, then the score will be decremented by one:::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/-1/i)).toBeInTheDocument()
    expect(screen.getByText(/-1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_24:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is rock, then the page should consist of an HTML paragraph element with text content as "YOU WON":::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU WON/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_25:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is rock, then the page should consist of an HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for rock image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_26:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is rock, then the score will be incremented by one:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/1/i)).toBeInTheDocument()
    expect(screen.getByText(/1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_27:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is a scissors, then the page should consist of HTML paragraph element with text content as "YOU LOSE":::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU LOSE/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_28:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is a scissors, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for scissors image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[1].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_29:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is a scissors, then the score will be decremented by one:::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/-1/i)).toBeInTheDocument()
    expect(screen.getByText(/-1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_30:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is paper, then the page should consist of an HTML paragraph element with text content as "IT IS DRAW":::5:::', () => {
    paperMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(paperMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/IT IS DRAW/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_31:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is paper, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for paper image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[2].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_32:::When the HTML button with data-testid "paperButton" is clicked, and if the opponent choice is paper, then the score will be the same:::5:::', () => {
    paperMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(paperMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    expect(screen.getByText(/0/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_33:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is rock, then the page should consist of HTML paragraph element with text content as "YOU LOSE":::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU LOSE/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_34:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is rock, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for rock image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[0].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_35:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is rock, then the score will be decremented by one:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/-1/i)).toBeInTheDocument()
    expect(screen.getByText(/-1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_36:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is a scissors, then the page should consist of HTML paragraph element with text content as "IT IS DRAW":::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/IT IS DRAW/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_37:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is a scissors, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for scissors image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[1].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_38:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is a scissors, then the score will be the same :::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    expect(screen.getByText(/0/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_39:::When the HTML button with testid "scissorsButton" is clicked, and if the opponent choice is paper, then the page should consist of HTML paragraph element with text content as "YOU WON":::5:::', () => {
    paperMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(paperMockRandom).toHaveBeenCalled()
    expect(
      screen.getByText(/YOU WON/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_40:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is paper, then the page should consist of HTML image element with alt attribute value as "opponent choice" and src attribute value as URL for paper image:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('paperButton'))
    expect(rockMockRandom).toHaveBeenCalled()
    expect(
      screen.getByRole('img', {name: /opponent choice/i, exact: false}).src,
    ).toBe(choicesList[2].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_41:::When the HTML button with data-testid "scissorsButton" is clicked, and if the opponent choice is paper, then the score will be incremented by one:::5:::', () => {
    paperMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
    render(<App />)
    userEvent.click(screen.getByTestId('scissorsButton'))
    expect(paperMockRandom).toHaveBeenCalled()
    expect(screen.getByText(/1/i)).toBeInTheDocument()
    expect(screen.getByText(/1/i).tagName).toBe('P')
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPYF1D1_TEST_42:::When the HTML button element with text content as "PLAY AGAIN" is clicked then it should get back to playing state:::5:::', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    userEvent.click(screen.getByRole('button', {name: /PLAY AGAIN/i}))
    expect(screen.getByTestId('rockButton')).toBeInTheDocument()
    expect(screen.getByTestId('rockButton').tagName).toBe('BUTTON')
    expect(screen.getByTestId('paperButton')).toBeInTheDocument()
    expect(screen.getByTestId('paperButton').tagName).toBe('BUTTON')
    expect(screen.getByTestId('scissorsButton')).toBeInTheDocument()
    expect(screen.getByTestId('scissorsButton').tagName).toBe('BUTTON')
  })

  it(':::RJSCPYF1D1_TEST_43:::When the HTML button element with text content as "PLAY AGAIN" is clicked then the updated score should be displayed:::5:::', () => {
    scissorMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.4)
    render(<App />)
    userEvent.click(screen.getByTestId('rockButton'))
    expect(scissorMockRandom).toHaveBeenCalled()
    userEvent.click(screen.getByRole('button', {name: /PLAY AGAIN/i}))
    expect(screen.getByText(/1/i)).toBeInTheDocument()
    expect(screen.getByText(/1/i).tagName).toBe('P')
  })
})
