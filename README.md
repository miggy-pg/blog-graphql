# Blog GraphQL
This is a web-app that uses GraphQL for query access

## Web Application System Architecture
### User
- id: Unique identifier for the user.
- username: The user's username.
- email: The user's email address.
- password: The user's password (ensure this is securely hashed in a real application).

### Post
- id: Unique identifier for the post.
- title: The title of the blog post.
- content: The content of the blog post.
- authorId: The ID of the user who authored the post.
- createdAt: The timestamp when the post was created.
- updateAt: The timestamp when the post was updated.

### Comment
- id: Unique identifier for the comment.
- postId: The ID of the post the comment belongs to.
- authorId: The ID of the user who authored the comment.
- content: The content of the comment.
- createdAt: The timestamp when the comment was created.
- updateAt: The timestamp when the post was updated.

Here's a quick overview of the relationships:
1. A User can author multiple Posts.
2. A User can also write multiple Comments.
3. A Post can have multiple Comments.

## Apollo Server
![](screenshots/apollo_server.png)

**Apollo Store**
- What is going to communicate directly with the GraphQL server and store data that comes back from it
- A store of data that exists on the client side of our applications
- A client side repository of all the data that is coming back from the GraphQL server

**Apollo Provider**
- The integration layer between the Apollo store and our actual React application
- A provider of data to our application, the provider will take data from the store and inject it into our application

## Music Lyric System Architecture (somewhat similar to our structure)
![](screenshots/sample_songlist_graphql.png)

- At the top, we have the **GraphQL Server** which is hosting our data.
- Next, the **Apollo Store** which is the point of contact/middleware between the **GraphQL Server**. This makes sure that any data that comes from the **GraphQL Server** is being distributed throughout the application.
- **ApolloProvider** acts as middleware for the **React** side of things and the **Apollo Store**.
- **Root** component which is displaying the **Query** which has an attached **SongList**
- Note: for an **Apollo** application like this project, we tend to pick a centralized components like the **SongList** as receiving the queries. Then manipulate these data down to the child component **props**

## UseMutation Syntax
![](screenshots/usemutation_syntax.png)

- When we want to pass arguments to a **GraphiQL** query, we can do this by utilizing **Query Variables**. In this event,  we first named the mutation (e.g. **AddSong**). This performs like a function with some arguments we want to pass to and  (with dollar sign **$**) the argument type (similar to **TypeScript**).

## Refetching Queries
![](screenshots/refetch_queries.png)
![](screenshots/refetch_queries_network_result.png)

- Similar to useQuery React, the data is cached after a data has been submitted. In this case, we need to refetch the data again. The attached image above shows how it can be done using **Class-based Components** but for our approach, we will follow the documentation which is using **Function-based Components**.
- The **query**(in ES6 format because query:query => query) value inside **refetchQueries** is the GraphQL query for collecting the **SongList** (in our case, the PostList)
- **NOTE**: We might assume that refetch will happen again because of our **redirection** to **SongList** after a data has been submitted. But **Apollo** correctly identifies the query has ran once and will not run again (see second image).

## Handling Multiple Queries in a Single Component
![](screenshots/handling_multiple_graphql_query.png)

- What happen here is we are calling **graphql** helper two times.
- In this case, we have two graphql queries, **query**(createSong) and **mutation**(deleteSong). Note that this are from the examples.

## Refetching Query: Part 2
![](screenshots/then_refetch.png)
- There are two ways we can refetch a query. This can be done inside a **.then** and utilizing **refetch** function.
- This should only be applied when the data is associated on the same component(e.g. the **deleteSong** event is within the **SongList** component, so after this event, we can refetch the data using the **refetch***)
- We can also use the approach below, it depends to your personal taste.

![](screenshots/refetch_queries.png)
- On this case, we are trying to **refetch** the data inside **SongList** from **SongCreate** component, so we should use this approach.

