import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "@/auth/auth-provider";
import { Navigate } from "react-router-dom";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Label } from "@/components/ui/label";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(50, { message: "Username in too long" }),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "Password is too short" }),
  email: z.string(),
});

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={"/to-do"} />;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.x

    setEmail(values.email);
    setPassword(values.password);
    setUsername(values.username);
    console.log(values);
  }

  return (
    <>
      <div className="bg-gradient-to-b from-background from-15% to-primary/20">
        <div className="flex flex-col justify-center items-center h-screen">
          <Card className="w-[70%] md:w-[50%] lg:w-[45%] h-auto transition-all bg-card/95 backdrop-blur-lg dark:border-primary/20 border-primary/40">
            <CardHeader>
              <CardTitle className=" font-bold text-xl text-center">
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="border-primary/20 dark:border-primary/10"
                            placeholder="Email"
                            {...field}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            className="border-primary/20  dark:border-primary/10"
                            placeholder="Username"
                            // onChange={(e) => setUsername(e.target.value)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="border-primary/20 dark:border-primary/10"
                            placeholder="Password"
                            {...field}
                            // onChange={(e) => setPassword(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      variant="default"
                      value="Submit"
                      className="w-full dark:border-primary/20 border-primary"
                    >
                      <a href="#">Submit</a>
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="border-t font-light mt-5 pt-4 dark:border-primary/20 border-primary/40">
                <div className="flex">
                  <p className="font-semibold">Alredy have an acount? </p>
                  <a
                    href="/"
                    className="ps-[0.4em] underline text-primary"
                  >
                    Log in here
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
