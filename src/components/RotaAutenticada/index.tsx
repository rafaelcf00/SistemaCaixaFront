import { useSession, signIn, signOut } from "next-auth/react";
import { Loader } from "../Common/Loader";

interface RotaAutenticadaProps {
  children: React.ReactNode;
}

export const RotaAutenticada: React.FC<RotaAutenticadaProps> = ({
  children,
}) => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <Loader show />;
  }

  if (!session) {
    signIn();
    return null;
  }

  return <div>{children}</div>;
};
