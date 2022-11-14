import Link from "next/link";

interface ButtonProps {
  label: string;
  customClass?: string;
  href: string;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Link href={props.href}>
      <div>
        <button
          className={`p-3 rounded-md text-white text-center text-md w-full transition duration-700 ${props.customClass}`}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      </div>
    </Link>
  );
};

export default Button;
