// show a list of blog post to users
// React
import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'
import { Context } from '../context/BlogContext'
import { Fontisto } from '@expo/vector-icons'

const IndexScreen = () => {
  // const value = useContext(BlogContext)
  const { state, addBlogPost, deleteBlogPost, sortBlogs } = useContext(Context)

  return (
    <View style={styles.container}>
      {/* {state.map(blog => {
        return (
          <View key={blog.title}>
            <Text>{blog.title}</Text>
          </View>
        )
      })} */}
      <View style={{ backgroundColor: 'red', margin: 7 }}>
        <Button onPress={addBlogPost} title={'Add Post'} color='#ffff' />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'gray',
          backgroundColor: 'blue',
          margin: 7
        }}
      >
        <Button
          onPress={() => sortBlogs(true)}
          title={'Sort Blogs By ID In Ascending Order'}
          color='#ffff'
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'gray',
          backgroundColor: 'purple',
          margin: 7
        }}
      >
        <Button
          onPress={() => sortBlogs(false)}
          title={'Sort Blogs By ID In Descending Order'}
          color='#ffff'
        />
      </View>
      <FlatList
        data={state}
        keyExtractor={blog => blog.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.text}>
                {item.title} - ID: {item.id}
              </Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Fontisto name='trash' size={28} color='black' />
              </TouchableOpacity>
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
  },
  buttonView: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'blue'
  }
})

export default IndexScreen
