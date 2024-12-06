import { NextResponse } from "next/server";


const HOST = process.env.API_SERVER_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = fetch(`${HOST}/api/user`, {
        method: 'POST',
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          password: body.password
        }),
        headers: { "Content-Type": "application/json" }
      })
    return NextResponse.json(res);
  } catch (error: any) {
  }
}