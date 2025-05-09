"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSignIn } from "@/services/api/auth";

const formSchema = z.object({
  username: z.string().nonempty({
    message: "Please enter your username.",
  }),
  password: z.string().nonempty({
    message: "Please enter your password.",
  }),
});

export default function Home() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {setLoginForm, isPending, mutate} = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmitLogin = React.useCallback((username: string, password: string) => {
    mutate({username, password})
  }, [mutate])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoginForm({
      username: values.username,
      password: values.password,
    });

    handleSubmitLogin(values.username, values.password)
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-[400px] mx-auto border-none">
        <CardHeader className="flex items-center justify-center mt-[20px]">
          <CardTitle>Logo</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Input username" {...field} />
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Input Password"
                          icon={
                            showPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeOff className="w-5 h-5" />
                            )
                          }
                          onIconClick={() => setShowPassword((prev) => !prev)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                type="submit"
                disabled={isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <span>
            Don't have an account?
            <Link href="/auth/signup" className="text-blue-600 text-base underline ml-2">
              Register
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
