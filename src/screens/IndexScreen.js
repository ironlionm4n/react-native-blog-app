import React, { useContext, useEffect } from 'react'
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
import { Feather } from '@expo/vector-icons'

const IndexScreen = props => {
  // const value = useContext(BlogContext)
  const { state, deleteBlogPost, sortBlogs, getBlogPosts } = useContext(Context)

  useEffect(() => {
    getBlogPosts()

    const listener = props.navigation.addListener('didFocus', () => {
      getBlogPosts()
    })

    // return functions from useEffect are only invoked once this component is unmounted
    return ()=>{
      listener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: 'gray',
          backgroundColor: 'blue',
          margin: 7
        }}
      >
        <Button
          onPress={() => {
            if (state.length < 1) {
              alert('No Blogs to sort')
            }
            sortBlogs(true)
          }}
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
          onPress={() => {
            if (state.length < 1) {
              alert('No Blogs to sort')
            }
            sortBlogs(false)
          }}
          title={'Sort Blogs By ID In Descending Order'}
          color='#ffff'
        />
      </View>
      <FlatList
        data={state}
        keyExtractor={blog => blog.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Details', { id: item.id })
                }
              >
                <Text style={styles.text}>
                  {item.title} - ID: {item.id}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Fontisto name='trash' size={28} color='black' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Edit', { blog: item })
                }
              >
                <Feather name='edit-3' size={28} color='black' />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

IndexScreen.navigationOptions = props => {
  const { navigation } = props
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Create')}
        style={{ marginRight: 50 }}
      >
        <Fontisto name='plus-a' size={28} color='black' />
      </TouchableOpacity>
    )
  }
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
    marginHorizontal: 20
  },
  buttonView: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'blue'
  }
})

export default IndexScreen
