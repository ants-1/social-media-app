import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddPost from "@/hooks/useAddPost";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFetchHomePosts } from "@/hooks/useFetchHomePosts";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";


const FormSchema = z.object({
  post: z
    .string()
    .max(160, {
      message: "Post must not be longer than 160 characters.",
    })
    .optional(),
  imgUrl: z.any().optional(),
});

export function PostForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { createPost, error } = useAddPost();
  const { refreshPosts } = useFetchHomePosts();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    
    if (data.post) {
      formData.append("content", data.post);
    }

    if (data.imgUrl && data.imgUrl[0]) {
      formData.append("imgUrl", data.imgUrl[0]);
    }

    const createdPost = await createPost(formData);

    if (createdPost) {
      refreshPosts();
      form.reset({ post: "", imgUrl: "" });
    }
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 xl:w-3/5 space-y-4 max-w-[32rem]" encType="multipart/form-data">
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

        <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <CiImageOn size={24} className="cursor-pointer" onClick={handleIconClick} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                    className="hidden"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
