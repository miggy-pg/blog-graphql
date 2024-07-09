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