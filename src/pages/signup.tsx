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
import { useAuth } from "@/auth/auth-provider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "@/auth/url";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(50, { message: "Username in too long" }),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "Password is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export function SignUp() {
  const goTo = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={"/to-do"} />;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`${API_URL}/user/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
      }),
    })
      .then((response) => response.json())
      .then(() => goTo("/"))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="bg-gradient-to-b from-background from-15% to-primary/20 w-screen">
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
                            autoComplete="username"
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
                            type="password"
                            autoComplete="current-password"
                            {...field}
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
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="border-t font-light mt-5 pt-4 dark:border-primary/20 border-primary/40">
                <div className="flex">
                  <p className="font-semibold">Alredy have an acount? </p>
                  <a href="/" className="ps-[0.4em] underline text-primary">
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
