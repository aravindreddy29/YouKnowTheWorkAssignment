import 'jest-styled-components'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/MovieItem/index.js'),
  'utf8',
)

const moviesList = [
  {
    id: '61227099e13958e58d31e74c',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/the-tomorrow-war-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=QPistcpGB8o',
    categoryId: 'ACTION',
  },
  {
    id: '612271842cad3c2dfcb82481',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/the-boss-baby-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=k397HRbTtWI&t=1s',
    categoryId: 'COMEDY',
  },
  {
    id: '6122709941329807a4e17b39',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/avengers-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    categoryId: 'ACTION',
  },
  {
    id: '61227184c889cff17f05900b',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/the-intern-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=ZU3Xban0Y6A',
    categoryId: 'COMEDY',
  },
  {
    id: '612271846f711783024f2bfa',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/karwaan-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=IUCeN7kelXs',
    categoryId: 'COMEDY',
  },
  {
    id: '612271141bf93653809cdccb',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/war-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=tQ0mzXRk-oM',
    categoryId: 'ACTION',
  },
  {
    id: '61227184c7ac22c8258938c5',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/yes-man-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=dDh1l3qVNoY',
    categoryId: 'COMEDY',
  },
  {
    id: '61227184ae30e00e3ce542c8',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/isnt-it-romantic-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=YVYzxm_RqMg&t=9s',
    categoryId: 'COMEDY',
  },
  {
    id: '6122718418ae122e517c3ada',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/total-dhamaal-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=fo9EhcwQXcM',
    categoryId: 'COMEDY',
  },
  {
    id: '61227099ce46ed88e7f00c19',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/godzilla-vs-kong-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=odM92ap8_c0',
    categoryId: 'ACTION',
  },
  {
    id: '612271848b2be0f2f769d24a',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/welcome-to-newyork-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=lMAj8tyThw0',
    categoryId: 'COMEDY',
  },
  {
    id: '61227184882da0a972890152',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/pagalpanti-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=3-7jehmURuM',
    categoryId: 'COMEDY',
  },
  {
    id: '6122709931ad5e69f5125806',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/gamer-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=P2g94xQmtHw',
    categoryId: 'ACTION',
  },
  {
    id: '61227099d3c5b18801b2edb5',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/rule-of-the-law-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=xaPLUII_M6g',
    categoryId: 'ACTION',
  },
  {
    id: '61227114b7b5232771c68883',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/priest-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=IYfdQOGqL1o',
    categoryId: 'ACTION',
  },
  {
    id: '61227099ea52349bd1e16ee4',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/ghost-protocal-img.png',
    videoUrl: 'https://www.youtube.com/watch?v=EDGYVFZxsXQ',
    categoryId: 'ACTION',
  },
]
const primeVideoImageUrl =
  'https://assets.ccbp.in/frontend/react-js/prime-video-img.png'

describe(':::RJSCPDXAGS_TEST_SUITE_1:::Prime Video Tests', () => {
  it(':::RJSCPDXAGS_TEST_1:::Page should consist of an HTML image element with alt attribute value as "prime video":::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /prime video/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_2:::Page should consist of an HTML main heading element with text content as "Action Movies":::5:::', () => {
    render(<App />)
    const headingEl = screen.getByRole('heading', {
      name: /Action Movies/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_3:::Page should consist of an HTML image element with src as given prime video image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /prime video/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(primeVideoImageUrl)
  })

  it(':::RJSCPDXAGS_TEST_4:::Page should consist of at least four HTML image elements with alt attribute value as "thumbnail" and src as the value of the key "thumbnailUrl" of the movie item with categoryId as "ACTION" in the "moviesList" provided:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imgEls.length).toBeGreaterThanOrEqual(4)
    expect(imgEls[0]).toBeInTheDocument()
    expect(imgEls[0].src).toBe(moviesList[0].thumbnailUrl)
    expect(imgEls[1]).toBeInTheDocument()
    expect(imgEls[1].src).toBe(moviesList[2].thumbnailUrl)
    expect(imgEls[2]).toBeInTheDocument()
    expect(imgEls[2].src).toBe(moviesList[5].thumbnailUrl)
    expect(imgEls[3]).toBeInTheDocument()
    expect(imgEls[3].src).toBe(moviesList[9].thumbnailUrl)
  })

  it(':::RJSCPDXAGS_TEST_5:::Page should consist of an HTML main heading element with text content as "Comedy Movies":::5:::', () => {
    render(<App />)
    const headingEl = screen.getByRole('heading', {
      name: /Comedy Movies/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_6:::When the next arrow button is clicked in Action Movies Slider, the page should consist of the next HTML image element with alt attribute value as "thumbnail":::5:::', () => {
    render(<App />)
    const nextBtns = screen.getAllByRole('button', {
      name: /Next/i,
      exact: false,
    })
    userEvent.click(nextBtns[0])
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
  })

  it(':::RJSCPDXAGS_TEST_7:::Page should consist of at least four HTML image elements with alt attribute value as "thumbnail" and src as the value of the key "thumbnailUrl" of the movie item with categoryId as "COMEDY" in the "moviesList" provided:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imgEls.length).toBeGreaterThanOrEqual(4)
    expect(imgEls[4]).toBeInTheDocument()
    expect(imgEls[4].src).toBe(moviesList[1].thumbnailUrl)
    expect(imgEls[5]).toBeInTheDocument()
    expect(imgEls[5].src).toBe(moviesList[3].thumbnailUrl)
    expect(imgEls[6]).toBeInTheDocument()
    expect(imgEls[6].src).toBe(moviesList[4].thumbnailUrl)
    expect(imgEls[7]).toBeInTheDocument()
    expect(imgEls[7].src).toBe(moviesList[6].thumbnailUrl)
  })

  it(':::RJSCPDXAGS_TEST_8:::Page should consist of at least two Slider components from react-slick:::5:::', () => {
    render(<App />)
    expect(
      screen.getAllByRole('button', {
        name: /previous/i,
        exact: false,
      }).length,
    ).toBeGreaterThanOrEqual(2)
    expect(
      screen.getAllByRole('button', {
        name: /Next/i,
        exact: false,
      }).length,
    ).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPDXAGS_TEST_9:::When the next arrow button is clicked in Action Movies Slider, the page should consist of the next HTML image element with src as the value of the key "thumbnailUrl" of the movie item with categoryId as "ACTION" in the "moviesList" provided:::5:::', () => {
    render(<App />)
    const nextBtns = screen.getAllByRole('button', {
      name: /Next/i,
      exact: false,
    })
    userEvent.click(nextBtns[0])
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(
      imgEls.some(eachImg => eachImg.src === moviesList[12].thumbnailUrl),
    ).toBeTruthy()
  })

  it(':::RJSCPDXAGS_TEST_10:::When the previous arrow button is clicked in Action Movies Slider, the page should consist of the previous HTML image element with alt attribute value as "thumbnail" and src as the value of the key "thumbnailUrl" of the movie item with categoryId as "ACTION" in the "moviesList" provided:::5:::', () => {
    render(<App />)
    const previousBtns = screen.getAllByRole('button', {
      name: /previous/i,
      exact: false,
    })
    userEvent.click(previousBtns[0])
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(
      imgEls.some(eachImg => eachImg.src === moviesList[15].thumbnailUrl),
    ).toBeTruthy()
  })

  it(':::RJSCPDXAGS_TEST_11:::When the next arrow button is clicked in Comedy Movies Slider, the page should consist of the next HTML image element with alt attribute value as "thumbnail" and src as the value of the key "thumbnailUrl" of the movie item with categoryId as "ACTION" in the "moviesList" provided:::5:::', () => {
    render(<App />)

    const nextBtns = screen.getAllByRole('button', {
      name: /Next/i,
      exact: false,
    })
    userEvent.click(nextBtns[1])
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(
      imgEls.some(eachImg => eachImg.src === moviesList[7].thumbnailUrl),
    ).toBeTruthy()
  })

  it(':::RJSCPDXAGS_TEST_12:::When the previous arrow button is clicked in Comedy Movies Slider, the page should consist of the next HTML image element with alt attribute value as "thumbnail" and src as the value of the key "thumbnailUrl" of the movie item with categoryId as "ACTION" in the "moviesList" provided:::5:::', () => {
    render(<App />)

    const previousBtns = screen.getAllByRole('button', {
      name: /previous/i,
      exact: false,
    })
    userEvent.click(previousBtns[1])
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(
      imgEls.some(eachImg => eachImg.src === moviesList[11].thumbnailUrl),
    ).toBeTruthy()
  })

  it(':::RJSCPDXAGS_TEST_13:::When a thumbnail is clicked from Action Movies List, then the page should consist of Popup from reactjs-popup:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imgEls[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_14:::When a thumbnail is clicked from Action Movies List, then the page should consist of the HTML button element with data-testid attribute value as "closeButton":::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imgEls[0])
    expect(screen.getByTestId('closeButton')).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_15:::JS code implementation for MovieItem Component should use "IoMdClose" from the react-icons package:::5:::', () => {
    render(<App />)
    expect(jsxCode.match(/IoMdClose/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPDXAGS_TEST_16:::When a thumbnail is clicked from Comedy Movies List, then the page should consist of Popup from reactjs-popup:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imgEls[1])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_17:::When a thumbnail is clicked from Comedy Movies List, then the page should consist of the HTML button element with data-testid attribute value as "closeButton":::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imgEls[1])
    expect(screen.getByTestId('closeButton')).toBeInTheDocument()
  })

  it(':::RJSCPDXAGS_TEST_18:::When the close button is clicked inside the popup, then the page should not consist of Popup from reactjs-popup:::5:::', () => {
    render(<App />)
    const imgEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imgEls[0])
    const closeBtn = screen.getByTestId('closeButton')
    userEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
