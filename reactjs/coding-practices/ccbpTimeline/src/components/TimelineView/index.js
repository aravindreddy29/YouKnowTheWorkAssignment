import {Chrono} from 'react-chrono'
import {Component} from 'react'
import CourseTimelineCard from '../CourseTimelineCard'
import ProjectTimelineCard from '../ProjectTimelineCard'
import './index.css'

class TimelineView extends Component {
  identifyCategory = each => {
    if (each.categoryId === 'PROJECT') {
      return <ProjectTimelineCard each={each} />
    }
    return <CourseTimelineCard each={each} />
  }

  render() {
    const {timelineItemsList} = this.props
    return (
      <div className="timeline-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">
              MY JOURNEY OF
              <br />
              <span className="ccbp-heading">CCBP 4.0</span>
            </h1>
          </div>

          <Chrono
            theme={{
              primary: 'blue',
              secondary: '#ffffff',
              cardBgColor: '#ffffff',
              cardForeColor: 'violet',
              titleColor: 'red',
            }}
            items={timelineItemsList}
            mode="VERTICAL_ALTERNATING"
          >
            {timelineItemsList.map(each => this.identifyCategory(each))}
          </Chrono>
        </div>
      </div>
    )
  }
}

export default TimelineView
