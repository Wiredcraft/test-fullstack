import { Link, LinkProps, useRouteMatch } from "react-router-dom";
import navbarLinks from './navbar-links';
import classNames from "classnames";

interface NavbarLinkProps extends LinkProps {
  path: string;
}

function NavbarLink({ children, to, path }: NavbarLinkProps) {
  const match = useRouteMatch<string>(path)
  const isExactMatch = match?.isExact;
  const className = classNames({
    'fdx-nav-link': true,
    'fdx-nav-link_active': isExactMatch,
  })
  return <Link className={className} to={to}> {children}</ Link>;
}

export default function Navbar() {
  return (
    <>
      <section>
        {navbarLinks.primary.map(({ label, path }) => (
          <NavbarLink to={path} path={path} key={label}>{label}</NavbarLink>
        ))}
      </section>
      <section>
        {navbarLinks.action.map(({ label, path }) => (
          <NavbarLink to={path} path={path} key={label}>{label}</NavbarLink>
        ))}
      </section>
    </>
  )
}
