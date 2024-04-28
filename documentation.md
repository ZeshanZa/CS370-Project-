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

### System Architecture
Below is an architecture diagram illustrating the major components of Emory Connect and their interactions:

```mermaid
graph LR
    A[Web Browser] --> B[Next.js Frontend]
    B --> C[Django Backend]
    C --> D[Database]
    D --> C
    C --> B
    B --> A

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#cfc,stroke:#333,stroke-width:2px
    style D fill:#fcf,stroke:#333,stroke-width:2px

