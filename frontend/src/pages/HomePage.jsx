import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
    <MainLayout>
        <div className='bg-light p-5 mt-4 rounded-3'>
                    <h1>Welcome to BrewPoint: Your Specialty Coffee POS Solution</h1>
                    <p>Featuring a Streamlined Selection of Six Classic Café Favorites!</p>
                    <Link to='/pos' className='btn btn-primary'>Click Here to Order</Link>
            </div>
    </MainLayout>
  )
}

export default HomePage