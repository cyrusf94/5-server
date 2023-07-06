import React, { useEffect, useState } from 'react'

function AllBeers({ sessionToken }) {

    const [ beers, setBeers ] = useState([])

    const fetchBeers = () => {
        const url = "http://127.0.0.1:4000/api/allbeers"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application.json",
                "authorization": sessionToken
            })
        })
        .then(res => res.json())
        .then(data => setBeers(data.findAll))
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        fetchBeers()
    }, [])

    return (
        
        <>
        {beers.map((b, index) => (
            <div key={index}>
                <h1>{b.brand}</h1>
                <h1>{b.brewery}</h1>
                <h1>{b.country}</h1>
                <h1>{b.abv}</h1>
                <h1>{b.style}</h1>
                <h1>{b.size}</h1>
            </div>
        ))}
        </>
    )
}

export default AllBeers