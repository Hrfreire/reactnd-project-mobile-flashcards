import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks'

export function fetchDeckList() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      return Object.values(JSON.parse(result))
    })
}

export function addDeck(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}