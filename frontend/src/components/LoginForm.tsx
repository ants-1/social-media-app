import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters.",
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setToken } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred during login.");
        return;
      }

      const data = await response.json();
      setToken(data.token);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/guest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred during login.");
        return;
      }

      const data = await response.json();

      // Set the guest data into the form and submit
      form.setValue("username", data.username);
      form.setValue("password", data.password);

      // Trigger form submission with guest credentials
      await onSubmit({ username: data.username, password: data.password });

    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTokenFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        setToken(token);
        navigate("/");
      }
    };

    fetchTokenFromUrl();
  }, [navigate, setToken]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-72 sm:w-96"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <div className="flex justify-between">
          <Button type="submit" className="w-1/3">
            Login
          </Button>

          <Link to="/sign-up" className="w-1/3">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <Button type="button" variant="destructive" className="w-full" onClick={handleGoogleLogin}>
          <FaGoogle /> <span className="ml-2">Google</span>
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={handleGuestLogin}>
          Guest
        </Button>
      </form>
    </Form>
  );
}
