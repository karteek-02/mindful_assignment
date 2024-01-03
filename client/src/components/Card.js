import React from 'react';

const Card = ({ user, deleteUser }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-[#f1f6fc] p-4 rounded-3xl shadow-md m-2">
      <h2 className="text-2xl mt-2 mb-4">{user.name}</h2>
      <p className="text-gray-600 font-semibold">Email: {user.email}</p>
      <p className="text-gray-600 font-semibold">Phone: {user.phone}</p>
      <button onClick={deleteUser} className="bg-gray-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded">Delete</button>
    </div>
  );
};


export default Card;
