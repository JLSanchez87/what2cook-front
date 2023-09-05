import { ReactNode } from "react";
import NavBar from "./NavBar";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  return (
    <>
      <NavBar />
      <main className="flex flex-col justify center items-center mx-auto max-w-[85%]">
        {props.children}
      </main>
    </>
  );
};

export default Wrapper;
