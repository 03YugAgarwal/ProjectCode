import { useState } from "react"
import { executeCode } from "../../api"


const SAMPLE_INPUT = "* * * * \n* * * * \n* * * * \n* * * * \n"

const CodeOutput = ({editorRef,language}) => {
  
    const [output,setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [passed, setPassed] = useState(false)

    const onCode = async () => {
        const code = editorRef.current.getValue()
        if(!code) return
        try{
            setIsLoading(true)
            const {run: result} = await executeCode(language,code)
            
            setOutput(result.output.split("\n"))
            if(result.output == SAMPLE_INPUT){
                setPassed(true)
            }
            console.log(result);
            
        }catch(error){
            console.error(error)
            setIsLoading(false)
        }
    }
  
    return (
    <>
        <h3>Output</h3>
        <button onClick={onCode}>Run Code</button>
        <div>
            {
                output ? 
                output.map((line,i)=>{
                    return <div key={i}>{line}</div>
                })
                : "Click Run Code to see the output here"
            }
        </div>
        <div>
            {passed ? "passed" : "failed"}
        </div>
    </>
  )
}

export default CodeOutput