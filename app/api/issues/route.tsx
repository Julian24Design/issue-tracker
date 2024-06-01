import { PrismaClient, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  // Receive request
  const body = await request.json();
  console.log("Request body:", body);
  // Process request
  // validate request
  // instantiate Prisma Client
  const prisma = new PrismaClient();
  // 3. write to db
  try {
    const issue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    // Send response
    console.log("Created successfully!", issue);
    return Response.json(issue);
  } catch (error) {
    // handle db error
    console.error(error.message);
    return Response.json(error.message);
  }
}
