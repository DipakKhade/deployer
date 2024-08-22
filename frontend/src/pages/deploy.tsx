import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import Appbar from "../components/AppBar"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { axios_ } from "../lib/api"
import { BACKEND_URL } from "../lib/utils"


export default function  Deploy(){
    const [giturl , SetGiturl ] = useState<string>('')

    return<>
        <Appbar/>
    <main className="m-auto flex justify-center mt-24">
        <Card className="w-96 p-4 space-y-4">
            <Input
            onChange={(e)=>SetGiturl(e.target.value)}
            placeholder="Import Git Repository"/>
            <Button
            onClick={async()=>{
                const res = await axios_.post(`${BACKEND_URL}/api/v1/upload/gitrepo`,{
                    gitrepourl:giturl
                },{
                    withCredentials:true
                })
                console.log(res)
            }} 
            >deploy</Button>
        </Card>

    </main>
    </>
}