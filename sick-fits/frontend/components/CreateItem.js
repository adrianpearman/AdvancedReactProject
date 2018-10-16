import React, { Component } from 'react'
import { Mutation } from 'react-apollo' 
import Router from 'next/router'
import gql from 'graphql-tag'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from '../components/ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largerImage: String
  ){
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largerImage: $largerImage
    ){
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largerImage: '',
    price: 0,
    disable: true
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val})
  }

  uploadFile = async (e) => {
    console.log('uploading ...')
    const files = e.target.files 
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickFits')

    const res = await fetch('https://api.cloudinary.com/v1_1/de3tjynwt/image/upload/', {
      method: 'POST',
      body: data,
    })

    const file = await res.json()
    console.log(file)

    this.setState({
      image: file.secure_url,
      largerImage: file.eager[0].secure_url,
      disable: false
    })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error }) => (
          <Form onSubmit={async (e) => {
            // Stops form from submitting
            e.preventDefault();
            // call the mutattion
            const res = await createItem()
            // change them to the created item
            console.log(res)
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
          <ErrorMessage error={error}/>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor='title'>
              Picture
              <input 
                type='file' 
                id='file' 
                name='file'
                placeholder = 'Upload an Image' 
                required 
                onChange={this.uploadFile}
              />
              {this.state.image && <img width='200' src={this.state.image} alt={this.state.title}/>}
            </label>

            <label htmlFor='title'>
              Title
              <input 
                type='text' 
                id='title' 
                name='title'
                placeholder = 'Title' 
                required 
                onChange={this.handleChange}
                value={this.state.title}
              />
            </label>

            <label htmlFor='price'>
              Price
              <input
                type='number'
                id='price'
                name='price'
                placeholder='Price'
                required
                onChange={this.handleChange}
                value={this.state.price}
              />
            </label>

            <label htmlFor='description'>
              Description
              <textarea 
                id='description' 
                name='description' 
                placeholder = 'Description'
                required 
                onChange={this.handleChange}
                value={this.state.description}
              />
            </label>
            <button type='submit' disabled={this.state.disable}>Submit</button>
          </fieldset>
        </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem
export  { CREATE_ITEM_MUTATION }