const { gql } = require("apollo-server-express");

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  directive @auth on FIELD_DEFINITION
  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String
    itemowner: User!
    tags: [Tag]
    created: Date!
    borrower: User
  }

  type Items {
    items : [Item]
  }

  type Users {
    items : [User]
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
    password: String!
  }
  
  type Tags {
    tags : [Tag]
  }

  type Tag {
    id: ID!
    tag_title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input AssignedTag {
    id: [ID]!
 
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  type Query {
    user(id: ID!): User @auth
    viewer: User
    items(id: ID): [Item]
    tags: [Tag]
    tag(id: ID!): Tag
  }

  input LoginInput {
    email:String!
    password: String!
   }

   input Token {
     token: String
   }

   input SignupInput {
     fullname: String
     email: String
     password: String
   }

  type Mutation {
    addItem(item: NewItemInput!): Item
    signup(user: SignupInput!): AuthPayload!
    login(user: LoginInput!): AuthPayload!
    logout(user: LoginInput!): AuthPayload!
   }
  

`;
