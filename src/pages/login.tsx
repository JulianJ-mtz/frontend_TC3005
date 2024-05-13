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
import { useAuth } from "@/auth/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "@/auth/url";
import { AuthResponse, AuthResponseError } from "@/types/types";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(50, { message: "Username in too long" }),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "Password is too short" }),
});

export function Login() {
  const goTo = useNavigate();
  const [errorResponse, setErrorResponse] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${API_URL}/user/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: values.password,
          username: values.username,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        setErrorResponse("");

        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/to-do");
        }
      } else {
        console.log("Something went wrong");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        throw new Error(`Error submitting form: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={"/to-do"} />;
  }

  return (
    <>
      <div className="bg-gradient-to-b from-background from-15% to-primary/20 w-screen">
        <div className="flex flex-col justify-center items-center h-screen">
          <Card className="w-[70%] md:w-[50%] lg:w-[45%] h-auto transition-all bg-card/95 backdrop-blur-lg dark:border-primary/20 border-primary/40">
            <CardHeader>
              <CardTitle className=" font-bold text-xl text-center">
                Log In
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!!errorResponse && (
                <div className=" text-center text-xs text-destructive">
                  {errorResponse}
                </div>
              )}

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
                            autoComplete="username"
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
                            type="password"
                            autoComplete="current-password"
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

                      className="w-full dark:border-primary/20 border-primary"
                    >
                      Submit
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
