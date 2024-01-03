import React, { useState } from 'react';
import UserCard from './Card';
import axios from 'axios';

const Search = ({ cards, setCards }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:5000/api/addedUsers/${userId}`)
            .then(response => {
                // Filter out the deleted user
                const updatedUsers = users.filter(user => user._id !== userId);
                setUsers(updatedUsers);

                const updatedCards = cards.filter(card => card._id !== userId);
                setCards(updatedCards);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    };

    return (
        <div className="flex flex-col space-x-20">
            <div className="mb-4 ml-72">
                <input
                    className='ml-40 p-2 border rounded-md w-full max-w-xs'
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap justify-around">
                {filteredCards.map(user => (
                    <UserCard key={user._id} user={user} deleteUser={() => handleDeleteUser(user._id)} />
                ))}
            </div>
        </div>
    );
};

export default Search;
