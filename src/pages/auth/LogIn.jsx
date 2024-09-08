import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE } from "@/utils/constants";
import { toast } from "sonner";

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
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    try {
      const response = await apiClient.post(LOGIN_ROUTE, values);
      if (response.status === 200) {
        toast.success("Login successful");
        if(response.data.user.setupProfile) 
        navigate("/profile");
        else navigate("/chat");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-5">
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
        <Button className="rounded-full p-6" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
