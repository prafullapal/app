import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VERIFY_EMAIL_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
export default function OTP({ email }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
    email: email,
      otp: "",
    },
  });

  const handleOTPVerify = async (values) => {
    try {
      const response = await apiClient.post(VERIFY_EMAIL_ROUTE, values);
      if (response.status === 200) {
        toast.success("OTP verification successful");
        navigate("/");
      }
      
    } catch (error) {
      toast.error("OTP verification failed!");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOTPVerify)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="rounded-full p-6" type="submit">Verify OTP</Button>
      </form>
    </Form>
  );
}
