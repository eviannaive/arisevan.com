"use client";
export default function Page() {
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const payload = {
      username,
      password,
    };
    const data = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(data);
  };
  return (
    <>
      <form action={handleSubmit}>
        <input name="username" className="border border-blue" />
        <input name="password" className="border border-blue" />
        <button>submit</button>
      </form>
    </>
  );
}
