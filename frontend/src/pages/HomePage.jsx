import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <header>
            <nav className ="navbar navbar-light bg-primary">
            <div className ="container">
                <Link to="/" className ="navbar-brand">CoffeePOS</Link>
            </div>
            </nav>
        </header>
        <main>
            <div className='container mt-3'>
                <div className='bg-light p-5 mt-4 rounded-3'>
                    <h1>Welcome to the POS for coffee menu</h1>
                    <p>small menu with six common drink at a typical cafe</p>
                    <Link to='/pos' className='btn btn-primary'>Click here to see menu</Link>
            </div>
            </div>
        </main>
    </div>
  )
}

export default HomePage