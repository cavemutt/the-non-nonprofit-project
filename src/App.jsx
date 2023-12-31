import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Components/Home'
import Info from './Components/Info'
import Signup from './Components/Signup'
import Organizations from './Components/Organizations'
import Logo from './assets/non-nonprofit.png'
import './App.css'

function App() {

  const [apiData, setApiData] = useState([])

  const url = 'https://6510b7753ce5d181df5d78c0.mockapi.io/companies'
 
  const getData = async () => {
      const res = await fetch(url)
      const data = await res.json() 
      setApiData(data)
  }

  useEffect(() => {
      getData()
  },[])

  const path = (e) => {
    document.querySelector('.burger-menu').classList.remove('open')
    window.scrollTo(0, 0)

    if(e.target.className === 'logo') {
      console.log('home page!'); 
      e.target.parentElement.parentElement.offsetParent.className = 'nav'      
    } else if(e.target.href.endsWith('/orgs')) {
      console.log('org page!'); 
      e.target.parentElement.offsetParent.className = 'nav org-nav'
    } else if(e.target.href.endsWith('/info')) {
      console.log('info page!'); 
      e.target.parentElement.offsetParent.className = 'nav info-nav'
    } else if(e.target.href.endsWith('/signup')) {
      console.log('signup page!'); 
      e.target.parentElement.offsetParent.className = 'nav signup-nav'
    }
  }

  const burgerMenu = (e) => {
    const nav = document.querySelector('.nav')
    const navPosition = nav.offsetTop

    if(e.target.parentElement.lastChild.className === 'home-page') {
      window.scrollTo(0, navPosition)
    } else {
      nav.classList.toggle('open')
      document.querySelector('.burger-menu').classList.toggle('open')
    }
  }

  return (
    
    <>

     <Router>
          <div>
            <button className='burger-menu' role='button' onClick={(e) => burgerMenu(e)}>
              <div className='burger-line-1'></div>
              <div className='burger-line-2'></div>
              <div className='burger-line-3'></div>
            </button>
            <nav className="nav">
              <ul>
                <li>
                  <Link to="/" onClick={(e) => path(e)}><img src={Logo} className="logo"></img></Link>
                </li>
                <li>
                  <Link to="/orgs" className='button orgs-link' onClick={(e) => {path(e)}}>Help Out Now!</Link>
                </li>
                <li>
                  <Link to="/info" className='button info-link' onClick={(e) => path(e)}>How it Works...</Link>
                </li>
                <li>
                  <Link to="/signup" className='button signup-link' onClick={(e) => path(e)}>Sign Up Your Organization</Link>
                </li>
              </ul>
            </nav>
            

            <Switch>

              <Route path="/signup" onClick={(e) => path(e)}>
                <Signup getData={getData} apiData={apiData} />
              </Route>

              <Route path="/orgs" onClick={(e) => path(e)}>
                <Organizations getData={getData} apiData={apiData} />
              </Route>

              <Route path="/info" onClick={(e) => path(e)}>
                <Info />
              </Route>

              <Route exact path="/" onClick={(e) => path(e)}>
                <Home />
              </Route>

            </Switch>
          </div>
      </Router>

    </>
  )
}

export default App

// Next Steps :
// burger menu on smaller sizes on pages needed
// -- worked on, could be better --> look good on all device sizes
// local storage for hasLoadedBefore to control animations
// animations/parallax
// aria labels/accessibility checks
// scroll to update section on update button click
// dynamically displayed footer with however many photo credits needed

// on Signup page
// need to verify password with second entry
// need to hash password and store separately

// on Org page 
// - login popup to authenticate when update or delete is clicked 
// - action for forgot/reset password needed 

// the textarea and org displays need cleaning up, look neater 
// use a real database, real urls