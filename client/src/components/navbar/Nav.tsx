"use client";
import NavHeader from "./NavHeader";
import ThemeColors from "./ThemeColors";
import { Colors } from "@/app/constants/themeColors";
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <div className="w-72 h-screen bg-white px-2 py-6 border-r">
      <NavHeader value="Junior" />

      <ul className="text-sm pt-2 mx-6 text-slate-500 pb-6">
        <li>
          <NavLink href="/" text="GraphQL & Filter" />
        </li>
      </ul>
      <NavHeader value="Mid-Level" />
      <ul className="text-sm pt-2 mx-6 text-slate-500 pb-6 space-y-2">
        <li>
          <NavLink href="/kanban-board" text="Kanban Board" />
        </li>
        <li>
          <NavLink href="/authentication-and-role" text="Auth & Role Based" />
        </li>
      </ul>
      <NavHeader value="Theme Colors" />
      <div className="pt-4 mx-6 flex gap-3">
        <ThemeColors
          baseColor={Colors.primary.rose}
          ringColor={Colors.secondary.rose}
        />
        <ThemeColors
          baseColor={Colors.primary.sky}
          ringColor={Colors.secondary.sky}
        />
        <ThemeColors
          baseColor={Colors.primary.lime}
          ringColor={Colors.secondary.lime}
        />
        <ThemeColors
          baseColor={Colors.primary.amber}
          ringColor={Colors.secondary.amber}
        />
      </div>
    </div>
  );
};

export default Nav;
