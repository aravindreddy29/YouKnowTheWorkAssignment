import {render, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import ConfigurationContext from '../context/ConfigurationContext'
import ConfigurationController from '../components/ConfigurationController'

import Layout from '../components/Layout'

import App from '../App'

const customRender = (ui, {providerProps, ...renderOptions}) =>
  render(
    <ConfigurationContext.Provider {...providerProps}>
      {ui}
    </ConfigurationContext.Provider>,
    renderOptions,
  )

describe(':::RJSCPPC2A0_TEST_SUITE_1:::layout builder tests', () => {
  it(':::RJSCPPC2A0_TEST_1:::Initially when the page is opened all the elements in the layout should be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }

    customRender(<Layout />, {providerProps})
    expect(
      screen.getByRole('heading', {name: /Left Navbar Menu/i}),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /Content/i})).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Right Navbar/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_2:::Page should consist of HTML main heading element with text content as "Layout":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Layout/i})).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_3:::Page should consist of an HTML checkbox input element with label text as "Content":::5:::', () => {
    render(<App />)
    screen.getByRole('checkbox', {
      name: /Content/i,
    })
  })

  it(':::RJSCPPC2A0_TEST_4:::Page should consist of an HTML checkbox input element with label text as "Left Navbar":::5:::', () => {
    render(<App />)
    screen.getByRole('checkbox', {
      name: /Left Navbar/i,
    })
  })

  it(':::RJSCPPC2A0_TEST_5:::Page should consist of an HTML checkbox input element with label text as "Right Navbar":::5:::', () => {
    render(<App />)
    screen.getByRole('checkbox', {
      name: /Right Navbar/i,
    })
  })

  it(':::RJSCPPC2A0_TEST_6:::Page should consist of HTML main heading element with text content as "Header" :::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Header/i})).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_7:::Page should consist of HTML main heading element with text content as "Left Navbar Menu" :::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Left Navbar Menu/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_8:::Page should consist of HTML unordered list to display the list of items in left navbar :::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPPC2A0_TEST_9:::Page should consist of HTML main heading element with text content as "Content" :::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Content/i})).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_10:::Page should consist of HTML paragraph element with text content starting with "Lorem ipsum" :::5:::', () => {
    render(<App />)
    expect(screen.getByText(/^Lorem ipsum/i).tagName).toBe('P')
  })

  it(':::RJSCPPC2A0_TEST_11:::Page should consist of HTML main heading element with text content as "Right Navbar Menu" :::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Right Navbar/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_12:::Page should consist of HTML paragraph elements with text content as "Ad 1":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/Ad 1/i)).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_13:::Page should consist of HTML paragraph elements with text content as "Ad 2":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/Ad 2/i)).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_14:::Page should consist of HTML main heading element with text content as "Footer" :::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Footer/i})).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_15:::When the value of the "showContent" key in "ConfigurationContext" is true, then the content should be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.getByText(/Content/i)).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_16:::When the value of the "showContent" key in "ConfigurationContext" is false, then the content should not be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: false,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.queryByText(/Content/i)).not.toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_17:::When the value of the "showLeftNavbar" key in "ConfigurationContext" is true, then the Left Navbar Menu should be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.getByText(/Left Navbar Menu/i)).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_18:::When the value of the "showLeftNavbar" key in "ConfigurationContext" is false, then the Left Navbar Menu should not be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: false,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.queryByText(/Left Navbar Menu/i)).not.toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_19:::When the value of the "showRightNavbar" key in "ConfigurationContext" is true, then the Right Navbar should be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.getByText(/Right Navbar/i)).toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_20:::When the value of the "showRightNavbar" key in "ConfigurationContext" is false, then the Right Navbar should not be displayed:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: false,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<Layout />, {providerProps})
    expect(screen.queryByText(/Right Navbar/i)).not.toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_21:::When the Content checkbox is unchecked the "onToggleShowContent" method in "ConfigurationContext" should be called:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<ConfigurationController />, {providerProps})

    const checkbox = screen.getByRole('checkbox', {
      name: /Content/i,
    })

    userEvent.click(checkbox)
    expect(providerProps.value.onToggleShowContent).toHaveBeenCalled()
  })

  it(':::RJSCPPC2A0_TEST_22:::When the Left Navbar checkbox is unchecked the "onToggleShowLeftNavbar" method in "ConfigurationContext" should be called:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<ConfigurationController />, {providerProps})

    const checkbox = screen.getByRole('checkbox', {
      name: /Left Navbar/i,
    })

    userEvent.click(checkbox)
    expect(providerProps.value.onToggleShowLeftNavbar).toHaveBeenCalled()
  })

  it(':::RJSCPPC2A0_TEST_23:::When the Right Navbar checkbox is unchecked the "onToggleShowRightNavbar" method in "ConfigurationContext" should be called:::5:::', () => {
    const providerProps = {
      value: {
        showContent: true,
        showLeftNavbar: true,
        showRightNavbar: true,
        onToggleShowContent: jest.fn(),
        onToggleShowLeftNavbar: jest.fn(),
        onToggleShowRightNavbar: jest.fn(),
      },
    }
    customRender(<ConfigurationController />, {providerProps})

    const checkbox = screen.getByRole('checkbox', {
      name: /Right Navbar/i,
    })

    userEvent.click(checkbox)
    expect(providerProps.value.onToggleShowRightNavbar).toHaveBeenCalled()
  })

  it(':::RJSCPPC2A0_TEST_24:::When the Content checkbox is unchecked then the Content should not be displayed:::5:::', () => {
    render(<App />)
    const checkbox = screen.getByRole('checkbox', {
      name: /Content/i,
    })
    userEvent.click(checkbox)
    expect(screen.queryByText(/^Lorem ipsum/i)).not.toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_25:::When the Left Navbar checkbox is unchecked then the Left Navbar should not be displayed:::5:::', () => {
    render(<App />)
    const checkbox = screen.getByRole('checkbox', {
      name: /Left Navbar/i,
    })
    userEvent.click(checkbox)
    expect(screen.queryByText(/Left Navbar Menu/i)).not.toBeInTheDocument()
  })

  it(':::RJSCPPC2A0_TEST_26:::When the Right Navbar checkbox is unchecked then the Right Navbar should not be displayed:::5:::', () => {
    render(<App />)
    const checkbox = screen.getByRole('checkbox', {
      name: /Right Navbar/i,
    })
    userEvent.click(checkbox)
    expect(
      screen.queryByText(/Right Navbar/i, {ignore: 'label'}),
    ).not.toBeInTheDocument()
  })
})
