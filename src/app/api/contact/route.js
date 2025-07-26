// src/app/api/contact/route.js

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
    });
  }

  console.log('New message received:', body);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}


