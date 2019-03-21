import { SUCCESS_GET_DECK_LIST, SUCCESS_ADD_DECK } from '../actions'

function decks (state = [], action) {
  switch(action.type) {
    case SUCCESS_GET_DECK_LIST:
      return [
        ...state,
        ...action.payload
      ]
    case SUCCESS_ADD_DECK:
      return [
        ...state,
        action.payload
      ]
    default: 
      return state
  }
}

export default decks