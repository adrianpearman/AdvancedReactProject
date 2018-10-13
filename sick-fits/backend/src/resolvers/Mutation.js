// pusheas information to the database
const Mutations = {
  async createItem(parent, ctx, info, args){
    // Check if user is logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info)
  return item
  }
};

module.exports = Mutations;
