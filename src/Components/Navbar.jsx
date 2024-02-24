import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-[#344955] text-white py-5'>
        <div className="logo font-bold mx-3">
            <span className='font-bold text'>Todo-List</span>
        </div>
        
        <ul className='flex gap-8 mx-3'>
            <li className='cursor-pointer hover:font-semibold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-semibold transition-all duration-75'>About Us</li>
        </ul>
    </nav>
  )
}

export default Navbar
