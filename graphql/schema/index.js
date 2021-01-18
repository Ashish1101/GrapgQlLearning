//this is the entry point for the graphql

const {buildSchema} = require('graphql');
module.exports = buildSchema(`
       type User {
           _id : ID!
           email : String!
           password : String
           date : String!
           tasks : [Task!]
           msg: String!
       }

    
       type Task {
        _id : ID!
        title : String!
        details : String!
        user : User
        msg : String!
        date : String!
       }

       input userInput {
           email : String!
           password : String!
       }

       input taskInput {
           title : String!
           details : String!
       }


       type Query {
           readUsers : [User!]!
           user(age : Int!): [User!]
           tasksByUser(_id : String!) : User!
       }

       type AuthData {
           token: String!
           msg: String!
           userId : ID!
       }

       type deleteTask {
           msg: String!
           title: String!
           _id : ID!
       }

       type Mutation {
           login(email:String! , password:String!) : AuthData!
           addUser(email : String! , password : String!) : User
           deleteUser(_id: ID!) : User
           updateUser(input : userInput) : User
           createTask(title:String! , details:String!) : Task!
           deleteTask(_id:ID! , userId:ID!): deleteTask!
       }
    `)