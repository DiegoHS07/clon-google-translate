import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"

test("My app works as expected, it shows TextArea, when the user types a text this is translated", async () => { 
    const user = userEvent.setup()
    const app = render(<App />)
    const textAreaFrom = app.getByPlaceholderText("Introducir texto")

    await user.type(textAreaFrom, "Hola mundo")
    const result = await app.findByDisplayValue(/Hello world/i,{}, {timeout: 5000})

    expect(result).toBeTruthy()
})