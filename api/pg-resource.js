function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: "INSERT INTO users VALUES ($1, $2, $3)", // @TODO: Authentication - Server
        values: [fullname, email, password],
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users WHERE email = $1", // @TODO: Authentication - Server
        values: [email],
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE id = $1`, // @TODO: Basic queries
        values: [id], //$1 is the 1st arrg in
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user.rows[0]) throw "user was not found";
        return user.rows[0];
      } catch (e) {
        throw "500 error. User ID was not found, dude!";
      }

      // -------------------------------
    },
    async getItems(idToOmit) { //GET ALL ITEMS
      console.log('idToOmit'+ idToOmit)
      try {
      const items = await postgres.query({
        
        /**
         *  @TODO:
         *
         *  idToOmit = ownerId
         *
         *  Get all Items. If the idToOmit parameter has a value,
         *  the query should only return Items were the ownerid !== idToOmit
         *
         *  Hint: You'll need to use a conditional AND/WHERE clause
         *  to your query text using string interpolation
         */

        text: `SELECT * FROM items`, // @TODO: Basic queries
        values: idToOmit ? [idToOmit] : [],
      });
      // console.log(items.rows)
      
        return items.rows;
      } catch (e) {
        throw "500 error. items were not found, dude!";
      }
    },
    async getItemsForUser(id) {
      try {
      const items = await postgres.query({
        /**
         *  @TODO:
         *  Get all Items for user using their id, DONE!
         */
        text: `SELECT * FROM items WHERE itemowner = $1`,
        values: [id],
      });
        return items.rows;
      } catch (e) {
        throw "500 error. items were not found, dude!";
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
      const items = await postgres.query({
        /**
         *  @TODO:
         *  Get all Items borrowed by user using their id
         */
        text: `SELECT * FROM items WHERE borrower = $1`,
        values: [id],
      });
      return items.rows;
    }
    catch (e) {
      throw "500 error. borrower id were not found";
    }
    },
    async getTags() {
      try {
      console.log('getTags')
      const tags = await postgres.query({
        text: "SELECT * FROM tags",
        values: [],
      });
        return tags.rows;
      }
      catch (e) {
        throw "500 error. tags were not found";
      }
    },
    async getTagsForItem(id) {
      try{
      const tagsQuery = await postgres.query({
        text: 
        `SELECT * FROM tags_items
        INNER JOIN items
        ON tags_items.item_id = items.id
        INNER JOIN tags
        ON tags_items.tag_id = tags.id
        WHERE items.id = $1
        `,
        values: [id],
      });
      console.log(tagsQuery.rows)
      //const tags = await postgres.query(tagsQuery);
      return tagsQuery.rows;
    }
    catch (e) {
      throw "500 error. item id were not found";
    }
    },
    async saveNewItem({ item, user }) {
      console.log("saveNewItem triggered "+ item)
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item requires 2 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */
      try {
        const items = await postgres.query({
          text: `INSERT INTO items VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          `,
          values: [
            item.id, 
            item.title,
            item.imageurl,
            item.description,
            item.itemowner,
            item.tags,
            item.created,
            item.borrower
          ],
        });
        const result = await postgres.query({
          text: `SELECT * FROM items WHERE id = $1`,
          values: [item.id]
        })
        console.log('return' + JSON.stringify(items.rows))
        return result.rows;
      }
      catch (e) {
        throw e;
      }
      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         * - Read about transactions here: https://node-postgres.com/features/transactions
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              console.log('resolve ', resolve)
              const { title, description, tags } = item;
              const newItemInsert = {
                text: "", // @TODO: Authentication - Server
                values: [title, description, tags],
              };
              // Generate new Item query
              // @TODO
              // -------------------------------

              // Insert new Item
              // @TODO
              // -------------------------------

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)
              // @TODO
              // -------------------------------

              // Insert tags
              // @TODO
              // -------------------------------

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                // Uncomment this resolve statement when you're ready!
                // resolve(newItem.rows[0])
                // -------------------------------
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    },
  };
};
