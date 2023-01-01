import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo/logobg.png'

function Welcome() {
    return (
        <>
            <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
                <img src={logo} alt='logo' />
                <div className='flex justify-center '>
                    <Button className='m-5' gradientDuoTone='purpleToBlue'><Link className='text-xl font-bold ' to='/login'>login</Link></Button>
                    <Button className='m-5' gradientDuoTone='purpleToBlue'><Link className='text-xl font-bold ' to='/register'>register</Link></Button>
                </div>

            </div>

        </>

    )
}

export default Welcome