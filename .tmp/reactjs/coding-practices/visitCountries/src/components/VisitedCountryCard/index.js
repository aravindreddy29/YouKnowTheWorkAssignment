import './index.css'

const VisitedCountryCard = props => {
  const {visitedCountryDetails, clickedRemoveButton} = props
  const {id, name, imageUrl} = visitedCountryDetails

  const onClickRemoveButton = () => {
    clickedRemoveButton(id)
  }

  return (
    <li className="visited-country-card">
      <img src={imageUrl} alt="thumbnail" className="country-image" />
      <div className="name-and-remove-btn">
        <p className="visited-country-name">{name}</p>
        <button
          type="button"
          className="remove-btn"
          onClick={onClickRemoveButton}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default VisitedCountryCard
