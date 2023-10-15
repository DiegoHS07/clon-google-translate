import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useParams } from './hooks/useParams'


function App() {
  const {fromLanguage, setFromLanguage} = useParams()
  return (
    <div className='App'>
      <h1>Clon google translate</h1>
      <button onClick={() => {
        setFromLanguage('es')
      }}>Cambiar a Español</button>
      {fromLanguage}
    </div>
  )
}

export default App
