
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({ children }) {
  return (
    <div>
      <header>
        {/* Updated navbar with a warm brown theme */}
        <nav className="navbar" style={{ backgroundColor: '#6b4f4b' }}>
          <div className="container">
            <Link to="/" className="navbar-brand" style={{ color: '#f8f1e7' }}>BrewPoint</Link>
          </div>
        </nav>
      </header>
      <main>
        <div className='container mt-3'>
          {children}
        </div>
        <ToastContainer/>

      </main>
    </div>
  )
}

export default MainLayout;
