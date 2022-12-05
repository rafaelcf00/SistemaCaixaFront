import Link from "next/link";

interface ButtonProps {
  label: string;
  customClass?: string;
  href: string;
  onClick?: any;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Link href={props.href}>
      <div>
        <button
          className={`rounded-md text-white text-center text-md w-full transition duration-700 ${
            props.customClass
          } ${props.disabled == true && "bg-gray-300 cursor-not-allowed"}`}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.label}
        </button>
      </div>
    </Link>
  );
};

export default Button;
