import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [name,setName]= useState();
    useEffect(()=>{ 
        checklogin();
    },[]);
    const checklogin =async ()=>{
        const res = await axios.get(`http://localhost:3000/auth/getUser`, {
            headers: {
              "Content-type": "application/json",
              "auth-token": localStorage.getItem("userToken"),
            },
          });
          console.log(res);
        setName(res.data?.name);
    }
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <p class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU" class="h-12" alt="Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Notes</span>
        </p>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto mr-20" id="navbar-default">
            <p className='text-xl font-medium'>Hello! {name}</p>
        </div>
    </div>
    </nav>
  )
}

export default Navbar