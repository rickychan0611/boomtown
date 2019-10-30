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
  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String
    itemowner: String
    tags: String
    created: String
    borrower: String
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: String!
  }

  type AuthPayload {
    _: Boolean
  }

  input AssignedTag {
    id: ID
    title: String
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
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    itemsById(id: ID!) : [Item]
    borrowedItemsForUser(id: ID!) : [Item]
    tagsForItem(id: ID!) : [Tag]
    tags: [Tag]
  }

  type Mutation {
    addItem(
      id: ID
      title: String
    ): Item
  }
`;
