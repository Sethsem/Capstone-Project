import React from 'react';

const Header = () => {
  return (
    <div  className='bg-black h-20'>
      <header className="bg-black text-white  shadow-md flex justify-evenly pt-6 border-b-indigo-500

">
        <h1 className=" ">Seth</h1>
        <ul className='flex gap-8'>
        <li>
          Rates
        </li>
        <li>
          API
        </li>
        <li>
          Webhooks
        </li>
        <li>
          Triggers
        </li>
      </ul>
      </header>
      <hr className='bg-white mt-6'></hr>
    </div>
  );
};

export default Header;
