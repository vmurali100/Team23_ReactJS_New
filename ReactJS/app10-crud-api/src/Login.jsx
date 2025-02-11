import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getToken = async () => {
    const payLoad = {
      email: "shop@shop.com",
      password: "123456",
      businessId: 1,
      posId: 8,
      channelDeviceId: "123",
      fcmToken: "cashier registration code...",
      channelversion: "1",
    };
    const credentials = btoa("user:user@123");

    const response = await fetch(
      "https://demo.onhand.in/posapiv2/v3/account/Activate/POS",
      {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );

    const info = await response.json();
    console.log(info)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email !== "shop@shop.com" || password !== "123") {
      setError("Invalid credentials");
      return;
    }

    const payload = {
      email,
      password,
      channelDeviceId: "0",
    };

    const credentials = btoa("user:user@123");

    const response = await fetch(
      "https://demo.onhand.in/posapiv2/v3/account/logon",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );
    const info = await response.json();
    getToken();
    console.log(info);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
