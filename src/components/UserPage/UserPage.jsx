import React from 'react';
import { useSelector } from 'react-redux';
import { lightBlue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}> Safe Snacks </h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h1 style={{ textAlign: "center" }}> Important Safety Information for Dogs</h1>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <Typography>
          <LocalCafeIcon /> Xylitol, a common sugar substitute found in various products like gum and peanut butter, can cause a rapid drop in blood sugar levels and liver damage, making it unsafe for dogs.
        </Typography>
        <Typography>
          <LocalFloristIcon /> Certain plants such as lilies, azaleas, tulips, daffodils, and some ferns are toxic to dogs and can result in gastrointestinal problems, organ damage, or even be fatal if ingested.
        </Typography>
        <Typography>
          <FavoriteIcon /> Grapes and raisins can cause kidney failure in dogs, leading to symptoms like vomiting, diarrhea, decreased appetite, and potentially life-threatening complications.
        </Typography>
        <Typography>
          <EmojiFoodBeverageIcon /> Onions, garlic, chives, and other Allium family members are harmful to dogs as they can damage red blood cells and cause anemia or other health complications.
        </Typography>
        <Typography>
          <WarningIcon /> Dogs should avoid chocolate and caffeine due to their toxicity, which can lead to severe health issues or death.
        </Typography>
      </div>

      {/* Add Dog  */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link to="/newDog">
            <Button variant="contained" style={{ backgroundColor: "#00acb0", color: "#fff" }} className="btn">
              Add Dog
            </Button>
          </Link>
        </Grid>
      </Grid>


      {/* Search Bar */}
      {/* <input type="text" placeholder="Search" />
      <button>Search</button> */}

      {/* Filter Button */}
      {/* <input type="text" placeholder="Filter" />
      <button>Filter</button> */}

      {/* Favorites */}
      {/* <h3>Favorites:</h3> */}
      {/* Display favorite treats here */}

      {/* Featured Treats */}
      {/* <h3>Featured Treats:</h3> */}
      {/* Display featured treats here */}

      {/* Recent Activity Feed */}
      {/* <h3>Recent Activity:</h3> */}
      {/* Display recent activity feed here */}

    </div>
  );
}

export default UserPage;

