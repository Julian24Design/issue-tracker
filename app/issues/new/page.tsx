"use client";

import {
  Button,
  Heading,
  Section,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { FormEvent } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewIssuePage() {
  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   // Prepare payload
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const payload = JSON.stringify(Object.fromEntries(formData.entries()));
  //   // Send request and receive response
  //   const response = await fetch("/api/issues", {
  //     method: "POST",
  //     body: payload,
  //   });
  //   // Process response
  //   if (!response.ok) throw new Error("Response is not ok.");
  //   const data = await response.json();
  //   console.log(data);
  // }

  type IssueForm = {
    title: string;
    description: string;
  };

  const { register, control, handleSubmit } = useForm<IssueForm>();

  const router = useRouter();

  return (
    <Section>
      <Heading>New issue</Heading>
      <form
        className="space-y-6 mt-10"
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/issues", data);
          router.push("/issues");
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title", { required: true, maxLength: 5 })}
        ></TextField.Root>
        <Controller
          name="description"
          rules={{ required: true, maxLength: 50 }}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        ></Controller>
        <Button type="submit">Submit</Button>
      </form>
    </Section>
  );
}
