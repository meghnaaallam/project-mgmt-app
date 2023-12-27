### Adding front-end

We have our express app and graphql server built on nodejs, and we've hooked this up with mongodb. So, when we make test requests from the front-end tool graphiql, it sends it to the server, and the resolve() functions go to mongodb and return the data to the server, which is then determining what data to send back to client via graphql query.

We'll replace Graphiql with React and Apollo.

Apollo is a graphql client we use to bind graphql to our application which is written in a JS framework (in our case, a library: React).