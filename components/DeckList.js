import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDeckList } from '../actions'

class DeckList extends Component {

  componentDidMount() {
    this.props.dispatch(getDeckList())
  }

  renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.questions.length} cards</Text>
      </View>
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

function mapDispatchToProps() {
  return {
    getDeckList: getDeckList
  }
}

export default connect(mapStateToProps)(DeckList)