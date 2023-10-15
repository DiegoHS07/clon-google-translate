import 'bootstrap/dist/css/bootstrap.min.css'
import { useReducer } from 'react'
import './App.css'
import { type State } from './types'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer(state: State, action) {
  const { type, payload } = action

  if (type === 'INTERCHANGE_LANGUAGE') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: payload
    }
  }

  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className='App'>
      <h1>Clon google translate</h1>
    </div>
  )
}

export default App
