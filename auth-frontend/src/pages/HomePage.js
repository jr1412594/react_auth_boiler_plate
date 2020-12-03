import React from 'react'

export default function HomePage(props) {
    return (
        <div>
           <h2>Welcome!{props.user.first_name}</h2>
        </div>
    )
}
