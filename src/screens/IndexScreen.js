// show a list of blog post to users
// React
import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import BlogContext from '../context/BlogContext'

const IndexScreen = () => {
    // const value = useContext(BlogContext)
  const { data, addBlogPost, deleteBlogPost } = useContext(BlogContext)

  return (
    <View style={styles.container}>
      {data.map(blog => {
        return (
          <View key={blog.title}>
            <Text>{blog.title}</Text>
          </View>
        )
      })}
      <Button onPress={addBlogPost} title={'Add Post'}/>
      <Button onPress={deleteBlogPost} title={'Delete Post'}/>
      <FlatList
        data={data}
        keyExtractor={blog => blog.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1'
  },
  text: {
    fontSize: 16
  }
})

export default IndexScreen
