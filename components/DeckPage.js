import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class DeckPage extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle,
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#FFFFFF',
    }
  }

  onPressAdd = () => {
    const { navigation, deck } = this.props

    navigation.navigate('AddCard', {
      deckTitle: deck.title
    })
  }

  onPressStart = () => {

  }

  render() {

    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.textsWrapper}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.description}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonsWrapper}>
          <View style={{height: 60, flexDirection: 'row' }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.onPressAdd}
              style={[styles.button, { flex: .6 }]}
            >
              <Text>Add Card</Text>
            </TouchableOpacity>
            <View style={{flex: .2}}/>
          </View>
          <View style={{height: 60, flexDirection: 'row' }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.onPressStart}
              style={[styles.button, styles.startQuizButton, { flex: .6 }]}
            >
            <Text style={{ color: 'white' }}>Start Quiz</Text>
            </TouchableOpacity>
            <View style={{flex: .2}}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textsWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40
  },
  description: {
    fontSize: 20,
    color: 'gray',
    marginTop: 5
  },
  buttonsWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    height: 55,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  startQuizButton: {
    backgroundColor: 'black',
    marginTop: 10
  }
})

function mapStateToProps(state, { navigation }) {
  return {
    deck: state.find(deck => deck.title === navigation.state.params.deckTitle)
  }
}

export default connect(mapStateToProps)(DeckPage)