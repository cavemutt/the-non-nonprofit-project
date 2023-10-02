// import { useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home'
import Info from './Components/Info'
import Signup from './Components/Signup'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  // async function getOrgs() {
  //   const res = await fetch('https://6510b7753ce5d181df5d78c0.mockapi.io/companies')
  //   const data = await res.json()

  //   console.log(data)
  // }

  return (
    
    <>

     <Router>
          <div>
            <nav className="top-nav">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/info">Info</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </nav>

            <Switch>

              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/info">
                <Info />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

            </Switch>
          </div>
      </Router>

      {/* <h1>The Non-Org Project</h1> */}
      {/* <button onClick={getOrgs}>click</button> */}
    </>
  )
}

export default App
