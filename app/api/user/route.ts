import { authors } from "@/lib/utils/fakeDatabase";

export async function GET() {
  return Response.json(authors.slice(-1)[0]);
}
