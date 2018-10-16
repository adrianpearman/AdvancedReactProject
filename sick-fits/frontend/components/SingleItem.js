import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag' 
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components'
import Head from 'next/head' // importing the head again allows us to update it per value

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      largerImage
    }
  }
`

const SingleItemStyle = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img{ 
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details{
    margin: 3rem;
    font-size: 2rem;
  }
`

class SingleItem extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{id: this.props.id}}
      >
        {({data, error, loading}) => {
          if (error) return <ErrorMessage error={error}></ErrorMessage>
          if(loading) return <p>loading...</p>
          if(!data.item) return <p>No item found for {this.props.id}</p>
          const item = data.item
          return (
            <SingleItemStyle>
              <Head>
                <title>Sick Fits | { item.title } </title>
              </Head>
              <img src={item.largerImage} alt={item.title}></img>
              <div className='details'>
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyle>
            )
        }}
      </Query>
    )
  }
}
export default SingleItem