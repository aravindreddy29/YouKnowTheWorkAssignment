import {Component} from 'react'
import MoviesSlider from '../MoviesSlider'
import './index.css'

class PrimeVideo extends Component {
  render() {
    const {moviesList} = this.props

    const actionsMovies = moviesList.filter(
      each => each.categoryId === 'ACTION',
    )

    const comedyMovies = moviesList.filter(each => each.categoryId === 'COMEDY')

    return (
      <div className="bg-prime-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/prime-video-img.png"
          alt="prime video"
          className="prime-video"
        />

        <h1>Action Movies</h1>
        <MoviesSlider movies={actionsMovies} />

        <h1>Comedy Movies</h1>
        <MoviesSlider movies={comedyMovies} />
      </div>
    )
  }
}

export default PrimeVideo
