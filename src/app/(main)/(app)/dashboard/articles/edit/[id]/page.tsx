"use client";

import { ArrowLeft } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { InputDefault } from "@/components/ui/input-default";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import MenuBar from "@/features/dashboard/articles/components/menu-bar";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateArticle,
  useGetArticleById,
  useUpdateArticleById,
} from "@/services/api/article";
import { useCategoriesStore } from "@/stores/use-category-store";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

type PageProps = { params: { id: string } };

const formSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  category: z.string({ required_error: "Please select category" }),
  content: z.string().min(1, { message: "Content field cannot be empty" }),
});

const Page = ({ params }: PageProps) => {
  const [wordCount, setWordCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = useCategoriesStore((state) => state.categories);
  const { mutate, isPending } = useUpdateArticleById(params.id);
  const { data } = useGetArticleById(params.id);
  const fetchCategory = useCategoriesStore((state) => state.fetchCategory);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      category: data?.categoryId || data?.category?.id || "",
      content: data?.content || "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      form.setValue("content", editor.getHTML());
      const text = editor.getText().trim();
      const characters = text.length;
      setWordCount(characters);
    },
    editorProps: {
      attributes: {
        class: "min-h-[437px] py-2 px-3 prose",
      },
    },
  });

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    if (data && editor) {
      console.log("Data dari useGetArticleById:", data); // Debug struktur data
      const categoryId = data.categoryId || data.category?.id || "";
      const contentValue = data.content || "";
      form.reset({
        title: data.title || "",
        category: categoryId,
        content: contentValue,
      });
      editor?.commands.setContent(contentValue);
    }
  }, [data, form, editor]);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      (file && file.type === "image/jpg") ||
      file?.type === "image/png" ||
      file?.type === "image/jpeg"
    ) {
      setSelectedImage(file);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please upload a valid JPG or PNG file.",
      });
    }
  };

  const handleDeleteImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted!", values);

    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    mutate({
      title: values.title,
      categoryId: values.category,
      content: values.content,
      formData,
    });
  }

  return (
    <div className="bg-gray-50 rounded-xl">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" onClick={() => router.back()} />
          <span>Create Article</span>
        </div>
        <div className="mt-4">
          <Label>Thumbnail</Label>
          <div className="mt-2 relative">
            <div className="relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed bg-white rounded-lg text-center w-56 h-44 overflow-hidden">
              {selectedImage || data?.imageUrl ? (
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : data?.imageUrl ?? ""
                  }
                  alt="Preview"
                  className="absolute inset-0 w-full h-36 object-cover p-4 rounded-md"
                />
              ) : (
                <>
                  <ImagePlus className="w-5 h-5" />
                  <span className="text-xs mt-2 text-gray-500 underline">
                    Click to select files
                  </span>
                  <span className="text-xs text-gray-400">
                    Support File Type: jpg or png
                  </span>
                </>
              )}
              <div className="flex gap-2 mt-28">
                <Button
                  className="text-blue-600"
                  type="button"
                  variant="link"
                  onClick={handleClickUpload}
                  disabled={isPending}
                >
                  Change
                </Button>
                <Button
                  type="button"
                  className="text-red-600"
                  variant="link"
                  onClick={handleDeleteImage}
                  disabled={isPending || (!selectedImage && !data?.imageUrl)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <InputDefault
              type="file"
              ref={fileInputRef}
              accept="image/jpg, image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Title</FormLabel>
                    <FormControl className="bg-white">
                      <InputDefault placeholder="Input title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((category) => (
                            <>
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            </>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This existing category list can be seen in the{" "}
                      <Link href="#" className="text-blue-600 underline">
                        category
                      </Link>{" "}
                      menu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div className="border rounded-md bg-gray-50">
                        <MenuBar editor={editor} />
                        <EditorContent
                          editor={editor}
                          className="min-h-[300px] max-h-[500px] overflow-y-auto"
                        />
                        <div className="p-4 border-t bg-white">
                          <div className="text-sm text-gray-500 mt-1">
                            {wordCount}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end justify-end gap-2 mt-4">
                <Button type="submit" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-slate-200 hover:bg-slate-300 text-black"
                >
                  Preview
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
