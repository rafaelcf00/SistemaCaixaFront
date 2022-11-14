import Link from "next/link";

interface ButtonProps {
  label: string;
  customClass?: string;
  onClick?: any;
}

const ButtonSubmit: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`p-3 rounded-md text-white text-center text-md w-full transition duration-700 ${props.customClass}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default ButtonSubmit;
