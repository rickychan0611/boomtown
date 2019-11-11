const { ApolloError } = require("apollo-server");
// const { postgres } = require("../pg-resource");

const relationResolvers = {
  User: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The User GraphQL type has two fields that are not present in the
     *  user table in Postgres: items and borrowed.
     *
     *  According to our GraphQL schema, these fields should return a list of
     *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
     *
     */
    // @TODO: Uncomment these lines after you define the User type with these fields
    async items(parent, args, {pgResource}, info) {
      // @TODO: Replace this mock return statement with the correct items from Postgres
      try {
        const item = await pgResource.getItemsForUser(parent.id);
        return item;
      } catch (e) {
        throw new ApolloError(e);
      }
      // -------------------------------
    },
    async borrowed(parent, args, {pgResource}, info) {
    //   // @TODO: Replace this mock return statement with the correct items from Postgres
      try {
        const item = await pgResource.getBorrowedItemsForUser(parent.id);
        return item;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
    //   // -------------------------------
    // }
    // -------------------------------
  },

  Item: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The Item GraphQL type has two fields that are not present in the
     *  Items table in Postgres: itemowner, tags and borrower.
     *
     * According to our GraphQL schema, the itemowner and borrower should return
     * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
     *
     */
    // @TODO: Uncomment these lines after you define the Item type with these fields
    async borrower (parent, args, {pgResource}, info) {
      // @TODO: Replace this mock return statement with the correct user from Postgresß
      try {
        const user = await pgResource.getBorrower(parent.borrower);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async tags(parent, args, {pgResource}, info) {
      // @TODO: Replace this mock return statement with the correct tags for the queried Item from Postgres
      try {
        const tags = await pgResource.getTagsForItem(parent.id);
        return tags;
      } catch (e) {
        throw new ApolloError(e);
      }    // -------------------------------
    },
    // async borrower(item) {
    //   /**
    //    * @TODO: Replace this mock return statement with the correct user from Postgres
    //    * or null in the case where the item has not been borrowed.
    //    */
    //   try {
    //     const user = await pgResource.getUserById(item.id);
    //     return user;
    //   } catch (e) {
    //     throw new ApolloError(e);
    //   } 
    //   // -------------------------------
    // }
    // -------------------------------
  }
};

module.exports = relationResolvers;
