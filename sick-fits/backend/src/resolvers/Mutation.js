// pusheas information to the database
const Mutation= {
  async createItem(parent, args, ctx, info){
    await console.log(ctx)
    // Check if user is logged in
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info)

  return item
  },
  updateItem(parent, args, ctx, info){
    // take a copy of the updates

  const updates = {...args}
  // remove ID from the updates
  delete updates.id
  // run the update method
  return ctx.db.mutation.updateItem({
    data: updates,
    where: {
      id: args.id
    }
  }, info)
  },
  async deleteItem(parent, args, ctx, info){
    const where = { id: args.id }
    // find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`) 
    // check to see if they own or have permission

    // delete the item
    return ctx.db.mutation.deleteItem({ where }, info)
  }
};

module.exports = Mutation;
