let messages = [];

export function GET() {
  return new Response(JSON.stringify(messages), {
    status: 200,
  });
}

export async function POST(req) {
  const body = await req.json();
  messages.push({ ...body, date: new Date().toISOString() });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
