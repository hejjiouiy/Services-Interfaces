import React from 'react';
import Button, { Accept, Refuse } from './button';

const Card = () => {
  return (
    <div className="flex w-full p-4 m-auto items-center">
    <div className="bg-soft-gray rounded-lg h-14 w-12 flex flex-col justify-center items-center">
      <span className="text-white text-xs leading-tight mb-0">May</span>
      <span className="text-white text-2xl font-bold leading-none">21</span>
    </div>
    
    <div className="grid grid-cols-[auto_auto_4fr_1fr] gap-4 bg-white rounded-lg p-4 ml-4 w-full shadow-md">
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvb2R8ZW58MHx8fHwxNjg5NTY1NzA3&ixlib=rb-4.0.3&q=80&w=400"
          alt="food"
          className="rounded-lg h-24 w-24 object-cover"
        />
      </div>
  
      <div className="flex flex-col text-left m-auto justify-center">
        <span className="text-lg uppercase ">Hicham Ipsum</span>
        <span className=" text-darker-beige">36 mins ago.</span>
      </div>
  
      <div className="flex items-center">
        <p className="text-soft-gray text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, excepturi sapiente. Quae iusto voluptates placeat recusandae dolor quo voluptate accusantium ipsa! Fugit, ea. Provident, id facere voluptatem voluptates delectus et qui. Tempore dicta consequuntur quia minus ducimus rem quam, recusandae, doloremque facere velit sint quas voluptate quo. Quis, fuga expedita.
        </p>
      </div>
  
      <div className="flex flex-col space-y-1 justify-center">
        <Accept label={"Accept"} onClick={() => alert("done")} />
        <Refuse label={"Refuse"} onClick={() => alert("done")} />
      </div>
    </div>
  </div>
  
  );
};

export default Card;