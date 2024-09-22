import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useAddPost from "@/hooks/useAddPost"

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
import { useFetchHomePosts } from "@/hooks/useFetchHomePosts"


const FormSchema = z.object({
  post: z
    .string()
    .min(2, {
      message: "Post must be at least 2 characters.",
    })
    .max(160, {
      message: "Post must not be longer than 160 characters.",
    }),
})

export function PostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { createPost, error } = useAddPost();
  const { refreshPosts } = useFetchHomePosts();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newPost = { content: data.post };
    const createdPost = await createPost(newPost);

    if (createdPost) {
      refreshPosts();
      form.reset({ post: "" }); 
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 xl:w-3/5 space-y-6">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Post</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your post here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  )
}
