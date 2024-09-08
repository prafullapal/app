import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";
import { useState } from "react";
import { toast } from "sonner";
import InputOTPField from "./OTP";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignUp() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = async (values) => {
    try {
      const response = await apiClient.post(SIGNUP_ROUTE, values);
      if (response.status === 200) {
        toast.success("Signup successful");
        setIsSignedUp(true);
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  if (isSignedUp) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center">
        <p>Check your email for verification</p>
        <InputOTPField email={
            form.getValues("email")
        }/>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              placeholder="Email"
              type="email"
              className="rounded-full p-6"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              placeholder="Password"
              type="password"
              className="rounded-full p-6"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              placeholder="Confirm Password"
              type="password"
              className="rounded-full p-6"
              {...field}
            />
          )}
        />
        <Button className="rounded-full p-6" type="submit">
          Signup
        </Button>
      </form>
    </Form>
  );
}
