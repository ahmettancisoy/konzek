import { RootState } from "@/lib/store";
import Link from "next/link";
import { useSelector } from "react-redux";

interface Props {
  href: string;
  text: string;
}

const NavLink: React.FC<Props> = ({ href, text }) => {
  const secondaryColor = useSelector(
    (state: RootState) => state.themeColor.secondaryColor
  );
  return (
    <Link className={`${secondaryColor.textHover} transition-all`} href={href}>
      {text}
    </Link>
  );
};

export default NavLink;
