import {mount} from 'enzyme'
import ReactPlayer from 'react-player'

import App from '../App'

describe(':::RJSCPDXAGS_TEST_SUITE_2:::React Player tests', () => {
  it(':::RJSCPDXAGS_TEST_19:::When any thumbnail in the moviesList is clicked, then the page should consist of ReactPlayer component from react-player:::5:::', () => {
    const wrapper = mount(<App />)
    wrapper.find('[alt="thumbnail"]').at(0).simulate('click')
    expect(wrapper.find(ReactPlayer)).toHaveLength(1)
  })
})
