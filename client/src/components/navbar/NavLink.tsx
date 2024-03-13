"use client";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  text: string;
}

const NavLink: React.FC<Props> = ({ href, text }) => {
  const secondaryColor = useSelector(
    (state: RootState) => state.themeColor.secondaryColor
  );

  const pathname = usePathname();
  return (
    <Link
      className={`${secondaryColor.textHover} transition-all ${
        pathname === href || "/" + pathname.split("/")[1] === href
          ? secondaryColor.active
          : ""
      }`}
      href={href}
    >
      {text}
    </Link>
  );
};

export default NavLink;
