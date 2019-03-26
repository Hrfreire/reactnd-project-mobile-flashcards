import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'
import { black, white, gray } from '../utils/colors'

class AddDeck extends Component {

  state = {
    title: ''
  }

  onSubmit = () => {
    const { title } = this.state
    const { submit, navigation } = this.props

    Keyboard.dismiss()

    if(title === '') {
      Alert.alert(
        'Alert',
        'Fill the title of deck.',
        [{text: 'OK'}]
      );
      return;
    }

    submit(title, () => {
      this.setState({ title: '' })
      
      navigation.navigate('DeckList')
      
      navigation.navigate('DeckPage', {
        deckTitle: title
      })
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            style={styles.textInput}
            placeholder='Deck Title'
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={{ color: white }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginLeft: 10,
    marginRight: 10
  },
  textInputWrapper : {
    alignSelf: 'stretch',
    textAlign: 'center',
    height: 40,
    margin: 20,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10
  }
})

function mapDispatchToProps(dispatch) {
  return {
    submit: (title, success) => dispatch(addDeck(title, success))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)