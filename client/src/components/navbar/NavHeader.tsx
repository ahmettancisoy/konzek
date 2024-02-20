import { HeaderDivider } from "./HeaderDivider";

interface Props {
  value: string;
}

const NavHeader: React.FC<Props> = ({ value }) => {
  return (
    <>
      <h1 className="text-lg mx-4 text-slate-900 select-none">{value}</h1>
      <HeaderDivider />
    </>
  );
};

export default NavHeader;
