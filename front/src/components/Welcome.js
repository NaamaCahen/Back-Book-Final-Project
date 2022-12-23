import React from 'react'
import {Link} from 'react-router-dom'

function Welcome() {
    return (
        <>
            <h1>Welcome</h1>
            <Link to='/login'>login</Link>
            <br/>
            <Link to='/register'>register</Link>
        </>

    )
}

export default Welcome