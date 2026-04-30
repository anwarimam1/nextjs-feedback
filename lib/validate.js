export function validateInput(name, message) {
  if (!name?.trim() || !message?.trim()) {
    return "All fields required";
  }

  if (message.trim().length < 10 || message.trim().length > 200) {
    return "Message must be 10–200 characters";
  }

  return null;
}