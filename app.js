const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoDB = require('./config/db');
const Schema = require('./graphql/schema/index')
const Resolvers = require('./graphql/resolvers/index')
const cors = require('cors')
const isAuth = require('./utils/isAuth')
const dotenv = require('dotenv')
//express instance
const app = express();
dotenv.config();

//parse incomming json data
app.use(express.json());
app.use(cors())

//database
mongoDB();

app.use(isAuth);


app.use('/graphql' , graphqlHTTP({
    //inside buildschema we design our models

    //the type Query is the main object here 
    //which bind all queries together

    //the type are for checking purpose
    //what type of data we want from the type
    schema : Schema,
    rootValue: Resolvers,
    graphiql : true
}))


app.listen(5000 , () => console.log('running'));

//