import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Signup() {
  return (
    <>
      <main className="min-h-screen">
        <div className="flex">
          {/* left side */}
          <div className="bg-purple-600 min-h-screen w-[50vw]">
            <div>
              <span className="text-slate-50 text-3xl font-bold p-4">
                deployer
              </span>
              <div className="flex">asd</div>
            </div>
          </div>

          {/* right side */}
          <div className="">
            <div className="flex justify-end">
              <Button className="bg-white text-slate-600 shadow-none hover:bg-purple-100">
                Login
              </Button>
            </div>

            <div className="m-auto pl-[12vw] pt-[10vw]">
              <Card className="p-8">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Create an account</CardTitle>
                  <CardDescription>
                    Enter your email below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create account</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
