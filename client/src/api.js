import axios from "axios"
import { LANGUAGE_VERSIONS } from "./constants"

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston/"
})

export const executeCode = async (language,code, input) => {
    const response = await API.post("/execute",{
        "language": language,
        "version": LANGUAGE_VERSIONS[language],
        "files": [
            {
                "content": code
            }
        ],
        "stdin": input
    })
    return response.data
}