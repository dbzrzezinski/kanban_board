import { ReactNode, FC, ReactElement } from "react";

import Topbar from "../Topbar/Topbar";
import "./layout.css";

type LayoutProps = {
  children?: ReactNode;
  setSearchValue: (value: string) => void;
};

const Layout: FC<LayoutProps> = ({
  children,
  setSearchValue,
}): ReactElement => {
  return (
    <div className="min-w-full min-h-screen h-screen overflow-y-scroll bg-orange-100 pattern-bg__charlieBrown">
      <Topbar setSearchValue={setSearchValue} />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default Layout;
