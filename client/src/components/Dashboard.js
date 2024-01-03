import React, { useState, useEffect } from 'react';
// import UserCard from './Card';
import axios from 'axios';
import Search from './Search';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup
  const [inputValues, setInputValues] = useState({ name: '', email: '', phone: '' }); // New state for holding the input values

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/addedUsers')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  // Add this function inside your Dashboard component
  // const handleDeleteUser = (userId) => {
  //   axios.delete(`http://localhost:5000/api/addedUsers/${userId}`)
  //     .then(response => {
  //       // Filter out the deleted user
  //       const updatedUsers = users.filter(user => user._id !== userId);
  //       setUsers(updatedUsers);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setError(error.message);
  //     });
  //  };

  const handleUpdateUser = (userId, updatedUserData) => {
    axios.put(`http://localhost:5000/api/addedUsers/${userId}`, updatedUserData)
      .then(response => {
        // Update the user in the state
        const updatedUsers = users.map(user => user._id === userId ? response.data.user : user);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSaveClick = () => {
    axios.post('http://localhost:5000/api/addedUsers', inputValues)
      .then(response => {
        setUsers([...users, response.data.user]);
        setShowPopup(false);
      })
      .catch(error => {
        console.error(error.response.data); // Log error.response.data instead of error
        setError(error.message);
      });
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* <h1>Users</h1> */}
      <div className="flex justify-between items-center p-6">
        {/* <h1>Added Users</h1> */}
        <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white" onClick={() => setShowPopup(true)}>Add User</button>
        <button onClick={handleLogout} className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-red-700">Logout</button>
      </div>
      <div className="flex items-center space-x-4">
        <Search cards={users} setCards={setUsers} />
      </div>
      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add User
                    </h3>
                    <div className="mt-2">
                      <input type="text" name="name" value={inputValues.name} onChange={handleInputChange} placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <input type="email" name="email" value={inputValues.email} onChange={handleInputChange} placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <input type="tel" name="phone" value={inputValues.phone} onChange={handleInputChange} placeholder="Phone Number" className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSaveClick} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={handleCancelClick} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      <div className="flex flex-wrap justify-around">
        {/* {users.length > 0 ? (
          users.map(user => (
            <UserCard key={user._id} user={user} deleteUser={() => handleDeleteUser(user._id)} />
          ))
        ) : (
          <p>No users added</p>
        )} */}
      </div>
    </div>
  );
}

export default Dashboard;
