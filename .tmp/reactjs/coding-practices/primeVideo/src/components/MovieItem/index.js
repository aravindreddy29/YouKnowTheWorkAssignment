import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import {IoMdClose} from 'react-icons/io'

const MovieItem = props => {
  const {item} = props
  return (
    <div>
      <Popup
        modal
        trigger={
          <img className="thumbnail" src={item.thumbnailUrl} alt="thumbnail" />
        }
        className="popup-content"
      >
        {close => (
          <>
            <button
              type="button"
              data-testid="closeButton"
              onClick={() => close()}
            >
              <IoMdClose size={20} />
            </button>
            <div>
              <ReactPlayer url={item.videoUrl} />
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export default MovieItem
