import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import useUpdateProfile from "@/hooks/useUpdateProfile"
import useAuth from "@/hooks/useAuth"
import { useFetchUserData } from "@/hooks/useFetchUserData"

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  description: z.string().optional(),
  location: z.string(),
})

export default function ProfileForm({ userData, setIsUpdating }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userData?.user?.name,
      email: userData?.user?.email,
      description: userData?.user?.description,
      location: userData?.user?.location,
    },
  })

  const { user } = useAuth();
  const { updateProfile, error } = useUpdateProfile();
  const { refreshUserData } = useFetchUserData(user._id);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      return;
    }

    const updatedProfile = await updateProfile(data, user?._id);
    console.log(data);

    if (updatedProfile) {
      refreshUserData();
      setIsUpdating(false);
      window.location.reload();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-10 w-4/5 xl:w-3/5 mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Your location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}