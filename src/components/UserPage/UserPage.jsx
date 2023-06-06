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
    <div className="container" style={{ textAlign: "center" }}>
      <h1> Safe Snacks </h1>
    <br />
      <h2>Welcome, {user.username}!</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
        <img src="/avatar/avatar.png" alt="Avatar" style={{ borderRadius: '50%', width: '200px', height: '200px' }} />
      </div>
    <br />
    <br />
      <h1 style={{ textAlign: "center" }}> Important Safety Information for Dogs</h1>
      <div style={{ marginBottom: "1rem", textAlign: "center", }}>
        <Typography style={{ fontSize: "18px" }}>
          <LocalCafeIcon /> Xylitol, a common sugar substitute found in various products like gum and peanut butter, can cause a rapid drop in blood sugar levels and liver damage, making it unsafe for dogs.
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          <LocalFloristIcon /> Certain plants such as lilies, azaleas, tulips, daffodils, and some ferns are toxic to dogs and can result in gastrointestinal problems, organ damage, or even be fatal if ingested.
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          <FavoriteIcon /> Grapes and raisins can cause kidney failure in dogs, leading to symptoms like vomiting, diarrhea, decreased appetite, and potentially life-threatening complications.
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          <EmojiFoodBeverageIcon /> Onions, garlic, chives, and other Allium family members are harmful to dogs as they can damage red blood cells and cause anemia or other health complications.
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          <WarningIcon /> Dogs should avoid chocolate and caffeine due to their toxicity, which can lead to severe health issues or death.
        </Typography>
      </div>

      {/* Add Dog  */}
      <Grid container spacing={2} justifyContent="center" style={{ paddingBottom: '60px' }} >
        <Grid item>
          <Link to="/newDog">
            <Button variant="contained" style={{ backgroundColor: "#00acb0", color: "#fff" }} className="btn">
              Add Dog
            </Button>
          </Link>
        </Grid>
      </Grid>

    </div>
  );
}

export default UserPage;

