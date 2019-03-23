import { SUCCESS_GET_DECK_LIST, SUCCESS_ADD_DECK, SUCCESS_ADD_QUESTION } from '../actions'

function sortDecks(a, b) {
  return a.title.localeCompare(b.title);
}

function decks (state = [], action) {
  switch(action.type) {
    case SUCCESS_GET_DECK_LIST:
      return [
        ...state,
        ...action.payload
      ].sort(sortDecks)
    case SUCCESS_ADD_DECK:
      return [
        ...state,
        action.payload
      ].sort(sortDecks)
    case SUCCESS_ADD_QUESTION:
      return [
        ...state.filter(deck => (deck.title !== action.payload.title)),
        action.payload
      ].sort(sortDecks)
    default: 
      return state
  }
}

export default decks