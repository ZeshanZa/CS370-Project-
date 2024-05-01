# Emory Connect Documentation

## Introduction

### Overview


Emory Connect is a collaborative platform designed to facilitate interaction and cooperation among users by allowing them to store, display, and share their projects. It incorporates a unique matching system based on user skills to help users find potential collaborators who have the needed competencies to make an efficient team to build projects.

### Purpose

The main goal of Emory Connect is to provide a medium for computer science students to find and connect with collaborators. This is achieved by highlighting individual skills, thereby promoting effective networking and community engagement.

The main goal of Emory Connect is to provide a medium for computer science students to find and connect with collaborators. This is achieved by highlighting individual skills, thereby promoting effective networking and community engagement.

### Target Audience

Emory Connect is mostly aimed at students who are seeking to collaborate on a wide range of projects, from academic research to personal and community initiatives.

Emory Connect is mostly aimed at students who are seeking to collaborate on a wide range of projects, from academic research to personal and community initiatives.

## Using Emory Connect

### Accessing the Platform


Emory Connect is accessible through any modern web browser. Users can interact with the platform online without the need for local installations. Here are the steps to access the platform:

1. **Visit the Website**: Open your web browser and navigate to the Emory Connect website at `https://www.ecsconnectneazme.com/`.
2. **Sign In**: Users can sign in if they already have one to access the platform's features.
3. **Sign Up**: Users can sign up by clicking the `Switch to Sign Up` button. Upon making an account, they will be guided through a tutorial to introduce them to the interface.

### Navigating the Interface


Upon logging in, users will find the following main sections:

- **Home**: Provides a quick overview of ongoing projects where user can add their projects and contributors.
- **Profile**: Here users can edit their profile and also add their skills, which will be displayed to their matches.
- **Matches**: This section uses the platform's matching algorithm to suggest potential collaborators based on the skills of the user.
- **Home**: Provides a quick overview of ongoing projects where user can add their projects and contributors.
- **Profile**: Here users can edit their profile and also add their skills, which will be displayed to their matches.
- **Matches**: This section uses the platform's matching algorithm to suggest potential collaborators based on the skills of the user.
- **Skills**: Users can update their skills inventory and specify what skills they are looking to find in potential collaborators.
- **Friends**: Users can add their friends by username. Once accepted, they can view their friends' profiles and projects.

### Creating a Project


To create a new project:

1. Navigate to the `Projects` section.
2. Click on `Create New Project`.
3. Fill in the project details such as the title, description, URLS, and then once created add contributors by username.

### Adding Skills


To begin adding your skills:

1. Navigate to the `Profile` page.
2. There you will see your profile on one side and the view of your skills on the other.
3. From their click `Add skills`.
4. There are 4 categories: DB are skills related to databases, Lang are programming-based languages, Exp are skills related to different fields that one may have experience in, and Pers are personal skills.
1. Navigate to the `Profile` page.
2. There you will see your profile on one side and the view of your skills on the other.
3. From their click `Add skills`.
4. There are 4 categories: DB are skills related to databases, Lang are programming-based languages, Exp are skills related to different fields that one may have experience in, and Pers are personal skills.

### Start Matching


To Begin Matching:

1. To ensure the best matching be sure to have your profile fully updated along with skills.
2. From there go to the 'Matching' page and on the loading page under `Find Matches`, our matching algorithm will begin and present the user with their top 3 matches.
3. From here you can send requests to that person to then match with them.
4. `Pending Matches` is where all match requests will display for you to accept.
5. `Matched Profiles` is where the people who have accepted your matches will display. Their profile and contact information will also display for you to contact and begin collaborating.

### Adding Friends

To begin adding friends:

1. Go to the 'Friends' page.
2. From here all your friends will be displayed and you can click their names to view their profiles. Then in their profile, you can click `view projects` to view their projects along with collaborators.
3. To get more friends simply click `Find friends` and search for users with their username and send requests by clicking the button next to their name to then send a friend request.

1. Go to the 'Friends' page.
2. From here all your friends will be displayed and you can click their names to view their profiles. Then in their profile, you can click `view projects` to view their projects along with collaborators.
3. To get more friends simply click `Find friends` and search for users with their username and send requests by clicking the button next to their name to then send a friend request.

## Technical Documentation
## Backend Hosting 
The backend is hosted on an EC2 instance with an established SSL certificate for the backend domain (ecsconnectbackend.com), and is updated regularly in accordance with commits related to the backend. The domain is registered under GoDaddy but the name servers have been changed to point to the EC2 instance's address and necessary AWS servers. In order for this to work with the django server, this uses a combination of nginx and an open source package (django-sslserver) on port 8000 to allow https traffic using that SSL cert. The certificate is kept locally on this instance to maintain the security of the fullchain and key information.

## Frontend Hosting 
Our Project utilizaed Next.js for the frontend this gave us a easy transition into hosting on the web with Vercel. Vercel allows hosting for Next.js simply by connecting to our Github Repo and Frontend Folder and renders the entire project and updates automatically with commits to the frontend
## PostgreSQL

We used a Postgre database that's hosted on Amazon RDS through our virtual environment and Djangoproject settings where we have the database's credentials for access to contributors. We utilized the SQLs eazy write and read functions through our models to create tables that correlated with each user's credentials for easy retrieval for all of our apps.

## Backend

Our Backend is created on Django a Python web framework that uses the model-template-views architecture and we all created one virtual environment that stores all requirements needed to begin making contributions

### How Apps Work

Each major Django component would be considered an app. The necessary components for a functioning app include a URL specific to each app to access. This URL can be used for interaction either locally or when hosted. Afterwards, these URLs can be imported into the main project folder's settings and URLs. This enables access to the apps through the frontend. The following are our Django apps: Django_Proj, Authentication, FriendsSystem, Skills, User Projects, and Matches. 


### Django_Proj

This is the main overview folder for our Django project this is where all imports are stored like premade models as well as where we import our own apps and models to then use through URLS either locally hosted or online

### Authentication

This is the first app created in our project it utilizes the Django rest framework to create a Usermodel that we can then manipulate to our needs. This app with its framework came with Django and gives us the ability to allow users to make accounts and sign in to our servers through token-based authentication that we give and all their info such as username is stored in our PostgreSQL database.

### Matches

This app includes all the functionality to matching: send matches, decline matches, store deleted matches (so that a user doesn't get them again) and view match requests. A Match model was created to store every current match with the status of either "accepted" or "declined." Through this model, a serializer is created which allows the creation of each match instance. 

### FriendsSystem

This is our friends app created inside our project. This app includes the following major functionalities: send friend request, decline friend request, remove friend, and view friend request. A Friend model was created to store each friend instance. Another model called Friend requests was created to store user's existing friend request.  

### Skills

This app is how we do the matching. We created a model that's user-specific where each user has 2 skill sections: skills they have and skills they're looking for. Each section has four arrays for the different skill categories. Through our model, we make a serialize that allows users to add skills from our db of skills to each category and they can add and remove as they please to either section. Once they send or delete the skill we store it on the backend and then run our matching algorithm on those skills to return their matches.

### User projects

This app is where we created a model that creates a one-to-many relationship with user projects. Here one user can create many projects. In the model, we gave users 4 fields they can add to their project Title, Description, Github, and the contributors on it. Also in the background, we store IDs for each project that tie them to a user so we can retrieve each project for a user specifically. We use a serializer to then manipulate the Python to json how it shows on our frontend and how users will interact.

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
 

    style A fill:#f9f,stroke:#fff,stroke-width:2px, color:#fff
    style B fill:#ccf,stroke:#fff,stroke-width:2px, color:#fff
    style C fill:#cfc,stroke:#fff,stroke-width:2px, color:#fff
    style D fill:#fcf,stroke:#fff,stroke-width:2px, color:#fff

```
