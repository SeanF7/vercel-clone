export async function GET() {
  const user = {
    name: "Sean Firsching",
    avatar: "https://avatar.vercel.sh/seanfirsching",
  };
  return Response.json(user);
}
