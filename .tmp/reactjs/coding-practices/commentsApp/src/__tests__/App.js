import {render, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import App from '../App'

const comments =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'
const likeOutlined =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const likeFilled =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
const deleteImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'

const originalConsoleError = console.error

describe(':::RJSCPJO5SO_TEST_SUITE_1:::Comments App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPJO5SO_TEST_1:::When a comment is added, then the page should consist of at least one HTML list item and the commentsList should be rendered using a unique key as a prop for each comment item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    userEvent.type(screen.getAllByRole('textbox')[0], 'Richard Branson')
    userEvent.type(
      screen.getAllByRole('textbox')[1],
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPJO5SO_TEST_2:::Page should consist of HTML main heading element with text content as "Comments":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Comments/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_3:::Page should consist of HTML paragraph element with text content starting with "Say Something":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Say Something/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPJO5SO_TEST_4:::Page should consist of an HTML form element:::5:::', () => {
    const {container} = render(<App />)

    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_5:::Page should consist of HTML input element with a placeholder as "Your Name":::5:::', () => {
    render(<App />)

    const inputEl = screen.getByPlaceholderText(/Your Name/i, {exact: false})

    expect(inputEl).toBeInTheDocument()
    expect(inputEl.tagName).toBe('INPUT')
  })

  it(':::RJSCPJO5SO_TEST_6:::Page should consist of HTML textarea element with a placeholder as "Your Comment":::5:::', () => {
    render(<App />)
    const textAreaEl = screen.getByPlaceholderText(/Your Comment/i, {
      exact: false,
    })

    expect(textAreaEl).toBeInTheDocument()
    expect(textAreaEl.tagName).toBe('TEXTAREA')
  })

  it(':::RJSCPJO5SO_TEST_7:::Page should consist of HTML button element with text content as "Add Comment":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_8:::Page should consist of HTML image element with alt as "comments" and src value as URL for comments image:::5:::', () => {
    render(<App />)

    const imageEl = screen.getByRole('img', {name: /comments/i, exact: false})

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(comments)
  })

  it(':::RJSCPJO5SO_TEST_9:::Page should initially consist of HTML element with text content as "0":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/^0/i)).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_10:::When a non-empty value is provided in the HTML input element for name, then the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)

    const nameField = screen.getByPlaceholderText(/Your Name/i, {exact: false})

    userEvent.type(nameField, 'Richard Branson')
    expect(nameField.value).toBe('Richard Branson')
  })

  it(':::RJSCPJO5SO_TEST_11:::When a non-empty value is provided in the HTML textarea element for comment, then the value provided should be updated in the value of the textarea element:::5:::', () => {
    render(<App />)
    const commentField = screen.getByPlaceholderText(/Your Comment/i, {
      exact: false,
    })
    userEvent.type(
      commentField,
      'Thanks for being so typically supportive, Elon',
    )
    expect(commentField.value).toBe(
      'Thanks for being so typically supportive, Elon',
    )
  })

  it(':::RJSCPJO5SO_TEST_12:::When non-empty values are provided in the HTML input element and HTML text area element and the "Add Comment" button is clicked, then the values inside the input elements should be updated to their initial state:::5:::', () => {
    render(<App />)
    const nameField = screen.getByPlaceholderText(/Your Name/i, {exact: false})
    const commentField = screen.getByPlaceholderText(/Your Comment/i, {
      exact: false,
    })
    userEvent.type(nameField, 'Richard Branson')
    userEvent.type(
      commentField,
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(nameField.value).toBe('')
    expect(commentField.value).toBe('')
  })

  it(':::RJSCPJO5SO_TEST_13:::When a comment is added, then the comments count should be incremented by one:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(screen.getByText(/^1/i)).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_14:::When a comment is added, then the page should consist of an HTML unordered list to display the list of comments:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )

    const unorderedListEl = screen.getByRole('list')
    expect(unorderedListEl).toBeInTheDocument()
    expect(unorderedListEl.tagName).toBe('UL')
  })

  it(':::RJSCPJO5SO_TEST_15:::When a comment is added, then the page should consist of at least one HTML list item to display the comment:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPJO5SO_TEST_16:::When a comment is added, then the name provided in the HTML input element should be displayed in the comment:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(screen.getByText(/Richard Branson/i)).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_17:::When a comment is added, then the comment provided in the HTML textarea element should be displayed in the comment:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(
      screen.getByText(/Thanks for being so typically supportive, Elon/i),
    ).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_18:::When a comment is added, then the comment should contain an HTML paragraph element with text containing how long ago the comment was posted:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(
      screen.getByText(/less than a minute/i, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_19:::When a comment is added, then the comment should contain an HTML image element with alt as "like" and src as the URL for the Like image:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )

    const likeImageEl = screen.getByRole('img', {name: /like/i, exact: false})

    expect(likeImageEl).toBeInTheDocument()
    expect(likeImageEl.src).toBe(likeOutlined)
  })

  it(':::RJSCPJO5SO_TEST_20:::When a comment is added, then the comment should contain an HTML button element with text content as "Like":::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    expect(
      screen.getByRole('button', {name: /like/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_21:::When a comment is added, then the comment should contain an HTML button element with data-testid attribute value as "delete":::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    const deleteBtn = screen.getByTestId('delete')

    expect(deleteBtn).toBeInTheDocument()
    expect(deleteBtn.tagName).toBe('BUTTON')
  })

  it(':::RJSCPJO5SO_TEST_22:::When a comment is added, then the comment should contain an HTML image element with alt as "delete" and src as the URL for the delete image:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    const deleteImg = screen.getByRole('img', {name: /delete/i, exact: false})

    expect(deleteImg).toBeInTheDocument()
    expect(deleteImg.src).toBe(deleteImage)
  })

  it(':::RJSCPJO5SO_TEST_23:::When a comment is added, and the HTML button with text content as "Like" is clicked, then the src value of the HTML image with alt text as "like" should be changed to URL for the Liked image:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    userEvent.click(screen.getByRole('button', {name: /Like/i, exact: false}))
    expect(screen.getByRole('img', {name: /like/i, exact: false}).src).toBe(
      likeFilled,
    )
  })

  it(':::RJSCPJO5SO_TEST_24:::When a comment is added and liked, and the HTML button with text content as "Like" is clicked again, then the src value of the HTML image with alt text as "like" should be changed to URL for the Like image:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    const likeBtn = screen.getByRole('button', {name: /Like/i, exact: false})
    userEvent.click(likeBtn)
    userEvent.click(likeBtn)
    expect(screen.getByRole('img', {name: /like/i, exact: false}).src).toBe(
      likeOutlined,
    )
  })

  it(':::RJSCPJO5SO_TEST_25:::When a comment is added, and the HTML button with data-testid as "delete" is clicked, then the comment item should be deleted from the list of comments:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    userEvent.click(screen.getByTestId('delete'))
    expect(screen.queryByText(/^Richard Branson/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/^Thanks for being so typically supportive, Elon/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /Like/i, exact: false}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('img', {name: /like/i, exact: false}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('img', {name: /delete/i, exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPJO5SO_TEST_26:::When a comment is added, and the HTML button with data-testid as "delete" is clicked, then the count of the comments should be decremented by one:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByPlaceholderText(/Your Name/i, {exact: false}),
      'Richard Branson',
    )
    userEvent.type(
      screen.getByPlaceholderText(/Your Comment/i, {
        exact: false,
      }),
      'Thanks for being so typically supportive, Elon',
    )
    userEvent.click(
      screen.getByRole('button', {name: /Add Comment/i, exact: false}),
    )
    userEvent.click(screen.getByTestId('delete'))
    expect(screen.getByText(/^0/i)).toBeInTheDocument()
  })
})
