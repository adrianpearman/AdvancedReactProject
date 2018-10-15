// Grabs information from the database
const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  
  // Due to the query being the same between the yoga layer and prisma, we use the forwardTo package to pass over the request
  // async items(parent, AbortSignal,cxt,info){
  //   const items = await ctx.db.query.items()
  //   return items
  // }
};

module.exports = Query;
