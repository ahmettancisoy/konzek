"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import NavLink from "@/components/navbar/NavLink";
import NavHeader from "@/components/navbar/NavHeader";
import { usePathname } from "next/navigation";
import Logout from "@/components/mid/authentication-and-role/Logout";

export default function AuthRoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const secondaryColor = useSelector(
    (state: RootState) => state.themeColor.secondaryColor
  );

  const roles = useSelector((state: RootState) => state.context.roles);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {roles.includes("user") ? (
        <div className="grid grid-cols-12 px-12">
          <div className="text-xl font-extralight text-center p-2 col-span-11">
            {`Hello ${
              roles.includes("admin") ? "admin" : "user"
            }, you can now visit
            ${roles.includes("admin") ? "both pages" : '"user" page'}.`}
          </div>
          <Logout />
        </div>
      ) : (
        <div className="text-xl font-extralight text-center p-2">
          Hello guest, if you would like to visit pages, please register or
          login.
        </div>
      )}
      <div className="flex space-x-6 px-12 py-6 h-full max-h-[calc(100%-4rem)]">
        <div className="bg-white rounded-md p-2 shadow-sm h-fit">
          <NavHeader value="Pages" />
          <ul className="text-sm pt-2 mx-6 text-slate-500 pb-6 space-y-2">
            <li>
              <NavLink href="/authentication-and-role/user" text="User" />
            </li>
            <li>
              <NavLink href="/authentication-and-role/admin" text="Admin" />
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-md p-12 shadow-sm w-full overflow-auto scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
