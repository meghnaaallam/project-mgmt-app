const express = require('express');
const colors = require('colors');
const path = require('path');
const cors = require('cors');
const schema  = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql');
const connectDB = require('../server/config/db');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



const port = process.env.PORT;
const app =express();

console.log(process.env.PORT)
//connect to mongodb
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({ schema ,
graphiql: process.env.NODE_ENV === 'development'}));

app.listen(port,console.log(`server running on port ${port}`));