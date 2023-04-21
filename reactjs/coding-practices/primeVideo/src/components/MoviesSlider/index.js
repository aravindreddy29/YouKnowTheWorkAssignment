import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieItem from '../MovieItem'

const MoviesSlider = props => {
  // console.log(movies)
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  }

  const {movies} = props

  return (
    <div>
      <Slider {...settings}>
        {movies.map(each => (
          <MovieItem key={each.id} item={each} />
        ))}
      </Slider>
    </div>
  )
}

export default MoviesSlider
