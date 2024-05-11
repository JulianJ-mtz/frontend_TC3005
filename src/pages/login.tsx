import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";

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
import { useAuth } from "@/auth/auth-provider";
import { Navigate } from "react-router-dom";
import { API_URL } from "@/auth/url";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(5).max(20),
  email: z.string(),
});

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

    console.log(values);
  }

  return (
    <>
      <div className="bg-gradient-to-b from-background from-15% to-primary/20">
        <div className="flex flex-col justify-center items-center h-screen">
          <Card className="w-[70%] md:w-[50%] lg:w-[45%] h-auto transition-all bg-card/95 backdrop-blur-lg dark:border-primary/20 border-primary/40">
            <CardHeader>
              <CardTitle className=" font-bold text-xl text-center">
                Log In
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            className="border-primary/20  dark:border-primary/10"
                            placeholder="Username"
                            {...field}
                            // onChange={(e) => setUsername(e.target.value)}
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
                  <p className="font-semibold">No Acount? </p>
                  <a
                    href="signup"
                    className="ps-[0.4em] underline text-primary"
                  >
                    Sing up here
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
