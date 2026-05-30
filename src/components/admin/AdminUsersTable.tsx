"use client";

import { useState } from "react";

const seededUsers = [
  { name: "Ayşe Yılmaz", email: "ayse@example.com", role: "Müşteri", orders: 8 },
  { name: "Mehmet Demir", email: "mehmet@example.com", role: "Müşteri", orders: 3 },
  { name: "Admin", email: "admin@bazar.commerce", role: "Yönetici", orders: 0 },
];

const roles = ["Müşteri", "Yönetici"];

export function AdminUsersTable() {
  const [roleMap, setRoleMap] = useState<Record<string, string>>({});

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
          <tr>
            <th className="px-4 py-3">Ad</th>
            <th className="px-4 py-3">E-posta</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3 text-right">Sipariş</th>
          </tr>
        </thead>
        <tbody>
          {seededUsers.map((user) => (
            <tr key={user.email} className="border-t border-neutral-100">
              <td className="px-4 py-4 font-medium text-black">{user.name}</td>
              <td className="px-4 py-4 text-neutral-500">{user.email}</td>
              <td className="px-4 py-4">
                <select
                  value={roleMap[user.email] ?? user.role}
                  onChange={(event) => setRoleMap((current) => ({ ...current, [user.email]: event.target.value }))}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-black outline-none"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 text-right text-neutral-500">{user.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
