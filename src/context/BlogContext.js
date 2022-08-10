import React, { createContext, useReducer, useState } from 'react'
import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const ADD_BLOG = 'ADD'
const DELETE_BLOG = 'DELETE'
const SORT_BLOGS = 'SORT'
const EDIT = 'EDIT'
const GET = 'GET_BLOGPOSTS'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content
        }
      ]
    }
    case 'DELETE': {
      return [...state.filter(blog => blog.id !== action.payload)]
    }
    case 'SORT': {
      if (action.payload.asc) {
        let temp = [...state]
        temp.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          }
          if (a.id > b.id) {
            return 1
          }
          return 0
        })
        return temp
      } else {
        let temp = [...state]
        temp.sort((a, b) => {
          if (a.id < b.id) {
            return 1
          }
          if (a.id > b.id) {
            return -1
          }
          return 0
        })
        return temp
      }
    }
    case 'EDIT': {
      // let temp = [...state.filter(x => x.id !== action.payload.id)]
      // return temp.concat(action.payload)
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost
      })
    }

    case 'GET_BLOGPOSTS': {
      return action.payload
    }
    default:
      return state
  }
}

const getBlogPosts = dispatch => {
  return async () => {
    // any route passed here is concatenated onto baseURL of the axios instance
    const response = await jsonServer.get('/blogposts')
    console.log(response.data)

    dispatch({ type: GET, payload: response.data })
  }
}

const addBlogPost = dispatch => {
  return (newBlog, callBack) => {
    dispatch({ type: ADD_BLOG, payload: newBlog })
    callBack()
  }
}

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: DELETE_BLOG, payload: id })
  }
}

const sortBlogs = dispatch => {
  return asc => {
    dispatch({ type: SORT_BLOGS, payload: { asc: asc } })
  }
}

const editBlogPost = dispatch => {
  return (blog, callBack) => {
    console.log(blog)
    dispatch({ type: EDIT, payload: blog })
    callBack()
  }
}
export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost: addBlogPost,
    deleteBlogPost: deleteBlogPost,
    sortBlogs: sortBlogs,
    editBlogPost: editBlogPost,
    getBlogPosts: getBlogPosts,
  },
  []
)
