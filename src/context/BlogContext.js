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
          id: Math.floor(Math.random() * 999),
          title: `Blog # ${state.length + 1}`
        }
      ]
    }
    case 'DELETE': {
      const temp = state.filter(blog => blog.id !== action.payload)
      console.log(temp)
      // for(let i = 0; i < state.length; i++) {
      //   console.log(state[i].title === temp[i].title)
      //   console.log(temp[i].title)
      // }
      return temp
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
        console.log('Temp', temp)
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
        console.log('Temp', temp)
        return temp
      }
    }
    default:
      return state
  }
}

const addBlogPost = dispatch => {
  return () => {
    dispatch({ type: ADD_BLOG })
  }
}

const deleteBlogPost = dispatch => {
  return id => {
    console.log(id, 'id')
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
