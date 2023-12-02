# Social-Network-API

## Recording of app

## Project Description
Below is the user and acceptance criteria for this assignment. Using Mongoose, this project is builds routes for a back-end social network. In the network, each User has thoughts, a friends list, and the option to have other people comment on the user's thoughts. Routes were then created for each functionality and controllers were added to follow clean code practices. 


## User Story 
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


## How to use the project
This project uses Mongoose and Express. After running "npm i" in the terminal, use "npm start" to start the application. To test the routes, go to the routes folder to see the "user" and "thoughts" routes. Each of these routes can be tested using Postman. 

## Credits
Links used:
1) NU Curriculum and the virtual tutor when I got stuck.
2)  Validation for Mongoose lowercase to deal with uppercase sensistivity: https://stackoverflow.com/questions/39904244/add-property-to-mongoose-document-pre-lowercase-validation
3) difference between $push and $addtoset: https://stackoverflow.com/questions/27248556/mongodb-difference-between-push-addtoset
4) validator and expression for validating email: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

## License

This project is under the MIT license

## How to Contribute to the Project

As I am still a student learning how to code, all contributions are welcome for this project. The criteria would be to use Mongoose and Express and keep it to best practices using back-end development. 

## Contact me
Name: Jessica Justmann
email: mj.justmann@gmail.com
github: mjjust31