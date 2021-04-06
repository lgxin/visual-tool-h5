import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import type from './type'
let store

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  drapList: [],
  rightMenu: {
    status: false,
    id: ''
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type['ADD_DRAP_LIST']:
      return {
          ...state,
          drapList:action.drapItem
      }
    case type['DELECT_DRAP_ITEM']:
      const drapList = state.drapList;
      const {id} = state.rightMenu;
      const pointData = drapList.filter(item => item.id !== id);
      console.log(pointData, '=pointData');
      return {
          ...state,
          drapList: pointData
        }
    case type['UPDATE_RIGHT_MENU']:
        return {
            ...state,
            rightMenu: action.rightMenu
        }
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
