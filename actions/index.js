import { fetchDeckList as fetchDeckListApi, addDeck as addDeckApi } from '../utils/api'

export const GET_DECK_LIST = 'GET_DECK_LIST'
export const SUCCESS_GET_DECK_LIST = 'SUCCESS_GET_DECK_LIST'
export const ADD_DECK = 'ADD_DECK'
export const SUCCESS_ADD_DECK = 'SUCCESS_ADD_DECK'

export function getDeckList () {
  return async function (dispatch) {
    dispatch ({ type: GET_DECK_LIST })

    const decks = await fetchDeckListApi()

    return dispatch( { type: SUCCESS_GET_DECK_LIST, payload: decks })
  }
}

export function addDeck (title) {
  return async function (dispatch) {
    dispatch ({ type: ADD_DECK })
    await addDeckApi({ title, questions: [] })

    return dispatch( { type: SUCCESS_ADD_DECK, payload: { title, questions: [] } })
  }
}