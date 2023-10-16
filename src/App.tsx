import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useParams } from './hooks/useParams'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from "./constants"
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from '../src/services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  
  const { loading, fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useParams()
  
  const debouncedFromText = useDebounce(fromText)

  const handlerClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handlerSpeaker = () => { 
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debouncedFromText === '') return 

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error')})
  },[debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h1>Clon Google Translate</h1>
      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea    
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <div style={{ position: "relative" }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div style={{ position: "absolute", right: 0, bottom: 0, display: "flex" }}>
                <Button
                  variant="link"
                  onClick={handlerClipboard}
                  title="Copiar Texto"
                >
                  <ClipboardIcon/>
                </Button>
                <Button
                  variant="link"
                  onClick={handlerSpeaker}
                  title="Copiar Texto"
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
