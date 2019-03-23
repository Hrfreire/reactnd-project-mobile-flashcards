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

  render() {

    const { decks } = this.props

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