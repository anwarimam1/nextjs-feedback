"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  async function fetchFeedback() {
    const res = await fetch("/api/feedback");
    const json = await res.json();
    setFeedbacks(json.data || []);
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    } else {
      setSuccess("Feedback submitted!");
      setName("");
      setMessage("");
      fetchFeedback();
    }

    setLoading(false);
  }

  const filtered = feedbacks.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.message.toLowerCase().includes(search.toLowerCase())
  );

  const isInvalid = !name || message.length < 10;

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1>Feedback App</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <textarea
          placeholder="Feedback (10–200 chars)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p>{message.length}/200</p>

        <button disabled={loading || isInvalid}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <hr />

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p>No feedback yet</p>}

      {filtered.map(f => (
        <div
          key={f.id}
          style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}
        >
          <b>{f.name}</b>
          <p>{f.message}</p>
        </div>
      ))}
    </div>
  );
}