import { type Action, type State } from "../types"
import { useReducer } from "react"

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
}

function reducer(state: State, action: Action): State {
  const { type } = action

  if (type === "INTERCHANGE_LANGUAGE") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    }
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    }
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    }
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return state
}

export function useParams() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguage = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGE" })
  }

  const setFromLanguage = (payload: string) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload: payload })
  }

  const setToLanguage = (payload: string) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload: payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload: payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload: payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
