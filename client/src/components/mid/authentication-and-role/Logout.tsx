import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setContext } from "@/lib/features/auth/authSlice";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(setContext({ token: "", roles: [], users: [] }));
    router.push("/authentication-and-role");
  };
  return (
    <button
      className="bg-red-400 text-white rounded-full px-4 py-2 col-span-1 w-fit place-self-end"
      type="button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
