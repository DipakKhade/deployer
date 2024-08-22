import { BACKEND_URL } from "../lib/utils"
import { Button } from "./ui/button"
import { axios_ } from "../lib/api"


export default function Hero(){

    return<>
    <main>
    <div className="text-5xl font-bold h-[200px] flex justify-center pt-12">
        Deploy Your code in Single <span className="text-purple-600"> &nbsp; Click</span>
    </div>
    <div className="flex justify-center">
        <Button
        onClick={async()=>{
            const res = await axios_.get(`${BACKEND_URL}`,{ withCredentials: true }  )
            console.log(res)

        }}
        >Upload Your Code</Button>
    </div>
    </main>
    </>
}