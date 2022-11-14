import { ReactNode } from "react";
import Sidebar from "../../Sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import { Message } from "../Message";
import { Alert } from "../Message";

interface layoutProps {
  titulo?: string;
  children?: ReactNode;
  customClass?: string;
  mensagens?: Array<Alert>;
}

const Layout: React.FC<layoutProps> = ({
  titulo,
  children,
  customClass,
  mensagens,
}: layoutProps) => {
  return (
    <div className="bg-gray-200 grid grid-cols-7 h-full w-full">
      <Sidebar />
      <div
        className={`bg-gray-200 col-span-7 lg:col-span-6 lg:flex lg:justify-center lg:w-full rounded-lg my-14 mx-10 lg:mx-0`}
      >
        <div className="flex lg:hidden absolute top-0">
          <HiOutlineMenu className="text-2xl cursor-pointer my-4" />
        </div>
        <div className={`bg-white shadow-md w-full   ${customClass} `}>
          <div className="bg-gray-100 w-full px-8 py-4 shadow-lg">
            <h1 className="font-bold">{titulo}</h1>
          </div>
          <div className="px-8 py-4">
            {mensagens &&
              mensagens.map((msg) => <Message key={msg.texto} {...msg} />)}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
