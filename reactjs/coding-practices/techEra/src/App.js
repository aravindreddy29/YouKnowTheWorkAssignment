import {Route, Switch, Redirect} from 'react-router-dom'
import TechEraHome from './components/TechEraHome'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEraHome} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
