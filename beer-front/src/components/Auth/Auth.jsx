import React, { useState } from 'react'
import './Auth.css'

function Auth({ updateLocalStorage }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)

    const register = () => login ? null : (
        <>
        <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter full name'
        />
        </>
    )

    const toggle = () => {
        setLogin(!login)
        setName("")
        setEmail("")
        setPassword("")
    }

    const toggleBtn = () => login ? "Sign Up" : "Login"

    const handleSubmit = e => {
        e.preventDefault()

        const url = login   
            ? "http://127.0.0.1:4000/auth/login"
            : "http://127.0.0.1:4000/auth/register"

        const body = login
            ? {email, password}
            : {name, email, password}

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => updateLocalStorage(data.token))
        .catch(err => console.log(err))
    }

    return (
        <>
        <form action="" className="form-wrapper">
            {register()}
            <input 
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <input 
                type="password"
                name="password"
                id="pwd"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <button onClick={handleSubmit}>Go</button>
        <p onClick={toggle} id='register'>{toggleBtn()}</p>
        </form>
        </>
    )
}

export default Auth