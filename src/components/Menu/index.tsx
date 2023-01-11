import Link from "next/link";

interface MenuItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <div>
      <Link href={props.href}>
        <li className="mb-8">
          <a onClick={props.onClick} className="cursor-pointer">
            {props.name}
          </a>
        </li>
      </Link>
    </div>
  );
};

export default MenuItem;
