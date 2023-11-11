const user = {
  name: "Sean Firsching",
  avatar: "https://avatar.vercel.sh/seanfirsching",
};
export async function GET() {
  return Response.json(user);
}
