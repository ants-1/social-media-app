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
import useAddComment from "@/hooks/useAddComment"
import { useFetchAllComments } from "@/hooks/useFetchAllComments"
import useAuth from "@/hooks/useAuth"
import { CommentFormProps } from "@/types/CommentFormProps"

const FormSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Comment must be at least 2 characters.",
    })
    .max(100, {
      message: "Comment must not be longer than 100 characters.",
    }),
})

export function CommentForm({ postId }: CommentFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { user } = useAuth();
  const { createComment, error } = useAddComment();
  const { refreshComments } = useFetchAllComments(postId);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      return;
    }
    const newComment = { author: user._id, text: data.text };
    const createdComment = await createComment(newComment, postId);
    
    if (createdComment) {
      refreshComments();
      form.reset({ text: "" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 xl:w-3/5 space-y-6 max-w-[32rem]">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your comment here..."
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
