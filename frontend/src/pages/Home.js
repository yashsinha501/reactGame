import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Game from './Game'


function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])



    return (
        <div>
            <Header/>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <Game/>
            <ToastContainer />
        </div>
    )
}

export default Home
