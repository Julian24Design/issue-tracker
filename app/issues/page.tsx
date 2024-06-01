import React from "react";
import { Button, Section } from "@radix-ui/themes";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Page() {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <Section>
        <Link href="/issues/new">
          <Button size="3">Add issue</Button>
        </Link>
      </Section>
      <Section>{issues.length ? "Some data..." : "No data"}</Section>
    </>
  );
}
