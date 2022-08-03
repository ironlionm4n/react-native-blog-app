import React, { createContext, useReducer, useState } from 'react'
import createDataContext from './createDataContext'

const ADD_BLOG = 'ADD'
const DELETE_BLOG = 'DELETE'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {

      return [...state, { title: `Blog # ${state.length + 1}` }]
    }
    case 'DELETE': {
      const temp = state.filter(
        blog => blog.title !== `Blog # ${state.length}`
      )

      console.log(temp)

        // for(let i = 0; i < state.length; i++) {
        //   console.log(state[i].title === temp[i].title)
        //   console.log(temp[i].title)
        // }
      return temp
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
  return () => {
    dispatch({ type: DELETE_BLOG })
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost: addBlogPost, deleteBlogPost: deleteBlogPost },
  []
)
