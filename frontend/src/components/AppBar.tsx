import { Button } from "./ui/button";
import { useCookies } from "react-cookie";

export default function Appbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coockie , setCookie , removeCookie] = useCookies(['Authorization']);

  return (
    <>
      <nav className="flex justify-between h-12 w-full border border-slate-300 p-2">
        <div>Deployer</div>
        <Button
        onClick={()=>{
          removeCookie('Authorization')
        }}
        >log out</Button>
      </nav>
    </>
  );
}
