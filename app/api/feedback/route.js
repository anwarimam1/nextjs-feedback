import { getFeedbacks, addFeedback } from "@/lib/store";
import { validateInput } from "@/lib/validate";

export async function GET() {
  const data = getFeedbacks().sort((a, b) => b.createdAt - a.createdAt);

  return Response.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  let { name, message } = body;

  // Normalize input
  name = name?.trim();
  message = message?.trim();

  // Validate
  const error = validateInput(name, message);
  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  // Duplicate check
  const exists = getFeedbacks().find(
    f =>
      f.name.toLowerCase() === name.toLowerCase() &&
      f.message.toLowerCase() === message.toLowerCase()
  );

  if (exists) {
    return Response.json({ error: "Duplicate feedback" }, { status: 400 });
  }

  const newEntry = {
    id: Date.now(),
    name,
    message,
    createdAt: Date.now(),
  };

  addFeedback(newEntry);

  return Response.json({ data: newEntry });
}