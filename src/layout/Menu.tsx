import { ReactElement } from 'react';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useNavigate } from 'react-router-dom';
interface Link {
  name: string;
  link: string;
}

const links: Link[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Mail',
    link: '/Mail',
  },
  {
    name: 'Dashboard',
    link: '/Dashboard',
  },
  {
    name: 'Cards',
    link: '/Cards',
  },
  {
    name: 'Tasks',
    link: '/Tasks',
  },
  {
    name: 'Playground',
    link: '/Playground',
  },
  {
    name: 'Forms',
    link: '/Forms',
  },
  {
    name: 'Music',
    link: '/Music',
  },
  {
    name: 'Authentication',
    link: '/Authentication',
  },
];

/**
 * Renders the menu component.
 *
 * @returns {ReactElement} The rendered menu component.
 */
const Menu = (): ReactElement => (
  <div className="flex flex-col space-y-3">
    {links.map(
      (l: Link, index: number): ReactElement => (
        <a key={'m' + index} href={l.link}>
          {l.name}
        </a>
      ),
    )}
  </div>
);
export const TopMenu = () => {
  const navigate = useNavigate();
  return links.map(
    (l: Link, index: number): ReactElement => (
      <NavigationMenuItem key={'m' + index}>
        <NavigationMenuLink
          key={'l' + index}
          onClick={() => navigate(l.link)}
          className={navigationMenuTriggerStyle()}
        >
          {l.name}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ),
  );
};

export default Menu;
