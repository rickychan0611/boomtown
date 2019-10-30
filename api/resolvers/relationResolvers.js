const { ApolloError } = require("apollo-server");

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
    items() {
      // @TODO: Replace this mock return statement with the correct items from Postgres
      const item = pgResource.getItemsForUser(id);
      return item;      // -------------------------------
    },
    borrowed() {
    //   // @TODO: Replace this mock return statement with the correct items from Postgres
    const item = pgResource.getBorrowedItemsForUser(id);
    return item;
    //   // -------------------------------
    }
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
    async itemowner(parent, { id }, { pgResource }, info) {
      console.log('aaa '+ id)
  
      try {
        const user = await pgResource.getUserById(id);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async tags(parent, { id }, { pgResource }, info) {
      try {
        const tag = await pgResource.getTags();
        return tag;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async borrower(parent, { id }, { pgResource }, info) {
      console.log('aaa '+ id)
  
      try {
        const user = await pgResource.getUserById(id);
        return user;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    // async borrower() {
    //   /**
    //    * @TODO: Replace this mock return statement with the correct user from Postgres
    //    * or null in the case where the item has not been borrowed.
    //    */
    //   return null
    //   // -------------------------------
    // }
    // -------------------------------
  }
};

module.exports = relationResolvers;
