import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <Grid margin={5}>
        <Typography variant="h6">
          Introducing Safe Snacks or Treats, the must-have app for any pet owner concerned about their dog's
          safety. With Safe Snacks or Treats, you can easily find safe treats for your furry friend
          while avoiding poisonous foods and plants. Our app provides a comprehensive database of foods
          and plants that are safe for dogs to eat, as well as those that are potentially harmful.
          You can also add your dog's favorite treats to your personalized list for easy access.
          With Safe Snacks or Treats, you can have peace of mind knowing that your dog is always safe
          and satisfied!"
        </Typography>
      </Grid>

      <Grid container direction='column'>
        <Grid container justifyContent='center'>
          <Typography variant="h4">
            Technologies Used:
          </Typography>
        </Grid>
        <Grid container justifyContent='center'>
          <Typography variant="h6">
            <ul>
              <li>
                <a href="https://reactjs.org/">React</a>
              </li>
              <li>
                <a href="https://redux.js.org/">Redux</a>
              </li>
              <li>
                <a href="https://redux-saga.js.org/">Redux-Saga</a>
              </li>
              <li>
                <a href="https://nodejs.org/en/">Node.js</a>
              </li>
              <li>
                <a href="https://www.postgresql.org/">PostgreSQL</a>
              </li>
              <li>
                <a href="https://www.passportjs.org/">Passport (Authorization)</a>
              </li>
              <li>
                <a href="https://expressjs.com/">Express.js</a>
              </li>
              <li>
                <a href="https://mui.com/">Material UI</a>
              </li>
              <li>
                <a href="https://www.heroku.com/">Heroku</a>
              </li>

            </ul>
          </Typography>
        </Grid>
      </Grid >
      <Grid container justifyContent='center'>
      <Typography variant="h4">
        Acknowledgements
      </Typography>
      </Grid>
      <Grid margin={5}>
        <Typography variant="h6">

          I want to thank Prime for this amazing opportunity
          and my cohort for being helpful with everything we have been through together.
          I would also like to thank Marc and Chris for teaching us everything we have learned so far. 
          Thank you all for listening!


        </Typography>
      </Grid>
    </>
  );
}

export default AboutPage;
