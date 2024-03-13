"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { token, roles } = useSelector((state: RootState) => state.context);

  const router = useRouter();

  useEffect(() => {
    if (token === null || !roles.includes("admin"))
      router.replace("/authentication-and-role");
  }, []);

  return token !== null && roles.includes("admin") ? (
    <div>You can view this page as an admin!</div>
  ) : null;
};

export default page;
