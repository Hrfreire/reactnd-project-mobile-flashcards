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
import { addQuestion } from '../actions'

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card',
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#FFFFFF',
    }
  }

  state = {
    question: '',
    answer: ''
  }

  onSubmit = () => {
    const { question, answer } = this.state
    const { submit, navigation } = this.props

    Keyboard.dismiss()

    if(question === '' || answer === '') {
      Alert.alert(
        'Alert',
        'Fill all the fields.',
        [{text: 'OK'}]
      );
      return;
    }

    submit(navigation.state.params.deckTitle, { question, answer })

    this.setState({ question: '', answer: '' })

    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            style={styles.textInput}
            placeholder='Question'
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            style={styles.textInput}
            placeholder='Answer'
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={{ color: 'white'}}>Submit</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10
  }
})

function mapDispatchToProps(dispatch) {
  return {
    submit: (deckTitle, question) => dispatch(addQuestion(deckTitle, question))
  }
}

export default connect(null, mapDispatchToProps)(AddCard)