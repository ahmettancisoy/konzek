"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import LoginRegister from "@/components/mid/authentication-and-role/LoginRegister";

const page = () => {
  const router = useRouter();

  const [hasUsers, setHasUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInserting, setIsInserting] = useState(false);

  const { token, roles } = useSelector((state: RootState) => state.context);

  const checkUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/users/count`
      );

      if (response.data > 0) setHasUsers(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token !== undefined && token !== null && token !== "") {
      if (roles.includes("admin"))
        router.replace("/authentication-and-role/admin");
      else if (roles.includes("user"))
        router.replace("/authentication-and-role/user");
    }

    checkUsers();
  }, []);

  const handleInsert = async () => {
    setIsInserting(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/signup`;
      const response = await Promise.all([
        axios.post(url, {
          name: "user",
          password: "1234",
          roles: ["user"],
        }),
        axios.post(url, {
          name: "admin",
          password: "1234",
          roles: ["admin", "user"],
        }),
      ]);

      setIsInserting(false);
      setHasUsers(true);
    } catch (err) {
      console.error(err);
      setIsInserting(false);
    }
  };

  return (
    <>
      {token === null || !roles.includes("user") ? (
        <div>
          {isLoading ? (
            "loading"
          ) : (
            <div className="flex h-full">
              <LoginRegister />
              {hasUsers ? null : (
                <>
                  <div className="border-r border-r-slate-200 mx-4 w-4"></div>
                  <div className="p-2 flex flex-col">
                    <div className="flex space-x-4">
                      <table className="border text-slate-500">
                        <tbody>
                          <tr className="border">
                            <td className="px-2">Username:</td>
                            <td className="px-2">user</td>
                          </tr>
                          <tr>
                            <td className="px-2">Password:</td>
                            <td className="px-2">1234</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="border text-slate-500">
                        <tbody>
                          <tr className="border">
                            <td className="px-2">Username:</td>
                            <td className="px-2">admin</td>
                          </tr>
                          <tr>
                            <td className="px-2">Password:</td>
                            <td className="px-2">1234</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      className={`bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900 transition-colors rounded-md p-2 mt-4 w-fit self-end ${
                        isInserting ? "cursor-not-allowed" : ""
                      }`}
                      type="button"
                      onClick={handleInsert}
                      disabled={isInserting}
                    >
                      {isInserting ? "Loading..." : "Insert"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default page;
