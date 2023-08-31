import { ReactNode } from "react";
import NavBar from "./NavBar";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  return (
    <>
      <NavBar />
      <main>{props.children}</main>
    </>
  );
};

export default Wrapper;
