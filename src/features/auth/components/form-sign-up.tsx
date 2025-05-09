"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSignUp } from "@/services/api/auth";

const formSchema = z.object({
  username: z.string().nonempty({
    message: "Please field cannot be empty.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  role: z.string(),
});

export default function FormSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isPending, setRegisterForm } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const handleSubmitRegister = React.useCallback(
    (username: string, password: string, role: string) => {
      mutate({ username, password, role });
    },
    [mutate]
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setRegisterForm({
      username: values.username,
      password: values.password,
      role: values.role,
    });

    handleSubmitRegister(values.username, values.password, values.role)
  }

  return (
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <span>
          Already have an account?
          <Link href="/" className="text-blue-600 text-base underline ml-2">
            Login
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
