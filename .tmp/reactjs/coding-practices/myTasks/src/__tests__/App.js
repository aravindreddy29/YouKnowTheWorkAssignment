import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

jest.mock('uuid', () => {
  let counter = 0
  const uuidGen = () => {
    counter += 1
    return `uuid_${counter}`
  }
  const reset = () => {
    counter = 0
  }
  return {v4: uuidGen, reset}
})

const uuid = require('uuid')

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const originalConsoleError = console.error

describe(':::RJSCEUU4M8_TEST_SUITE_1:::My Tasks Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    uuid.reset()
  })
  afterEach(() => {
    console.error = originalConsoleError
  })
  it(':::RJSCEUU4M8_TEST_1:::When a task is added page should consist of at least two HTML list items and the tagsList should be rendered using a unique key as a prop for each tagItem:::10:::', () => {
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

  it(':::RJSCEUU4M8_TEST_2:::Page should consist of HTML main heading element with text content as "Create a task":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Create a task/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCEUU4M8_TEST_3:::Page should consist of HTML form element to display all the input elements and button element:::5:::', () => {
    const {container} = render(<App />)
    const formElement = container.querySelectorAll('form')
    expect(formElement.length).toBeGreaterThanOrEqual(1)
  })
  it(':::RJSCEUU4M8_TEST_4:::Page should consist of the HTML input element with the label as "Task" and type as "text" with "Enter the task here" as a placeholder:::10:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Task/i, {
        exact: false,
      }).type,
    ).toBe('text')
    expect(
      screen.getByPlaceholderText(/Enter the task here/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCEUU4M8_TEST_5:::Page should consist of HTML select element with the label as "Tags" and initial value should contain the value of key "optionId" from the first item provided in the tagsList:::10:::', () => {
    render(<App />)
    expect(
      screen.getByLabelText(/Tags/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').value).toMatch(/HEALTH/i)
  })
  it(':::RJSCEUU4M8_TEST_6:::Page should consist of HTML option elements with value equal to the value of the key "optionId" in the tagsList provided:::10:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: tagsList[0].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[0].optionId)
    expect(
      screen.getByRole('option', {
        name: tagsList[1].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[1].optionId)
    expect(
      screen.getByRole('option', {
        name: tagsList[2].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[2].optionId)
    expect(
      screen.getByRole('option', {
        name: tagsList[3].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[3].optionId)
    expect(
      screen.getByRole('option', {
        name: tagsList[4].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[4].optionId)
    expect(
      screen.getByRole('option', {
        name: tagsList[5].displayText,
        exact: false,
      }).value,
    ).toBe(tagsList[5].optionId)
  })
  it(':::RJSCEUU4M8_TEST_7:::Page should consist of HTML option elements with text content equal to the value of the key "displayText" in the tagsList provided:::10:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: tagsList[0].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: tagsList[1].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: tagsList[2].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: tagsList[3].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: tagsList[4].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('option', {
        name: tagsList[5].displayText,
        exact: false,
      }),
    )
  })
  it(':::RJSCEUU4M8_TEST_8:::Page should consist of HTML button element with text content as "Add Task":::10:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Add Task/, exact: false}),
    ).toBeInTheDocument()
  })
  it(':::RJSCEUU4M8_TEST_9:::Page should consist of HTML main heading element with text content as "Tags":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Tags/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCEUU4M8_TEST_10:::Page should consist of HTML list items to display the given list of tags in the tagsList:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
  })

  it(':::RJSCEUU4M8_TEST_11:::Page should consist of HTML Button elements with text content equal to the value of the key "displayText" in the tagsList provided:::10:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {
        name: tagsList[0].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: tagsList[1].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: tagsList[2].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: tagsList[3].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: tagsList[4].displayText,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: tagsList[5].displayText,
        exact: false,
      }),
    )
  })
  it(':::RJSCEUU4M8_TEST_12:::Page should consist of HTML main heading element with text content as "Tasks":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Tasks/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCEUU4M8_TEST_13::: When the tasks list is empty then page should consist of HTML paragraph element with text content as "No Tasks Added Yet":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/No Tasks Added Yet/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/No Tasks Added Yet/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCEUU4M8_TEST_14:::When a non-empty value is provided for the HTML input element with the label text "Task", the value provided should be updated in the value of the input element:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Go to Gym')
    expect(screen.getByLabelText(/Task/i).value).toBe('Go to Gym')
  })
  it(':::RJSCEUU4M8_TEST_15:::When a value is provided for the HTML select element with the label text "Tags", the value provided should be updated in the value of the select element:::10:::', () => {
    render(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[2].displayText,
    )
    expect(screen.getByRole('combobox').value).toBe(tagsList[2].optionId)
  })
  it(':::RJSCEUU4M8_TEST_16:::When non-empty values are provided in the HTML input and select elements with label text "Task" and "Tags", and the "Add Task" button is clicked, the values inside the HTML input and select elements should be updated to their initial values:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Movie')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[2].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[2].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    expect(screen.getByLabelText(/Task/i).value).toBe('')
    expect(screen.getByRole('combobox').value).toBe(tagsList[0].optionId)
  })

  it(':::RJSCEUU4M8_TEST_17:::When non-empty values are provided in the HTML input and select elements with label text "Task" and "Tags", and the "Add Task" button is clicked, an HTML list item should be added:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Movie')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[2].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[2].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(7)
  })
  it(':::RJSCEUU4M8_TEST_18:::When non-empty values are provided in the HTML input and select elements with label text "Task" and "Tags", and the "Add Task" button is clicked, then the page should consist of at least 2 HTML unordered list elements to display the list of tags and tasks :::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Exam Preparation')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[1].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[1].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    const unorderListElements = screen.getAllByRole('list')
    expect(unorderListElements.length).toBeGreaterThanOrEqual(2)
    expect(unorderListElements[0].tagName).toBe('UL')
    expect(unorderListElements[1].tagName).toBe('UL')
  })

  it(':::RJSCEUU4M8_TEST_19:::When non-empty values are provided in the HTML input and select elements with label text "Task" and "Tags", and the "Add Task" button is clicked, an HTML list item should be added to the tasks list with a unique id imported from the UUID package :::10:::', () => {
    const spy = jest.spyOn(uuid, 'v4')
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Movie')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[2].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[2].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(7)
  })

  it(':::RJSCEUU4M8_TEST_20:::When a non-empty value is provided for the HTML input element with label text "Task" and the "Add Task" button is clicked, an HTML paragraph element with text content as "Task" provided should be displayed:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Movie')
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )

    expect(screen.getByText(/Movie/i)).toBeInTheDocument()
    expect(screen.getByText(/Movie/i, {exact: false}).tagName).toBe('P')
  })
  it(':::RJSCEUU4M8_TEST_21:::When a value is provided for the HTML select element with label text "Tags", and the "Add Task" button is clicked, an HTML paragraph element with text content "Tag" provided should be displayed:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Movie')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[2].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[2].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    const paragraphEl = screen.getAllByText(/Entertainment/i)

    expect(
      paragraphEl.some(paragraphEl => paragraphEl.tagName === 'P'),
    ).toBeTruthy()
  })
  it(':::RJSCEUU4M8_TEST_22:::When a tag in the list of tags is active, then the respective tasks should be filtered and displayed using HTML paragraph elements accordingly:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Exam Preparation')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[1].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[1].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    userEvent.type(screen.getByLabelText(/Task/i), 'Play Cricket')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[3].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[3].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    userEvent.click(
      screen.getByRole('button', {name: /Education/i, exact: false}),
    )
    expect(screen.getByText(/Exam Preparation/i)).toBeInTheDocument()
    expect(screen.getByText(/Exam Preparation/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(screen.queryByText(/Play Cricket/i)).not.toBeInTheDocument()
  })

  it(':::RJSCEUU4M8_TEST_23:::When a tag in the list of tags is active, then the tag name of the respective tasks should be displayed using HTML paragraph elements:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Exam Preparation')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[1].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[1].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    userEvent.type(screen.getByLabelText(/Task/i), 'Play Cricket')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[3].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[3].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    userEvent.click(
      screen.getByRole('button', {name: /Education/i, exact: false}),
    )
    expect(screen.getAllByText(/Education/i)[2]).toBeInTheDocument()
    expect(screen.getAllByText(/Education/i, {exact: false})[2].tagName).toBe(
      'P',
    )
    expect(screen.queryByText(/Play Cricket/i)).not.toBeInTheDocument()
  })
  it(':::RJSCEUU4M8_TEST_24:::When no tag in the list of tags is inactive, then all the tasks should be displayed:::10:::', () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/Task/i), 'Exam Preparation')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[1].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[1].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    userEvent.type(screen.getByLabelText(/Task/i), 'Play Cricket')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      tagsList[3].displayText,
    )

    expect(screen.getByRole('combobox').value).toBe(tagsList[3].optionId)
    userEvent.click(
      screen.getByRole('button', {name: /Add Task/i, exact: false}),
    )
    expect(screen.getByText(/Exam Preparation/i)).toBeInTheDocument()
    expect(screen.getByText(/Exam Preparation/i, {exact: false}).tagName).toBe(
      'P',
    )
    expect(screen.getAllByText(/Education/i)[2]).toBeInTheDocument()
    expect(screen.getAllByText(/Education/i, {exact: false})[2].tagName).toBe(
      'P',
    )
    expect(screen.getByText(/Play Cricket/i)).toBeInTheDocument()
    expect(screen.getByText(/Play Cricket/i, {exact: false}).tagName).toBe('P')
    expect(screen.getAllByText(/Sports/i)[2]).toBeInTheDocument()
    expect(screen.getAllByText(/Sports/i, {exact: false})[2].tagName).toBe('P')
  })
})
