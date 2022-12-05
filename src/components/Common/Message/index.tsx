import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message: React.FC = () => {
  return (
    <>
      {toast("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })}
    </>
  );
};

export default Message;
