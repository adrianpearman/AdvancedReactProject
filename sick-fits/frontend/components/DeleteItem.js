import React, { Component } from 'react'
import { Mutation } from 'react-apollo' 
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items' 

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!){
    deleteItem(id: $id){
      id
    }
  }
`

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it will reflect the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    console.log(data)
    // 2. filtrer deleted item from the page

    // 3.
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: data })
  }
  render() {
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: this.props.id}}
        update={this.update}
      >
        {(deleteItem, { error }) => {
          return (
          <button onClick={() => {
            if(confirm('Are you sure that you would like to delete this item?')){
              deleteItem()
            }
          }}>{this.props.children}</button> 
          )
        }}
      </Mutation>
    )
  }
}

export default DeleteItem