const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dogsRouter = require('./routes/dogs.router');
const dangerousFoodsRouter = require('./routes/dangerous.foods.router');
const dangerousPlantsRouter = require('./routes/dangerous.plants.router');
const foodRouter = require('./routes/food.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/dogs', dogsRouter);
app.use('/api/dangerousfoods', dangerousFoodsRouter);
app.use('/api/dangerousplants', dangerousPlantsRouter);
app.use('/api/food', foodRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5007;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
