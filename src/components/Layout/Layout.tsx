import { ReactNode, FC, ReactElement } from "react";

import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import "./layout.css";

type LayoutProps = {
  children?: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }): ReactElement => {
  return (
    <div className="min-w-full min-h-screen h-screen overflow-hidden bg-orange-100 pattern-bg__charlieBrown">
      <Topbar />
      <Sidebar />
      <main className="pl-16 pt-16">{children}</main>
    </div>
  );
};

export default Layout;
