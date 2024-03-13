"use client";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUsers } from "@/lib/features/auth/authSlice";

const page = () => {
  const { token, roles, users } = useSelector(
    (state: RootState) => state.context
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const getUsers = async () => {
    if (token !== null || roles.includes("admin")) {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/users`,
          { headers }
        );

        dispatch(setUsers(response.data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (token === null || !roles.includes("user"))
      router.replace("/authentication-and-role");
    if (token !== null && roles.includes("admin")) getUsers();
  }, []);

  return token !== null && roles.includes("user") ? (
    <div>
      {roles.includes("admin") ? (
        <div className="flex space-x-4">
          <table cellPadding={5} cellSpacing={5}>
            <thead>
              <th className="border p-2">Username</th>
              <th className="border p-2">Roles</th>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.roles.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{`Only admin role has access to "${process.env.NEXT_PUBLIC_SERVER_URI}/users". Users can't see this.`}</div>
        </div>
      ) : (
        <div>Welcome to users page!</div>
      )}
    </div>
  ) : null;
};

export default page;
