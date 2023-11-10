export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const user = {
    name: "Sean Firsching",
    avatar: "https://avatar.vercel.sh/seanfirsching",
  };
  return Response.json(user);
}
