import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { useSelector } from 'react-redux';


const Header = () => {

    const navigate = useNavigate();

    const { points, highestPoints } = useSelector((state) => state.game);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }, [navigate]);


    useEffect(()=>{

    },[handleLogout])

  return (
    <div className='bg-black text-white flex justify-between items-center h-[75px]'>
      <div className='m-4 text-black cursor-pointer text-[1.2rem] rounded-[5px] py-[5px] px-[10px] bg-cyan-300'>{highestPoints}</div>
      <div className='m-4 text-black cursor-pointer text-[1.2rem] rounded-[5px] py-[5px] px-[10px] bg-cyan-300'>{points}</div>
      <div onClick={handleLogout} className='m-4 text-black cursor-pointer text-[1.2rem] rounded-[5px] py-[5px] px-[10px] bg-cyan-300'>Logout</div>
    </div>
  )
}

export default Header
