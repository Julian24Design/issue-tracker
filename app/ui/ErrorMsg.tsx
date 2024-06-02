import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Callout } from "@radix-ui/themes"
import React, { PropsWithChildren } from "react"

export default function ErrorMsg({ children }: PropsWithChildren) {
  if (!children) return null
  return (
    <Callout.Root size="1">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  )
}
