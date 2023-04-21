import 'jest-styled-components'

import {render, screen} from '@testing-library/react'
import * as fs from 'fs'
import path from 'path'

import App from '../App'

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../components/CourseTimelineCard/index.js'),
  'utf8',
)

const jsxCode1 = fs.readFileSync(
  path.resolve(__dirname, '../components/ProjectTimelineCard/index.js'),
  'utf8',
)

const timelineItemsList = [
  {
    id: 'c6aad2fb-7673-45cf-9606-a335acc0cf4b',
    categoryId: 'COURSE',
    title: '10 DECEMBER 2020',
    courseTitle: 'Static Website',
    description:
      'Build your own personal portfolio website and a website to host conferences and events.  Publish your website and share it with your friends, family and beyond.',
    duration: '10 days',
    tagsList: [
      {
        id: 'c31b2ad8-f766-11eb-9a03-0242ac130003',
        name: 'HTML Elements',
      },
      {
        id: 'c31b2d08-f766-11eb-9a03-0242ac130003',
        name: 'Class Attribute',
      },
      {
        id: 'c31b2dee-f766-11eb-9a03-0242ac130003',
        name: 'Text Properties',
      },
      {
        id: 'c31b2eb6-f766-11eb-9a03-0242ac130003',
        name: 'Bootstrap',
      },
      {
        id: 'c31b2f6a-f766-11eb-9a03-0242ac130003',
        name: 'Box Properties',
      },
      {
        id: 'c31b347e-f766-11eb-9a03-0242ac130003',
        name: 'Layout',
      },
      {
        id: 'c31b358c-f766-11eb-9a03-0242ac130003',
        name: 'Flexbox',
      },
    ],
  },
  {
    id: 'a19d93d6-bdac-479e-b554-974ef9e6e66c',
    categoryId: 'PROJECT',
    title: '21 DECEMBER 2020',
    projectTitle: 'Tourism Website',
    description:
      'A tourism website enables the user to browse through the images of popular destinations.',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/projects-s4-img.png',
    duration: '1 hr',
    projectUrl: 'https://tourismapp.ccbp.tech/',
  },
  {
    id: '40b82899-fdf7-4a3e-a43a-41a9917b4582',
    categoryId: 'COURSE',
    title: '5 JANUARY 2021',
    courseTitle: 'Responsive Website',
    description:
      'Build a responsive website that appears beautifully on the screen of any size. Develop a personal portfolio website, an E-commerce product listing website and a website to host conferences and events.',
    duration: '12 days',
    tagsList: [
      {
        id: '551e2b7e-f767-11eb-9a03-0242ac130003',
        name: 'Responsive Web Design',
      },
      {
        id: '551e2de0-f767-11eb-9a03-0242ac130003',
        name: 'Multiple Layouts',
      },
      {
        id: '551e3114-f767-11eb-9a03-0242ac130003',
        name: 'Column Wrapping',
      },
      {
        id: '551e31e6-f767-11eb-9a03-0242ac130003',
        name: 'Navbar',
      },
      {
        id: '551e32a4-f767-11eb-9a03-0242ac130003',
        name: 'Designing Layouts',
      },
      {
        id: '551e334e-f767-11eb-9a03-0242ac130003',
        name: 'Inheritance',
      },
      {
        id: '551e3402-f767-11eb-9a03-0242ac130003',
        name: 'CSS Gradients',
      },
    ],
  },
  {
    id: 'ae2ede68-af77-427c-817c-0ce4beeb69c7',
    categoryId: 'PROJECT',
    title: '7 JANUARY 2021',
    projectTitle: 'Food Munch',
    description: 'Food Much Website is a user-centric food tech website.',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/projects-r2-img.png',
    duration: '2 hrs',
    projectUrl: 'https://fm.ccbp.tech/',
  },
  {
    id: '4938c3d1-81cd-4729-9d2c-dcd50796aa4d',
    categoryId: 'COURSE',
    title: '30 JANUARY 2021',
    courseTitle: 'Dynamic Website',
    description:
      'Learn the fundamental concepts in JavaScript and apply them to build dynamic and interactive web applications like Counter, Guessing Game, Chat Web app, E-commerce web app, etc.',
    duration: '20 days',
    tagsList: [
      {
        id: 'd4743c06-f767-11eb-9a03-0242ac130003',
        name: 'Declaring Variables',
      },
      {
        id: 'd4743ecc-f767-11eb-9a03-0242ac130003',
        name: 'Comparison Operator',
      },
      {
        id: 'd4743fe4-f767-11eb-9a03-0242ac130003',
        name: 'Functions',
      },
      {
        id: 'd47440d4-f767-11eb-9a03-0242ac130003',
        name: 'Object',
      },
      {
        id: 'd474434a-f767-11eb-9a03-0242ac130003',
        name: 'DOM Manipulations',
      },
      {
        id: 'd474443a-f767-11eb-9a03-0242ac130003',
        name: 'Loops',
      },
      {
        id: 'd4744516-f767-11eb-9a03-0242ac130003',
        name: 'Local Storage',
      },
    ],
  },
  {
    id: 'd6c4b3a5-7b1d-4906-aca8-823f44129004',
    categoryId: 'PROJECT',
    title: '6 FEBRUARY 2021',
    projectTitle: 'Todos Application',
    description:
      'This app helps users to track the day to day tasks. Users can create, edit, track the status of each todo item and able to persist them over page reloads.',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png',
    duration: '3 hrs',
    projectUrl: 'https://todossapp.ccbp.tech/',
  },
  {
    id: '0a35abbe-22ca-40a1-81da-613f656b7702',
    categoryId: 'PROJECT',
    title: '15 FEBRUARY 2021',
    projectTitle: 'Wikipedia Search Application',
    description:
      'Using this Wikipedia Search Application users can search and view curated results and can see detailed explanations in Wikipedia by clicking on the specific result.',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/wiki-logo-img.png',
    duration: '4 hrs',
    projectUrl: 'https://wikiseaarch.ccbp.tech/',
  },
  {
    id: 'd80781c3-980e-4ab9-96ca-9ad1a9cdf93d',
    categoryId: 'COURSE',
    title: '15 MARCH 2021',
    courseTitle: 'RWD using Flexbox',
    description:
      'Learn to develop responsive layouts using CSS Flexbox and CSS Media Queries.',
    duration: '7 days',
    tagsList: [
      {
        id: '34e6b208-f768-11eb-9a03-0242ac130003',
        name: 'Sizing Elements',
      },
      {
        id: '34e6b460-f768-11eb-9a03-0242ac130003',
        name: 'Flexbox Layout',
      },
      {
        id: '34e6b76c-f768-11eb-9a03-0242ac130003',
        name: 'Min & Max sizes',
      },
      {
        id: '34e6b83e-f768-11eb-9a03-0242ac130003',
        name: 'Media Query Syntax',
      },
      {
        id: '34e6b8fc-f768-11eb-9a03-0242ac130003',
        name: 'Logical Operators',
      },
      {
        id: '34e6ba28-f768-11eb-9a03-0242ac130003',
        name: 'CSS box-sizing property',
      },
      {
        id: '34e6baf0-f768-11eb-9a03-0242ac130003',
        name: 'Media Features',
      },
    ],
  },
  {
    id: '7bc3f006-f0f1-4574-924b-17c480556727',
    categoryId: 'PROJECT',
    title: '20 MARCH 2021',
    projectTitle: 'Move Messenger',
    description:
      'The landing page of Move Messenger gives you a brief intro of Move Messenger. The landing page is responsive enabling to view it across various devices.',
    imageUrl:
      'https://assets.ccbp.in/frontend/intermediate-rwd/move-messenger-img.png',
    duration: '5 hr',
    projectUrl: 'https://movemessengers.ccbp.tech/',
  },
  {
    id: 'e681e826-260c-4540-9ee5-f53d0e6ecba0',
    categoryId: 'COURSE',
    title: '30 APRIL 2021',
    courseTitle: 'React JS - Getting Started',
    description:
      'Learn how to build dynamic web applications with the React JS library. When you finish this course, you will be comfortable in creating a modern, clean, and maintainable application in React JS, from scratch.',
    duration: '18 days',
    tagsList: [
      {
        id: '94947ad2-f768-11eb-9a03-0242ac130003',
        name: 'Components',
      },
      {
        id: '94947d52-f768-11eb-9a03-0242ac130003',
        name: 'Lists',
      },
      {
        id: '94947e4c-f768-11eb-9a03-0242ac130003',
        name: 'Conditional Rendering',
      },
      {
        id: '94947f14-f768-11eb-9a03-0242ac130003',
        name: 'setState()',
      },
      {
        id: '94948270-f768-11eb-9a03-0242ac130003',
        name: 'Updating Phase',
      },
      {
        id: '94948342-f768-11eb-9a03-0242ac130003',
        name: 'Routing',
      },
      {
        id: '94948400-f768-11eb-9a03-0242ac130003',
        name: 'API Calls',
      },
    ],
  },
  {
    id: 'e093c08a-a2ae-413a-814b-e7c83f5f2ac3',
    categoryId: 'PROJECT',
    title: '26 MAY 2021',
    projectTitle: 'Nxt Trendz',
    description:
      'Nxt Trendz application is an E-commerce application like Amazon, Flipkart where users can log in and see the list of products with search, filters, sort by, etc.',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-img.png',
    duration: '6 hrs',
    projectUrl: 'https://nxtz.ccbp.tech/',
  },
]

function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}) {
  class MockIntersectionObserver {
    constructor() {
      this.root = root
      this.rootMargin = rootMargin
      this.thresholds = thresholds
      this.disconnect = disconnect
      this.observe = observe
      this.takeRecords = takeRecords
      this.unobserve = unobserve
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

describe(':::RJSCPRXL8I_TEST_SUITE_1:::CCBP Timeline tests', () => {
  beforeEach(() => {
    setupIntersectionObserverMock()
  })

  it(':::RJSCPRXL8I_TEST_1:::Page should consist of HTML main heading element with text content as "MY JOURNEY OF CCBP 4.0":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /MY JOURNEY OF CCBP 4.0/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRXL8I_TEST_2:::Page should consist of HTML main heading elements with text content as value of the key "courseTitle" in the timeline item with categoryId as "COURSE" in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[0].courseTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[2].courseTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[4].courseTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[7].courseTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[9].courseTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRXL8I_TEST_3:::Page should consist of HTML main heading elements with text content as value of the key "projectTitle" in the timeline item with categoryId as "PROJECT" in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[1].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[3].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[5].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[6].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[8].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: timelineItemsList[10].projectTitle,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRXL8I_TEST_4:::Page should consist of HTML paragraph elements with text content as value of the key "description" in the timeline item in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/^Build your own/i, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByText(/^Build your own/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(
      screen.getByText(/^A tourism website/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^A tourism website/i, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^Build a responsive website/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Build a responsive website/i, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^Food Much Website/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Food Much Website/i, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^Learn the fundamental/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Learn the fundamental/i, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^This app helps/i, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByText(/^This app helps/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(
      screen.getByText(/^Using this Wikipedia/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Using this Wikipedia/i, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^Learn to develop/i, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByText(/^Learn to develop/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(
      screen.getByText(/^The landing page/i, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByText(/^The landing page/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(
      screen.getByText(/^Learn how to build dynamic web/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Learn how to build dynamic web/i, {exact: false})
        .tagName,
    ).toBe('P')
    expect(
      screen.getByText(/^Nxt Trendz application/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/^Nxt Trendz application/i, {exact: false}).tagName,
    ).toBe('P')
  })

  it(':::RJSCPRXL8I_TEST_5:::Page should consist of HTML element with text content as value of the key "title" in the timeline item in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(timelineItemsList[0].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[1].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[3].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[5].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[6].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[8].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[10].title, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRXL8I_TEST_6:::Page should consist of HTML image elements with alt attribute value as "project" and src value as "imageUrl" in the timeline item with categoryId as "PROJECT" in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[0].src,
    ).toBe(timelineItemsList[1].imageUrl)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[1],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[1].src,
    ).toBe(timelineItemsList[3].imageUrl)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[2],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[2].src,
    ).toBe(timelineItemsList[5].imageUrl)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[3],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[3].src,
    ).toBe(timelineItemsList[6].imageUrl)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[4],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[4].src,
    ).toBe(timelineItemsList[8].imageUrl)
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[5],
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', {name: /project/i, exact: false})[5].src,
    ).toBe(timelineItemsList[10].imageUrl)
  })

  it(':::RJSCPRXL8I_TEST_7:::JSX code implementation for "Clock" icon should use "AiFillClockCircle" from the react-icons package :::5:::', () => {
    expect(jsxCode.match(/AiFillClockCircle/).length).toBeGreaterThanOrEqual(1)
    expect(jsxCode.match(/<AiFillClockCircle/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPRXL8I_TEST_8:::JSX code implementation for "Calendar" icon should use "AiFillCalendar" from the react-icons package :::5:::', () => {
    expect(jsxCode1.match(/AiFillCalendar/).length).toBeGreaterThanOrEqual(1)
    expect(jsxCode1.match(/<AiFillCalendar/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPRXL8I_TEST_9:::Page should consist of HTML paragraph element with text content as value of the key "duration" in the timeline item in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(timelineItemsList[0].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[1].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[1].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[3].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[3].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[5].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[5].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[6].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[6].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[8].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[8].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].duration, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[10].duration, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[10].duration, {exact: false}).tagName,
    ).toBe('P')
  })

  it(':::RJSCPRXL8I_TEST_10:::Page should consist of at least six HTML anchor elements with text content as "Visit" in the card:::5:::', () => {
    render(<App />)
    const anchorEls = screen.getAllByText(/Visit/i, {exact: false})
    expect(anchorEls.length).toBeGreaterThanOrEqual(6)
    expect(anchorEls[0].tagName).toBe('A')
  })

  it(':::RJSCPRXL8I_TEST_11:::Page should consist of HTML anchor elements with text content as "Visit" and the "href" value of the key "projectUrl" in the "timelineItemsList":::5:::', () => {
    render(<App />)

    expect(screen.getAllByRole('link')[0].href).toBe(
      timelineItemsList[1].projectUrl,
    )
    expect(screen.getAllByRole('link')[1].href).toBe(
      timelineItemsList[3].projectUrl,
    )
    expect(screen.getAllByRole('link')[2].href).toBe(
      timelineItemsList[5].projectUrl,
    )
    expect(screen.getAllByRole('link')[3].href).toBe(
      timelineItemsList[6].projectUrl,
    )
    expect(screen.getAllByRole('link')[4].href).toBe(
      timelineItemsList[8].projectUrl,
    )
    expect(screen.getAllByRole('link')[5].href).toBe(
      timelineItemsList[10].projectUrl,
    )
  })

  it(':::RJSCPRXL8I_TEST_12:::Page should consist of HTML paragraph elements with text content as values of the key "name" in the tagsList inside the timeline item with categoryId as "COURSE" in the "timelineItemsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(timelineItemsList[0].tagsList[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[0].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[1].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[1].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[2].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[2].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[3].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[3].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[4].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[4].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[5].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[5].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[0].tagsList[6].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[0].tagsList[6].name).tagName,
    ).toBe('P')

    expect(
      screen.getByText(timelineItemsList[2].tagsList[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[0].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[1].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[1].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[2].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[2].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[3].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[3].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[4].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[4].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[5].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[5].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[2].tagsList[6].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[2].tagsList[6].name).tagName,
    ).toBe('P')

    expect(
      screen.getByText(timelineItemsList[4].tagsList[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[0].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[1].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[1].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[2].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[2].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[3].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[3].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[4].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[4].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[5].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[5].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[4].tagsList[6].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[4].tagsList[6].name).tagName,
    ).toBe('P')

    expect(
      screen.getByText(timelineItemsList[7].tagsList[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[0].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[1].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[1].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[2].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[2].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[3].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[3].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[4].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[4].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[5].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[5].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[7].tagsList[6].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[7].tagsList[6].name).tagName,
    ).toBe('P')

    expect(
      screen.getByText(timelineItemsList[9].tagsList[0].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[0].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[1].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[1].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[2].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[2].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[3].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[3].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[4].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[4].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[5].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[5].name).tagName,
    ).toBe('P')
    expect(
      screen.getByText(timelineItemsList[9].tagsList[6].name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(timelineItemsList[9].tagsList[6].name).tagName,
    ).toBe('P')
  })

  it(':::RJSCPRXL8I_TEST_13:::Page should consist of "timelineItemsList" and it is wrapped with Chrono component from react-chrono:::5:::', () => {
    render(<App />)
    expect(screen.getAllByTestId('tree-main').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPRXL8I_TEST_14:::The "TimelineView" component rendered using Chrono component with prop "mode" should have its value as "VERTICAL_ALTERNATING":::5:::', () => {
    render(<App />)
    expect(
      screen.getAllByTestId('vertical-item-row').length,
    ).toBeGreaterThanOrEqual(10)
  })

  it(':::RJSCPRXL8I_TEST_15:::Page should consist of "timelineItemsList" and rendered as card inside the Chrono component from react-chrono:::5:::', () => {
    render(<App />)
    expect(screen.getAllByTestId('tree-leaf').length).toBeGreaterThanOrEqual(10)
  })

  it(':::RJSCPRXL8I_TEST_16:::Page should consist of HTML element with text content as "10 DECEMBER 2020":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/^10 DECEMBER 2020/i, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRXL8I_TEST_17:::Page should consist of HTML element with text content as "21 DECEMBER 2020":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/^21 DECEMBER 2020/i, {exact: false}),
    ).toBeInTheDocument()
  })
})
