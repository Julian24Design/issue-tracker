"use client"

import { Button, Callout, Heading, Section, TextField } from "@radix-ui/themes"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import React from "react"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createIssueSchema } from "@/app/validationSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMsg from "@/app/ui/ErrorMsg"

type Inputs = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({ resolver: zodResolver(createIssueSchema) })

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("Submit data", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Section>
      <Heading>New issue</Heading>
      <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <TextField.Root
            placeholder="Title"
            {...register("title")}
          ></TextField.Root>
          <ErrorMsg>{errors.title?.message}</ErrorMsg>
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          ></Controller>
          <ErrorMsg>{errors.description?.message}</ErrorMsg>
        </div>
        <Button
          size="3"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Section>
  )
}
