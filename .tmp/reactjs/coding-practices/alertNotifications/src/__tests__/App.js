import {render, screen} from '@testing-library/react'
import * as fs from 'fs'
import path from 'path'

import Notification from '../components/Notification'
import App from '../App'

const NotificationsJsx = fs.readFileSync(
  path.resolve(__dirname, '../components/AlertNotifications/index.js'),
  'utf8',
)

const NotificationJsx = fs.readFileSync(
  path.resolve(__dirname, '../components/Notification/index.js'),
  'utf8',
)

describe(':::RJSCP4QWZN_TEST_SUITE_1:::Alert Notifications App tests', () => {
  it(':::RJSCP4QWZN_TEST_1:::Page should consist of HTML main heading element with text content as "Alert Notifications":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Alert Notifications/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCP4QWZN_TEST_2:::In AlertNotifications component JS code implementation should use "AiFillCheckCircle" for the Success notification from the react-icons package :::5:::', async () => {
    expect(
      NotificationsJsx.match(/AiFillCheckCircle/).length,
    ).toBeGreaterThanOrEqual(1)
    expect(
      NotificationsJsx.match(/<AiFillCheckCircle/).length,
    ).toBeGreaterThanOrEqual(1)
  })
  it(':::RJSCP4QWZN_TEST_3:::Page should consist of HTML main heading element with text content as "Success":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Success/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCP4QWZN_TEST_4:::Page should consist of HTML paragraph element with text content as "You can access all the files in the folder":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/You can access all the files in the folder/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/You can access all the files in the folder/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })
  it(':::RJSCP4QWZN_TEST_5:::In AlertNotifications component JS code implementation should use "RiErrorWarningFill" for the Error notification from the react-icons package :::5:::', async () => {
    expect(
      NotificationsJsx.match(/RiErrorWarningFill/).length,
    ).toBeGreaterThanOrEqual(1)
    expect(
      NotificationsJsx.match(/<RiErrorWarningFill/).length,
    ).toBeGreaterThanOrEqual(1)
  })
  it(':::RJSCP4QWZN_TEST_6:::Page should consist of HTML main heading element with text content as "Error":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Error/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCP4QWZN_TEST_7:::Page should consist of HTML paragraph element with text content as "Sorry, you are not authorized to have access to delete the file":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(
        /Sorry, you are not authorized to have access to delete the file/i,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Sorry, you are not authorized to have access to delete the file/i,
        {
          exact: false,
        },
      ).tagName,
    ).toBe('P')
  })
  it(':::RJSCP4QWZN_TEST_8:::In AlertNotifications component JS code implementation should use "MdWarning" for the Warning notification from the react-icons package :::5:::', async () => {
    expect(NotificationsJsx.match(/MdWarning/).length).toBeGreaterThanOrEqual(1)
    expect(NotificationsJsx.match(/<MdWarning/).length).toBeGreaterThanOrEqual(
      1,
    )
  })

  it(':::RJSCP4QWZN_TEST_9:::Page should consist of HTML main heading element with text content as "Warning":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Warning/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCP4QWZN_TEST_10:::Page should consist of HTML paragraph element with text content as "Viewers of this file can see comments and suggestions":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(
        /Viewers of this file can see comments and suggestions/i,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Viewers of this file can see comments and suggestions/i,
        {
          exact: false,
        },
      ).tagName,
    ).toBe('P')
  })
  it(':::RJSCP4QWZN_TEST_11:::In AlertNotifications component JS code implementation should use "MdInfo" for the Info notification from the react-icons package :::5:::', async () => {
    expect(NotificationsJsx.match(/MdInfo/).length).toBeGreaterThanOrEqual(1)
    expect(NotificationsJsx.match(/<MdInfo/).length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCP4QWZN_TEST_12:::Page should consist of HTML main heading element with text content as "Info":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Info/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4QWZN_TEST_13:::Page should consist of HTML paragraph element with text content as "Anyone on the internet can view these files":::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(/Anyone on the internet can view these files/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Anyone on the internet can view these files/i, {
        exact: false,
      }).tagName,
    ).toBe('P')
  })

  it(':::RJSCP4QWZN_TEST_14:::In Notification component JS code implementation should use "GrFormClose" for each notification from the react-icons package :::5:::', async () => {
    expect(NotificationJsx.match(/GrFormClose/).length).toBeGreaterThanOrEqual(
      1,
    )
    expect(NotificationJsx.match(/<GrFormClose/).length).toBeGreaterThanOrEqual(
      1,
    )
  })
  it(':::RJSCP4QWZN_TEST_15:::Notification component should render the children props that have been passed from the AlertNotifications component:::5:::', () => {
    render(<Notification>Render Children props</Notification>)
    expect(
      screen.getByText(/Render Children props/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
})
