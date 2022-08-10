import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import React, { Fragment, useState, useContext } from 'react'
import { Context } from '../context/BlogContext'

const EditScreen = ({ navigation }) => {
  const blog = navigation.getParam('blog')
  const [title, setTitle] = useState(blog.title)
  const [content, setContent] = useState(blog.content)
  const { editBlogPost } = useContext(Context)
  console.log(blog)

  return (
    <Fragment>
      <View>
        <Text>EditScreen</Text>
      </View>
      <View>
        <Text style={styles.label}>Enter New Title</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Enter New Content</Text>
        <TextInput
          value={content}
          onChangeText={text => setContent(text)}
          style={styles.input}
          multiline
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'skyblue',
          margin: 15,
          width: '75%',
          alignSelf: 'center',
          padding: 5
        }}
        onPress={() => {
          editBlogPost({ title, content, id: blog.id }, () => {
            navigation.navigate('Index')
          })
        }}
      >
        <Text
          style={{ fontSize: 22, alignSelf: 'center', paddingVertical: 10 }}
        >
          Edit Blog 
        </Text>
      </TouchableOpacity>
    </Fragment>
  )
}
const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 12,
    padding: 5
  },
  label: {
    fontSize: 22,
    marginVertical: 10,
    paddingTop: 5,
    marginLeft: 7
  }
})

export default EditScreen
