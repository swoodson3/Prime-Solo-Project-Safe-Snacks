import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { lightBlue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}> Safe Snacks </h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      {/* Search Bar */}
      <input type="text" placeholder="Search" />
      <button>Search</button>

      {/* Filter Button */}
      <input type="text" placeholder="Filter" />
      <button>Filter</button>

      {/* Add Dog */}
      <Link to="/dogs">
        <button>Add Dog</button>
      </Link>
      

      {/* Favorites */}
      <h3>Favorites:</h3>
      {/* Display favorite treats here */}

      {/* Featured Treats */}
      <h3>Featured Treats:</h3>
      {/* Display featured treats here */}

      {/* Recent Activity Feed */}
      <h3>Recent Activity:</h3>
      {/* Display recent activity feed here */}

      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;

