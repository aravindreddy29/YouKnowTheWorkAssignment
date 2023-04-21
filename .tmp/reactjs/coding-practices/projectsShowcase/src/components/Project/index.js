import './index.css'

const Project = props => {
  const {projectDetails} = props
  const {imageUrl, name} = projectDetails

  return (
    <li className="project-item">
      <img src={imageUrl} alt={name} className="project-img" />
      <p className="name">{name}</p>
    </li>
  )
}

export default Project
