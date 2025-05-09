import React from 'react';
import { Accept } from './button';

const Approved = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-white w-full shadow-lg rounded-xl p-4 m-auto'>
              <div>
              <svg 
                viewBox="0 0 24 24"
                className="w-20 h-20 text-main-green"
                xmlns="http://www.w3.org/2000/svg"
                >
                <polyline 
                    points="21 5 12 14 8 10" 
                    fill= "transparent" 
                    stroke= "#39B54A" 
                    strokeLinecap="round" 
                    strokeLinejoin= "round" 
                    strokeWidth= "2.3"
                />
                <path 
                    d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16" 
                    fill= "none" 
                    stroke= "#39B54A" 
                    strokeLinecap="round" 
                    strokeLinejoin= "round" 
                    strokeWidth= "2.3"
                />
                </svg>
                </div>
                <div>
                    <h1 className="text-2xl text-center text-tertiary-green font-bold mt-4">
                    The client has approved the invoice
                    </h1>
                    <p className="text-gray-500 mt-2">
                    The manager will proceed with assigning drivers and
                    vehicles to complete the request
                    </p>
                </div>
                <div className="flex justify-center mt-4 w-[20%]">
                    <Accept label="View Invoice" onClick={() => console.log("Invoice viewed")} />
                    </div>
                
            
        </div>
    );
};

export default Approved;