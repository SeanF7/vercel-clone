const user = {
  name: "Sean Firsching",
  avatar: "https://avatar.vercel.sh/seanfirsching",
};
export async function GET() {
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
