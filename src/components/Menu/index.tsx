import Link from "next/link";

interface MenuItemProps {
  name: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <div>
      <Link href={props.href}>
        <li className="mb-8">
          <a className="cursor-pointer">{props.name}</a>
        </li>
      </Link>
    </div>
  );
};

export default MenuItem;
