import React from 'react';


const RecentConversions = () => {
  return (
    <div className="mt-4 p-4 bg-darkBlue text-white rounded-lg text-center">
      <h3 className="text-xl font-bold">Recent Conversions</h3>
      <div className="space-y-2">
        <div className='flex justify-around items-center'>  $100</div>   <span>84 EUR</span>
        <li className='flex justify-around items-center'>$100   <span>84 EUR</span></li>
        <li className='flex justify-around items-center'>$100   <span>84 EUR</span></li>
        <li className='flex justify-around items-center'>$100   <span>84 EUR</span></li>

      </div>
    </div>
  );
};

export default RecentConversions;
