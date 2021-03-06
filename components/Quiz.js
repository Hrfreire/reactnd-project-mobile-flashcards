import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'
import { white, green, red, black } from '../utils/colors'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
      headerStyle: {
        backgroundColor: black,
      },
      headerTintColor: white,
    }
  }

  state = {
    correctCount: 0,
    currentQuestionIndex: 0,
    cardSide: 'question',
    isFinished: false
  }

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

  resetNotifications = () => {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  flipAnimation = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
    }
  }

  onPressTurnCard = () => {
    this.flipAnimation()

    this.setState(({ cardSide }) => {
      return {
        cardSide: cardSide === 'question'
          ? 'answer'
          : 'question'
      }
    })
  }

  onPressCorrect = () => {
    const { deck } = this.props

    this.setState(({ correctCount, currentQuestionIndex }) => {
      if(currentQuestionIndex + 1 === deck.questions.length) {
        this.resetNotifications()
        return {
          correctCount: correctCount + 1,
          isFinished: true
        }
      }
      
      return {
        correctCount: correctCount + 1,
        currentQuestionIndex: currentQuestionIndex + 1,
        cardSide: 'question'
      }
    })
  }

  onPressIncorrect = () => {
    const { deck } = this.props

    this.setState(({ currentQuestionIndex }) => {
      if(currentQuestionIndex + 1 === deck.questions.length) {
        this.resetNotifications()
        return {
          isFinished: true
        }
      }
      
      return {
        currentQuestionIndex: currentQuestionIndex + 1,
        cardSide: 'question'
      }
    })
  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  restart = () => {
    this.setState({
      correctCount: 0,
      currentQuestionIndex: 0,
      cardSide: 'question',
      isFinished: false
    })
  }

  renderFinished = () => {
    const { deck } = this.props
    const { correctCount } = this.state

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 35, textAlign: 'center' }}>
          Correct Percentage: { ((correctCount / deck.questions.length) * 100).toFixed(2) }%
        </Text>
        <View style={[styles.buttonsWrapper, { marginTop: 20 }]}>
          <View style={{ height: 60, flexDirection: 'row' }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.restart}
              style={[styles.button, { flex: .6, backgroundColor: black }]}
            >
             <Text style={{ color: white }}>Restart Quiz</Text>
            </TouchableOpacity>
            <View style={{flex: .2}}/>
          </View>
          <View style={{ height: 60, flexDirection: 'row', marginTop: 5 }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.backToDeck}
              style={[styles.button, { flex: .6, backgroundColor: black }]}
            >
             <Text style={{ color: white }}>Back To Deck</Text>
            </TouchableOpacity>
            <View style={{flex: .2}}/>
          </View>
        </View>
      </View>
    )
  }

  renderAnimatedCard() {

    const { deck } = this.props
    const { currentQuestionIndex, cardSide } = this.state
    const currentQuestion = deck.questions[currentQuestionIndex]
 
    const currentText = cardSide === 'question'
      ? currentQuestion.question
      : currentQuestion.answer

    const buttonText = cardSide === 'question'
      ? 'Answer'
      : 'question'

    const interpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    const rotateY = { transform: [{ rotateY: interpolate }] };

    return (
      <Animated.View style={[rotateY, styles.card]}>
        <Animated.Text style={[rotateY,styles.mainText]}>
          {currentText}
        </Animated.Text>
        <TouchableOpacity onPress={this.onPressTurnCard}>
          <Animated.Text style={[rotateY, { color: red }]}>{buttonText}</Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  render () {

    const { deck } = this.props
    const { currentQuestionIndex, cardSide, isFinished } = this.state

    if(isFinished) {
      return this.renderFinished()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.counter}>
          {currentQuestionIndex + 1} / { deck.questions.length}
        </Text>
        {this.renderAnimatedCard()}
        <View style={[styles.buttonsWrapper, { opacity: cardSide === 'question' ? .7 : 1 }]}>
          <View style={{ height: 60, flexDirection: 'row' }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.onPressCorrect}
              disabled={cardSide === 'question'}
              style={[styles.button, { flex: .6, backgroundColor: green }]}
            >
             <Text style={{ color: white }}>Correct</Text>
            </TouchableOpacity>
            <View style={{flex: .2}}/>
          </View>
          <View style={{ height: 60, flexDirection: 'row', marginTop: 5 }}>
            <View style={{flex: .2}}/>
            <TouchableOpacity
              onPress={this.onPressIncorrect}
              disabled={cardSide === 'question'}
              style={[styles.button, { flex: .6, backgroundColor: red }]}
            >
             <Text style={{ color: white }}>Incorrect</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: black,
    padding: 25,
    minHeight: 200
  },
  mainText: {
    fontSize: 30,
    marginBottom: 15
  },
  buttonsWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 15
  },
  button: {
    height: 55,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
})

function mapStateToProps(state, { navigation }) {
  return {
    deck: state.find(deck => deck.title === navigation.state.params.deckTitle)
  }
}

export default connect(mapStateToProps)(Quiz)