# Emory Connect Documentation

## Introduction

### Overview
Emory Connect is a collaborative platform designed to facilitate interaction and cooperation among users by allowing them to store, display, and share their projects. It incorporates a unique matching system based on user skills to help users find potential collaborators who have the needed competencies to make an efficient team to build projects.

### Purpose
The main goal of Emory Connect is to provide a medium for users in various sectors such as academia, professional industries, and personal hobbies to find and connect with collaborators. This is achieved by highlighting individual skills, thereby promoting effective networking and community engagement.

### Target Audience
Emory Connect is aimed at students, educators, researchers, professionals, and hobbyists who are seeking to collaborate on a wide range of projects, from academic research to personal and community initiatives.

## Using Emory Connect

### Accessing the Platform
Emory Connect is accessible through any modern web browser. Users can interact with the platform online without the need for local installations. Here are the steps to access the platform:

1. **Visit the Website**: Open your web browser and navigate to the Emory Connect website at `https://www.ecsconnectneazme.com/`.
2. **Sign In/Sign Up**: Users need to sign up for an account or log in if they already have one to access the platform's features.

### Navigating the Interface
Upon logging in, users will find the following main sections:

- **Home**: Provides a quick overview of ongoing projects and place to then add their projects as well as contributors.
- **Profile**: Here users can edit their profile that will be displayed to their matches and will also be able to add their skills.
- **Matches**: This section uses the platform's matching algorithm to suggest potential collaborators based on the skills by the user.
- **Skills**: Users can update their skills inventory and specify what skills they are looking to find in potential collaborators.
- **Friends**: Users can add their friends by username and once accepted view their friends profiles and projects



### Creating a Project
To create a new project:

1. Navigate to the `Projects` section.
2. Click on `Create New Project`.
3. Fill in the project details such as the title, description, URLS, and then once created add contributors by username.

### Adding Skills
To begin adding your skills:

1. Navigate to the 'Profile' page
2. There you will see your profile on one side and the view of your skills on the other
3. From their click add skills
4. There are 4 categories DB are skills related to databases Lang are programming-based languages Exp are skills related to different fields that one may have experience in and Pers are personal skills related to ones personal characteristics that describe their person 

### Start Matching
To Begin Matching:

1. To ensure the best matching be sure to have your profile fully updated along with skills
2. From there go to the 'Matching' page and on the loading page under the matching subcategory our matching algorithm will begin and present the User with their top 3 matches
3. From here you can send requests to that person to then match with them
4. Under the requests subcategory is where all match requests will display for you and others to then accept
5. Under the matches is where the people who have accepted your matches will display and their profile and contact information will display for you to contact and begin collaborating

### Adding Friends 
To begin adding friends:

1. Go to the 'Friends' page
2. From here all your friends will be displayed and you can click their names to view their profiles and then in their profile you can click view projects to view their projects along with collaborators
3. To get more friends simply click Find friends and search for users with their username and send requests by clicking the button next to their name to then send a friend request

   
## Technical Documentation
## PostgreSQL
We used a postgre database thats hosted on amazon RDS through our virutal enviornment and djangoproject settings we have the databases credentials for access to contributors. We utlized the SQLs eazy write and read functions through our models to create tables that correlted with each users credentials for easy retrieval for all of our apps
## Backend 

Our Backend is created on Django a python web framemwork that uses the model-template-views architecture and we all created one virtual environement that stores all requriements needed to begin making contributions

## Django_Proj
This is the main overview folder for our django project this is where all imports are stored like premade models as well as where we import our own apps and models to then use through URLS either localy hosted or online 

## Authentication
This is the first app created in our project it utilizes the django rest framework to creare a Usermodel that we can than manipulate to our needs.This app with its framework came with django and gives us the ability to allow users to make accounts and signin onto or servers through token based authentication that we give and all their info such as username is stored in our PostgreSQL database. 

## FriendsSystem
This is our friends app created inside our project. For this we created models 

## Matches 

## Skills 
This app is how we do the matching. We created a model thats user specific where each user has 2 skill section skills they have and skills their looking for. Each section has four array for the different skills categories. Through our model we make a serialize that allows users to add skills from our db of skills to each category and they can add and remove as they please to either section. Once they send or delete the skill we store it on the backend and then run our matching algorithim on those skills to return their matches 

## User projects 
This app is where we created a model that creates a one to many relationship with user projects. Here one user can create many projects. In the model we gave users 4 fields they can add to their project Title,Description,Github, and the contributors on it. Also in the background we store ids for each project that tie them to a user so we can retrieve each project for a user specifically. We use a serializer to then maniuplate the python to json how itll show on our frontend and how users will interact. 

## How Apps Work 
Above we explained how these apps works we created their models and serialziers of how they will be manipulated and then a view of how the forms will be displayed for users to send their inputs. With our apps all thats necearry to then get them up and running for interaction all we must do is create a URL that will be that apps URL for access that we can interact with either locslly or hosted and then import that into the main project folders settings and URLS and then we can acess them through our frontend 


## Frontend 

### System Architecture
Below is an architecture diagram illustrating the major components of Emory Connect and their interactions:

```mermaid
graph LR
  A[User] -->|Accesses| B[Vercel Hosted Frontend ecsconnectneazme.com]
    B -->|API Requests| C[AWS EC2 Hosted Django Backend ecsconnectbackend.com:8000]
    C -->|Read/Write| D[PostgreSQL Database]
    D -->|Responds with Data| C
    C -->|Returns Data| B
    B -->|Displays Data| A

    style A fill:#333,stroke:#fff,stroke-width:2px, color:#fff
    style B fill:#555,stroke:#fff,stroke-width:2px, color:#fff
    style C fill:#777,stroke:#fff,stroke-width:2px, color:#fff
    style D fill:#999,stroke:#fff,stroke-width:2px, color:#fff

