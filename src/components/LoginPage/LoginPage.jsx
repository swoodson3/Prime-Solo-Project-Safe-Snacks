import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <Grid margin={5}>
        <Typography variant="h6">
          Introducing Safe Snacks, the must-have app for any pet owner concerned about their dog's
          safety. With Safe Snacks, you can easily find safe treats for your furry friend
          while avoiding poisonous foods and plants. Our app provides a comprehensive database of foods
          and plants that are safe for dogs to eat, as well as those that are potentially harmful.
          You can also add your dog's favorite treats to your personalized list for easy access.
          With Safe Snacks, you can have peace of mind knowing that your dog is always safe
          and satisfied!"
        </Typography>
      </Grid>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
