// React
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
// Screens
import IndexScreen from './src/screens/IndexScreen'
// Context
import { Provider } from './src/context/BlogContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs'
    }
  }
)

const App = createAppContainer(navigator)

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
}
