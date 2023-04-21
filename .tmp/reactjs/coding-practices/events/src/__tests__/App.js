import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const yetToRegisterImage =
  'https://assets.ccbp.in/frontend/react-js/events-register-img.png'
const registeredImage =
  'https://assets.ccbp.in/frontend/react-js/events-regestered-img.png'
const registrationsClosedImage =
  'https://assets.ccbp.in/frontend/react-js/events-registrations-closed-img.png'

const eventsList = [
  {
    id: 'f9bb2373-b80e-46b8-8219-f07217b9f3ce',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/event-canada-dance-festival-img.png',
    name: 'Canada Dance Festival',
    location: 'Canada, America',
    registrationStatus: 'YET_TO_REGISTER',
  },
  {
    id: 'c0040497-e9cb-4873-baa9-ef5b994abfff',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-kathakali-img.png',
    name: 'Puthanalkkal Kalavela',
    location: 'Karnataka, India',
    registrationStatus: 'REGISTERED',
  },
  {
    id: '0037d5e4-4005-4030-987b-ce41b691b92a',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-kuchipudi-img.png',
    name: 'Nithyopahara',
    location: 'Kerala, India',
    registrationStatus: 'REGISTRATIONS_CLOSED',
  },
  {
    id: 'c9ff08cb-610c-4382-9939-78e5e50a72b2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-bharatanatyam-img.png',
    name: 'Shivam',
    location: 'Andhra Pradesh, India',
    registrationStatus: 'YET_TO_REGISTER',
  },
  {
    id: 'd1153723-5b6e-4628-9a1a-ccd8f84f1273',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/events-kolatam-img.png',
    name: 'Janapada Kolatam',
    location: 'Tamil Nadu, India',
    registrationStatus: 'REGISTERED',
  },
  {
    id: '7d6ec013-d0ae-4d84-b776-14b733a9174f',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/event-colonial-fest-img.png',
    name: 'Colonial Fest',
    location: 'Washington, America',
    registrationStatus: 'REGISTRATIONS_CLOSED',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPVRPWT_TEST_SUITE_1:::Events tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPVRPWT_TEST_1:::Page should consist of at least two HTML list items and the eventsList should be rendered using a unique key as a prop for each event item:::5:::', () => {
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

  it(':::RJSCPVRPWT_TEST_2:::Page should consist of HTML main heading element with text content as "Events":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Events/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPVRPWT_TEST_3:::Page should consist of HTML unordered list element to display the list of events:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPVRPWT_TEST_4:::Page should consist of at least six HTML list items to display the list of events:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
  })

  it(':::RJSCPVRPWT_TEST_5:::Page should consist of at least six HTML button elements to wrap the image of each inside an HTML list item:::5:::', () => {
    const {container} = render(<App />)
    const buttonElements = container.querySelectorAll('li > button>img')
    expect(buttonElements.length).toBeGreaterThanOrEqual(6)
  })

  it(':::RJSCPVRPWT_TEST_6:::Page should consist of HTML image elements with alt as "event" and src attribute value of the key "imageUrl" from each object in eventsList provided:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    expect(imageEls.length).toBeGreaterThanOrEqual(6)
    for (let index = 0; index < 6; index += 1) {
      expect(imageEls[index]).toBeInTheDocument()
      expect(imageEls[index].src).toBe(eventsList[index].imageUrl)
    }
  })

  it(':::RJSCPVRPWT_TEST_7:::Page should consist of HTML paragraph elements with text content as the value of the key "name" from each object in eventsList provided:::5:::', () => {
    render(<App />)
    for (let index = 0; index < 6; index += 1) {
      const paragraphEl = screen.getByText(eventsList[index].name, {
        exact: false,
      })
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCPVRPWT_TEST_8:::Page should consist of HTML paragraph elements with text content as the value of the key "location" from each object in eventsList provided:::5:::', () => {
    render(<App />)
    for (let index = 0; index < 6; index += 1) {
      const paragraphEl = screen.getByText(eventsList[index].location, {
        exact: false,
      })
      expect(paragraphEl).toBeInTheDocument()
      expect(paragraphEl.tagName).toBe('P')
    }
  })

  it(':::RJSCPVRPWT_TEST_9:::Page should initially consist of HTML paragraph element with text content as "Click on an event, to view its registration details":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(
      /Click on an event, to view its registration details/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPVRPWT_TEST_10:::When the image of an event item with "registrationStatus" as "YET_TO_REGISTER" is clicked, then the page should consist of an HTML image element with alt as "yet to register" and src attribute value as the given yet to register image URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    const registerImageEl = screen.getByRole('img', {
      name: /yet to register/i,
      exact: false,
    })
    expect(registerImageEl).toBeInTheDocument()
    expect(registerImageEl.src).toBe(yetToRegisterImage)
  })

  it(':::RJSCPVRPWT_TEST_11:::When the image of an event item with "registrationStatus" as "YET_TO_REGISTER" is clicked, then the page should consist of an HTML paragraph element starting with "A live performance brings so much to your relationship with dance":::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    const paragraphEl = screen.getByText(
      /^A live performance brings so much to your relationship with dance/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPVRPWT_TEST_12:::When the image of an event item with "registrationStatus" as "YET_TO_REGISTER" is clicked, then the page should consist of an HTML button element with text content as "Register Here":::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    expect(
      screen.getByRole('button', {name: /Register Here/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPVRPWT_TEST_13:::When the image of an event item with "registrationStatus" as "REGISTER" is clicked, then the page should consist of an HTML image element with alt as "registered" and src attribute value as the given registered image URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[1])
    const registeredImageEl = screen.getByRole('img', {
      name: /^registered$/i,
      exact: false,
    })
    expect(registeredImageEl).toBeInTheDocument()
    expect(registeredImageEl.src).toBe(registeredImage)
  })

  it(':::RJSCPVRPWT_TEST_14:::When the image of an event item with "registrationStatus" as "REGISTER" is clicked, then the page should consist of an HTML main heading element with text content as "You have already registered for the event":::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[1])
    expect(
      screen.getByRole('heading', {
        name: /You have already registered for the event/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPVRPWT_TEST_15:::When the image of an event item with "registrationStatus" as "REGISTRATIONS_CLOSED" is clicked, then the page should consist of an HTML image element with alt as "registrations closed" and src attribute value as the given registrations closed image URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[2])
    const registrationsClosedImageEl = screen.getByRole('img', {
      name: /^registrations closed$/i,
      exact: false,
    })
    expect(registrationsClosedImageEl).toBeInTheDocument()
    expect(registrationsClosedImageEl.src).toBe(registrationsClosedImage)
  })

  it(':::RJSCPVRPWT_TEST_16:::When the image of an event item with "registrationStatus" as "REGISTRATIONS_CLOSED" is clicked, then the page should consist of an HTML main heading element with text content as "Registrations Are Closed Now!":::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[2])
    expect(
      screen.getByRole('heading', {
        name: /Registrations Are Closed Now!/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPVRPWT_TEST_17:::When the image of an event item with "registrationStatus" as "REGISTRATIONS_CLOSED" is clicked then the page should consist of an HTML paragraph element starting with "Stay tuned. We will reopen":::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /^event$/i,
      exact: false,
    })
    userEvent.click(imageEls[2])
    const paragraphEl = screen.getByText(/^Stay tuned. We will reopen/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
