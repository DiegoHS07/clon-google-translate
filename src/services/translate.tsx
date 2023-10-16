import { FromLanguage, Language } from "../types.d";

const API_URL = "https://text-translator2.p.rapidapi.com/translate";

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage,
  toLanguage: Language,
  text: string
  }) {
  
  if(fromLanguage === toLanguage) return text;
  
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      // "X-RapidAPI-Key": import.meta.env.API_URL,
      "X-RapidAPI-Key": "43a48ef337msh881295bf470b267p171ecbjsn7040e65a684a",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    }, 
    body: new URLSearchParams({
      source_language: fromLanguage,
      target_language: toLanguage,
      text: text,
    }),
  }

  const response = await fetch(API_URL, options)
  const result = await response.json()
  return result.data.translatedText
}
