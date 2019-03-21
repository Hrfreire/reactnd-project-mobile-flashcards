import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import reducer from './reducers'

import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'

const routeConfig = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      topBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  newDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      topBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  }
};

const drawConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'gray' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'gray',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator(routeConfig, drawConfig)
  : createMaterialTopTabNavigator(routeConfig, drawConfig)


const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    } 
  }
}))

function AppStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(ReduxThunk))}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={'gray'} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
