import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"


export default function Hero(){
    const navigate =useNavigate()

    return<>
    <main>
    <div className="text-5xl font-bold h-[200px] flex justify-center pt-12">
        Deploy Your code in Single <span className="text-purple-600"> &nbsp; Click</span>
    </div>
    <div className="flex justify-center">
        <Button
        onClick={()=>navigate('/deploy')}
        >Upload Your Code</Button>
    </div>
    </main>
    </>
}