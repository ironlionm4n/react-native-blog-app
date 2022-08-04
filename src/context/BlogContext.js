import React, { createContext, useReducer, useState } from 'react'
import createDataContext from './createDataContext'

const ADD_BLOG = 'ADD'
const DELETE_BLOG = 'DELETE'
const SORT_BLOGS = 'SORT'

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
    default:
      return state
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
export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost: addBlogPost,
    deleteBlogPost: deleteBlogPost,
    sortBlogs: sortBlogs
  },
  []
)
