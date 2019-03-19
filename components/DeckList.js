import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const list = [{ title: 'Teste', questions: [{}, {}]}, { title: 'Teste1', questions: [{}, {}]}, { title: 'Teste2', questions: [{}, {}]}]

class DeckList extends Component {

  renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.questions.length} cards</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
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

export default DeckList