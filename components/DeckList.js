import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeckList } from '../actions'

class DeckList extends Component {

  componentDidMount() {
    this.props.getDeckList()
  }

  onPressDeck = (deck) => {
    this.props.navigation.navigate('DeckPage', {
      deckTitle: deck.title
    })
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.onPressDeck(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ fontSize: 30, textAlign: 'center'}}>
          The deck list is empty. Go ahead and add a new one!
        </Text>
      </View>
    )
  }

  render() {

    const { decks } = this.props

    if (decks.length === 0) {
      return this.renderEmpty()
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.title}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  itemContainer: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20
  },
  itemDescription: {
    fontSize: 16,
    color: 'gray'
  },
  listSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDeckList: () => dispatch(getDeckList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)