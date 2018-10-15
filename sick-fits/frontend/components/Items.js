import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag' 
import styled from 'styled-components'
import Item from './Item'


const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY{
    items{
      id
      title
      description
      price
      image
      largerImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({data, error, loading}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error: {error.message}</p>
            if(data.items.length < 1) return <p>No items are currently in the store</p>
            return (
              <ItemsList>
                {data.items.map((item) => {
                  return <Item key={item.id} item={item}></Item>
                })}
              </ItemsList>
            )
          }}
        </Query>
      </Center>
    )
  }
}

export default Items
export { ALL_ITEMS_QUERY }