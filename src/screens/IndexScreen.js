// show a list of blog post to users
// React
import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { Context } from '../context/BlogContext'
import { Fontisto } from '@expo/vector-icons'

const IndexScreen = () => {
  // const value = useContext(BlogContext)
  const { state, addBlogPost, deleteBlogPost } = useContext(Context)

  return (
    <View style={styles.container}>
      {/* {state.map(blog => {
        return (
          <View key={blog.title}>
            <Text>{blog.title}</Text>
          </View>
        )
      })} */}
      <View style={{ backgroundColor: 'red' }}>
        <Button onPress={addBlogPost} title={'Add Post'}  color='#ffff'/>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'gray',
          backgroundColor: 'black'
        }}
      >
        <Button onPress={deleteBlogPost} title={'Delete Most Recent Post'} />
      </View>
      <FlatList
        data={state}
        keyExtractor={blog => blog.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.text}>{item.title}</Text>
              <Fontisto name='trash' size={28} color='black' />
            </View>
          )
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
    fontSize: 22
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 14
  }
})

export default IndexScreen
