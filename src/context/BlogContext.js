import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const SORT_BLOGS = 'SORT'
const EDIT = 'EDIT'
const GET = 'GET_BLOGPOSTS'

const blogReducer = (state, action) => {
  switch (action.type) {
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

const addBlogPost = () => {
  return async (newBlog, callBack) => {
    console.log(newBlog)
    await jsonServer.post('/blogposts', newBlog)

    if (callBack) {
      callBack()
    }
  }
}

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`)
  }
}

const sortBlogs = dispatch => {
  return asc => {
    dispatch({ type: SORT_BLOGS, payload: { asc: asc } })
  }
}

const editBlogPost = dispatch => {
  return async (blog, callBack) => {
    await jsonServer.put(`/blogposts/${blog.id}`, blog)

    if (callBack) {
      callBack()
    }
  }

}

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost: addBlogPost,
    deleteBlogPost: deleteBlogPost,
    sortBlogs: sortBlogs,
    editBlogPost: editBlogPost,
    getBlogPosts: getBlogPosts
  },
  []
)
