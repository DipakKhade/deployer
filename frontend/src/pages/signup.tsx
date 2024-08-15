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
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export default function Signup() {
  const [email, SetEmail] = useState<string>("");
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
              <Card className="p-8 shadow-none border-none">
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
                      onChange={(e) => SetEmail(e.target.value)}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={async () => {
                          const r = await axios.post(
                            `${BACKEND_URL}/api/v1/user/signup`,
                            {
                              email,
                            }
                          );
                          console.log(r);
                        }}
                        className="w-full"
                      >
                        Verify Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Link sended on {email}</DialogTitle>
                        <DialogDescription>
                         go to your Gmail and click on the verfication URL , to verfiy your mail
                        </DialogDescription>
                      </DialogHeader>
                      
                      <DialogFooter>
                        <Button>
                          <a href="https://mail.google.com/mail/u/1/#inbox">
                          Go to Gmail
                          </a>
                          </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
