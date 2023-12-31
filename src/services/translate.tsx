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
      "X-RapidAPI-Key": import.meta.env.VITE_KEY_API,
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
