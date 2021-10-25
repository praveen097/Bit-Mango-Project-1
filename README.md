# PriceEstimator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5 for frontend, [STRAPI](https://strapi.io/) for backend

## Goal of the application

The main goal of this application is to take users through multiple sections and provide estimation to build a project

## Cloning Repository 

Run `git clone <git url of the repo>` on the local computer. This will clone the remote repository to your local system.

## Installing Required Packages

```
$cd frontend
$npm install
```
```
$cd backend
$npm install
```

This will automatically install all the utilized packages in the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Backend Server

* Run `npm run develop` for a dev server in the backend directory. The app will automatically reload if you change any of the source files.
* Navigate to `http://localhost:1331/`
* Login with given credentials for testing:
```
email: testuser123@test.com
password: Test321@
```


## Working of the application
<img src="https://github.com/praveen097/Bit-Mango-Project-1/blob/main/frontend/src/assets/Landing-Page.png"/>

In this application, user lands into  `HOME PAGE` where they will get some basic information about the application, they will get navigated to `QUESTIONS PAGE` when they click on `LET'S START` button.
Now in questions page, users
will get to see all the sections in `MAT TAB` where they can click on any sections to jump and answer them, else they can either choose to attempt the section by 
clicking `CONTINUE` or can `SKIP` the section.
<div><br><img src="https://github.com/praveen097/Bit-Mango-Project-1/blob/main/frontend/src/assets/Questions-Page-Information.png"/><br><div>
 
 If clicked on `CONTINUE`, they will get question by question of that particular section. 
<div><br><img src="https://github.com/praveen097/Bit-Mango-Project-1/blob/main/frontend/src/assets/Questions-Page.png"/><br><div>
 
If user completes answering 
all the questions of that section, then they will get navigated to `OVERVIEW PAGE`, where they can see the questions and the answers attempted by them. Now user 
can click on `NEXT SECTION` to move to next section. 
<div><br><img src="https://github.com/praveen097/Bit-Mango-Project-1/blob/main/frontend/src/assets/Overview-Page.png"/><br><div>
 
If user attempts all the section which are needed to them, then they will get navigated to `RESULTS PAGE` where 
user need to provide `EMAIL` and `COMPANY NAME` inorder to get `ESTIMATE` of their project, they will also get to see the `SUMMARY` of all the sections attempted by 
them.
<div><br><img src="https://github.com/praveen097/Bit-Mango-Project-1/blob/main/frontend/src/assets/Results-Page.png"/><br><div>

 
 ## Setting up cloud database
 
 We are using [MongoDB Atlas](https://cloud.mongodb.com/) to set up cloud database.
 * Sign in to ` https://cloud.mongodb.com/ `.
 * Create a cluster.
 * Click on `CONNECT`.
 * Grab HOST address. 
 * Open `backend/config/database.js` file.
 * Change `host` address, enable `srv, ssl` to `TRUE`.
 * Provide `database` name, `username, password`.
 
 ## Why mongoDB Atlas ?
 
 There are many advantages using cloud databases, 
 * Single database can be used for all types of devices even though application is running locally.
 * Works even if mongo is not installed locally.
 * Applications require reliable connections to the databases that power them, With built-in redundancy and 24/7 uptime, cloud databases offer a reliable platform for application development.
 * Ensures backup and recovery.
 * MongoDB can be used with any of the leading cloud service providers. If your business does move to another cloud service, MongoDB can easily move with you.
 
 ## Setting up local database ( optional )

To fetch data from backend, you require a database. In this application, you will work with `MongoDB`.

  * Install MongoDB server by installing [MongoDB Compass](https://www.mongodb.com/try/download/compass). This will also comes with a GUI which gives a clear view of how data is stored.

  * Open this application and have the mongodb server running on port number 27017.
  * To export all collections
 ```
 $mongodump -d database_name -o directory_to_store_dumps
 ```
 * To restore them
 ```
 $mongorestore -d database_name directory_backup_where_mongobd_to_be_restored
 ```
  
## Setting up Admin Console

Run `npm run develop` in the backend directory to setup a admin panel.Admin panel makes CRUD operations on the database more simpler by providing UI for them.

  * Once the server starts , Go to `http://localhost:1337`. This will load the home page of the admin panel.

  * Sign up as a New User and login to the admin panel.Now you can create your own content types and roles for other users.

## Adding New Sections and Questions 

- In the admin panel, You can find Collection types on the top-left.

  * To add a new section , click on Sections and Find the button `Add New Sections`.
  * In the same page, The questions related to that section can also be added. 
- Structure
  * sectionName (String)
  * sectionDescription (String)
  * questions (Component (repeatable))
    * multiple (boolean)
    * questionText (string)
    * options (Component (repeatable))
      * optionText (string)
      * minPrice (number)
      * maxPrice (number)
      * selected (boolean)

## Viewing Submissions

- In the admin panel, You can find Collection types on the top-left.

  * To view submissions, click on submissions. This will show a list of submissions and you can find the required submission.
  * click on it and check the questions attempted.
- Structure
  * email (Email)
  * lowerEstimate (Number)
  * upperEstimate (Number)
  * answeredQuestions (Component (repeatable))
    * multiple (boolean)
    * questionText (string)
    * options (Component (repeatable))
      * optionText (string)
      * minPrice (number)
      * maxPrice (number)
      * selected (boolean)
  
## Frontend and Backend connections
Front end and backend connections were made using the http requests and the host url is declared as a environment varibale
