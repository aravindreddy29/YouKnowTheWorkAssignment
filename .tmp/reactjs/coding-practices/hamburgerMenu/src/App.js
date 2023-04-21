import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <div className="total-bg-cont">
    <Header />
    <hr />
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
        data-testid="hamburgerIconButton"
      />
      <Route
        exact
        path="/about"
        component={About}
        data-testid="hamburgerIconButton"
      />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
