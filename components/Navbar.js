import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
import {BsFillPlusCircleFill} from "react-icons/bs";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
    <Link href="/">
    <a className="flex title-font justify-center md:justify-start font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src="/iste.png" alt="" className='w-1/4 rounded-full'/>
      <span className="ml-3 text-7xl text-blue-700">ISTE</span>
    </a>
    </Link>
    
    <button className="inline-flex items-center text-xl  font-semibold text-blue-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0" onClick={() =>
              router.push(`/src/addProduct`)}>
    Add Products &nbsp;
    <BsFillPlusCircleFill/>  
    </button>
  </div>
</header>
  )
}

export default Navbar