"use client";
import { useState, useEffect } from "react";
 
type User = {
  id: string;
  name: string;
  email: string;
};
 
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
 
  const fetchUsers = async () => {
    const res = await fetch("/api/getListUsers");
    const data = await res.json();
    setUsers(data);
  };
 
  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
 
    if (res.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    }
  };
 
  useEffect(() => {
    fetchUsers();
  }, []);
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <ul className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-center font-bold">List of Users</h3>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="border-b border-gray-200 py-2 text-center"
            >
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <li className="text-center">No users found</li>
        )}
      </ul>
    </div>
  );
}