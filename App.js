import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import DeckList from './components/DeckList'

const routeConfig = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      topBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  newDeck: {
    screen: View,
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

const Tabs = createAppContainer(
  Platform.OS === 'ios'
  ? createBottomTabNavigator(routeConfig, drawConfig)
  : createMaterialTopTabNavigator(routeConfig, drawConfig)
)

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
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={'gray'} barStyle='light-content' />
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
