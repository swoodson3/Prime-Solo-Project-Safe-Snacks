# Safe Snacks Pet App

## About The Project
The Safe Snacks application is designed to assist pet owners in making informed choices about the treats they give to their beloved dogs. This app offers a user-friendly platform to access a vast database of safe and potentially harmful foods and plants for dogs. Not only can users discover what treats are suitable for their furry companions, but they can also build a customized list of their dog's favorite snacks for quick reference. The app aims to ensure the safety and satisfaction of dogs by providing essential information to their owners.

## Purpose of the Application
The Safe Snacks app addresses the genuine concern of pet owners who want to offer their dogs treats that are both delicious and safe. By providing a comprehensive database of foods and plants, the app assists users in making well-informed decisions, reducing the risk of inadvertently giving their pets harmful treats.

The personalized list feature of the app allows users to curate a collection of their dog's preferred snacks. This not only enhances convenience but also reinforces the bond between pets and their owners by ensuring a constant supply of treats that both parties enjoy.

## Key Features
Extensive Database: Access a wealth of information about foods and plants that are safe for dogs, as well as those that pose potential risks.

Personalized List: Create a customized list of your dog's favorite snacks, making treat selection a breeze.

User-Friendly Interface: Enjoy a seamless and intuitive experience while navigating the app and discovering new treats.

## Prerequisites
Before you begin, ensure that the following software is installed on your computer:


- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)



Technology Stack
- [![React][react.js]][react-url]
- [![Redux][redux.js]][redux-url]
- [![Redux-Saga][redux-saga.js]][redux-saga-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- [![Material-UI][material-ui]][material-ui-url]
- [![Express][express.js]][express-url]
- [![Node][node.js]][node-url]
- [![React-Router][react-router]][react-router-url]
- [![Heroku][heroku]][heroku-url]
- [![NPM][npm]][npm-url]

  
## Setup Instructions
Run npm install.
Create a .env file at the project's root and include the following lines:
make file
Copy code
SERVER_SESSION_SECRET=superDuperSecret
AWS_ACCESS_KEY_ID=EnterYourAccessKeyID
AWS_SECRET_ACCESS_KEY=EnterYourSecretAccessKey
AWS_REGION=EnterYourRegion
Make sure to replace superDuperSecret with a strong, random string for enhanced security.

Start PostgreSQL if it's not running using brew services start postgresql.
Run npm run server.
Run npm run client.
Open your web browser and go to localhost:3000.
Production Build
Before deploying to Heroku, create a production build using npm run build in the terminal. This will generate a build folder containing the code that Heroku will host. You can preview the build with npm start.

Start PostgreSQL if needed: brew services start postgresql.
Run npm start.
Visit localhost:5042 in your browser to preview the production build.
Deployment
Create a new Heroku project.
Link the Heroku project to the GitHub repository.
Set up a Heroku Postgres database and connect it from Postico.
Create required tables.
Add an environment variable for SERVER_SESSION_SECRET for security.
In the deployment section, select manual deploy.

## Conclusion
Introducing Safe Snacks, the ultimate app for pet owners who prioritize their dog's well-being. With Safe Snacks, you can confidently choose treats, knowing they're safe for your furry friend. Experience peace of mind and keep your dog satisfied with Safe Snacks!

Created by Seth Woodson. 



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[redux-saga.js]: https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999
[redux-saga-url]: https://redux-saga.js.org/
[material-ui]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[material-ui-url]: https://mui.com/
[heroku]: https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white
[heroku-url]: https://heroku.com
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://react-router.js.org/
