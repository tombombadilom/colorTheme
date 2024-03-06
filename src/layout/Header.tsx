import React, { ReactElement, ReactNode } from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../components/ui/navigation-menu';

import ThemeSwitcher from '../lib/ThemeSwitcher';
import { TopMenu } from './Menu';
type HeaderProps = {
  children: ReactNode;
  colorTheme: ReactElement;
};
const Header = ({ children, colorTheme }: HeaderProps): ReactElement => {
  return (
    <NavigationMenu className="w-[100vw] min-h-[5dvh] bg-nav text-nav-foreground rounded-md bg-clip-padding backdrop-blur-md bg-opacity-light flex items-center border-0 justify-between dark:bg-nav dark:bg-opacity-heavy dark:text-nav-foreground p-1">
      <NavigationMenuList>
        <NavigationMenuItem>{children}</NavigationMenuItem>
        <TopMenu />
        <NavigationMenuItem>
          <ThemeSwitcher />
        </NavigationMenuItem>
        <NavigationMenuItem key={'c' + 99}>{colorTheme}</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Header;
