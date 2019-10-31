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
    async items(items) {
      // @TODO: Replace this mock return statement with the correct items from Postgres
      try {
        const item = await pgResource.getItems(items.id);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      }
      // -------------------------------
    },
    async borrowed() {
    //   // @TODO: Replace this mock return statement with the correct items from Postgres
      try {
        const item = await pgResource.getItems(items.id);
        return user;
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
    async itemowner(item) {
      // @TODO: Replace this mock return statement with the correct user from Postgresß
      console.log('item = ' + JSON.stringify(item))
      try {
        const user = await pgResource.getUserById(item.id);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      }
       // return {
      //   id: 1,
      //   fullname: "Mock user",
      //   email: "mock@user.com",
      //   bio: "Mock user. Remove me."
      // }
     
      // -------------------------------
    },
    async tags(item) {
      // @TODO: Replace this mock return statement with the correct tags for the queried Item from Postgres
      try {
        const tags = await pgResource.getTagsForItem(item.id);
        return tags;
      } catch (e) {
        throw new ApolloError(e);
      }    // -------------------------------
    },
    async borrower(item) {
      /**
       * @TODO: Replace this mock return statement with the correct user from Postgres
       * or null in the case where the item has not been borrowed.
       */
      try {
        const user = await pgResource.getUserById(item.id);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      } 
      // -------------------------------
    }
    // -------------------------------
  }
};

module.exports = relationResolvers;
