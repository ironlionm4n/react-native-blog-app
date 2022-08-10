import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context } from '../context/BlogContext'

const BlogDetailsScreen = (props) => {
    const { navigation } = props
    const { state } = useContext(Context)
    const id = navigation.getParam('id')
    const blogPost = state.find((blog) => blog.id === id)

  return (
    <View style={styles.container}>
      <Text>Blog Details Screen</Text>
      <Text>Blog ID: {blogPost.id}</Text>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        marginBottom: 10,
        marginTop: 5,
        borderBottomLeftRadius: 21,
        borderBottomRightRadius: 21,
    }
})

export default BlogDetailsScreen
