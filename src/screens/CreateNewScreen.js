import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import React, { Fragment, useState, useContext } from 'react'
import { Context } from '../context/BlogContext'

const CreateNewScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { addBlogPost } = useContext(Context)

  return (
    <Fragment>
      <View>
        <Text>CreateNewScreen</Text>
      </View>
      <View>
        <Text style={styles.label}>Enter Title</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Enter Content</Text>
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
          addBlogPost({ id: Math.floor(Math.random() * 9999), title, content }, () => {
            navigation.navigate('Index')
          })
        }}
      >
        <Text
          style={{ fontSize: 20, alignSelf: 'center', paddingVertical: 10 }}
        >
          Add Blog +
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

export default CreateNewScreen
