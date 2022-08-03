import React, { createContext, useReducer, useState } from 'react'

const BlogContext = createContext()
const ADD_BLOG = 'ADD'
const DELETE_BLOG = 'DELETE'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return [...state, { title: `Blog # ${state.length + 1}` }]
    }
    case 'DELETE': {
      return [state.filter((blog) => blog.title !== `Blog # ${state.length}`)]
    }
    default:
      return state
  }
}

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, [])

  const addBlogPost = () => {
    dispatch({ type: ADD_BLOG })
  }

  const deleteBlogPost = () => {
    dispatch({ type: DELETE_BLOG })
  }

  return (
    <BlogContext.Provider
      value={{
        data: state,
        addBlogPost: addBlogPost,
        deleteBlogPost: deleteBlogPost
      }}
    >
      {/* components are passed down from App to custom components via the children prop */}
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext
