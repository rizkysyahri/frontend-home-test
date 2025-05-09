"use client";

import React, { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditCategoryById, useGetCategory } from "@/services/api/category";
import { useCategoriesStore } from "@/stores/use-category-store";

type PageProps = { params: { id: string } };

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category field cannot be empty",
  }),
});
const Page = ({ params }: PageProps) => {
  const { mutate } = useEditCategoryById(params.id);
  const { categories, setCategories, setPagination } = useCategoriesStore();
  const { data } = useGetCategory();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setCategories(data.categories),
        setPagination(data.currentPage, data.totalPages, data.totalData);
    }
  }, [data, setCategories, setPagination]);

  const category = useMemo(() => {
    return categories.find((cat) => cat.id === params.id);
  }, [categories, params]);

  const handleClose = () => {
    router.back();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category ? category.name : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    mutate({ name: values.name });
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex flex-col">
          <span>Edit Category</span>
          <div className="grid gap-4 mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Input category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
      </div>
    </>
  );
};

export default Page;
