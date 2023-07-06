import { useEffect, useState } from 'react'
import Auth from './components/Auth/Auth'
import AllBeers from './components/AllBeers/AllBeers'
import './App.css'

function App() {

  const [sessionToken, setSessionToken] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  })

  const updateLocalStorage = newToken => {
    // get token from response and set it to the browser
    localStorage.setItem("token", newToken)

    setSessionToken(newToken)
  }

  const handleView = () => {
    return !sessionToken
      ? <Auth updateLocalStorage={updateLocalStorage} />
      : <AllBeers sessionToken={sessionToken} />
  }

  const logout = () => {
    localStorage.clear()
    setSessionToken(undefined)
  }

  return (
    <>
    <button onClick={logout}>Logout</button>
    {console.log(sessionToken)}
    {handleView()}
    </>
  )
}

export default App
