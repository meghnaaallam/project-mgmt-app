## GraphQL Server with Express

We will host our  backend Graphql server using Express
First, we'll create a folder called server, which will container the express and graphql schema code, along with other things

### Express app setup


### GraphQL Setup
Install graphql-express and graphql dependencies. 
First you need to install express-graphql and then graphql

`npm i -S express-graphql graphql`

In the `app.js` file:

Bind express with graphql.

```js
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP({}));
```
In the `graphqlHTTP` function, we're passing an empty object for now. Later, we will send the graphql schema into this object.


### GraphQL schema

The graph which defines how the data is to be strucutred is written in the schema.

For this, we'll make another folder called `schema/`, in which we'll add a `schema.js` file:

```js
const graphql = require('graphql);

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//schema object

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

```


## Root Query

The root query is the one via which the API will get the entry point to fetch the data from the db with graphql as the middleware.

So, in the `schema.js` file, add the following root query:

```js
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
       clients: {
          type: new GraphQLList(ClientType),
          resolve(parent, args) {
                   //code to get data from db/source
          //this is the place where we query the db
          }
        }
    }
})
```

## `resolve()` to test a query

We'll create a dummy database of 3 books in the `schema.js` file:

```js
const projects = [
    {
      id: '1',
      clientId: '1',
      name: 'eCommerce Website',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      status: 'In Progress',
    },
    {
      id: '2',
      clientId: '2',
      name: 'Dating App',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      status: 'In Progress',
    },
    {
      id: '3',
      clientId: '3',
      name: 'SEO Project',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      status: 'In Progress',
    }
```

Now, to find a client with a particular `id`, we'll have to query this schema. So the in the resolve function, we'll do the following:

```js
        client: {
        type: ClientType,
        args: {id:{type: GraphQLID}},
        resolve(parent, args) {
            return Client.findById(args.id);
        }
    },
```


Next, we need to get this schema in out express server app. We'll do this in the `app.js` file:

```js
const schema = require('./schema/schema');

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
```

### GraphQL List
In the above nested query, the projects query will have a LIST of projects, and not one ProjectType. For this, we need to grab another type from graphql called GraphQLList.


```js
const { ___, ___, GraphQLList } = graphql;
```

### GraphQL NonNull

Let's say we want to add a new client, with only the name propeerty, and not pass any email property like so:

```js
mutation {
  addClient(name: "John") {
    name
  }
}
```

This will ideally contain the email property. If we want to avoid doing this or vice-versa, like adding a new client with email property and no name, it's a big problem. Let's see how we avoid this.

This is very simple. We'll use GraphQLNonNull, which says "I will not accept null values for certain fields".

We'll change a few minor things in the Mutation object:

```js
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addClient: {
            type: ClientType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const client = new Client({
                    name:args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save();
            },
        }
    }
})
```

If we run a query like:

```js
mutation {
  addClient(name: "John") {
    name
  }
}
```

We'll get a squiggly line over addAuthor saying: Field "addClient" argument "email" of type "String!" is required, but it was not provided

This helps us in a huge way in avoiding bad data in our database.

### Mutations

Mutation here means adding, deleting, updating, reading data from the db. It encompasses the basic CRUD methods. CRUD stands for Create, Read, Update and Delete.


### How to run
Start the server from the `server/` using:

`nodemon index`

This will start our server at `localhost:3000`.

You can see the `graphiql` tool by visiting [localhost:3000/graphql](localhost:3000/graphql)

We can run the following query on the left-most panel of the window to get the query results.
