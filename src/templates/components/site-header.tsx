import React from 'react';

import { Link } from 'react-router-dom';
import { siteConfig } from '../examples/config/site';
import { cn } from '../../lib/utils';
import { CommandMenu } from './command-menu';
import { Icons } from './icons';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ModeToggle } from './mode-toggle';
import { buttonVariants } from '@/components/ui/variant-button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center max-w-screen-2xl h-14">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 justify-between items-center space-x-2 md:justify-end">
          <div className="flex-1 w-full md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'px-0 w-9',
                )}
              >
                <Icons.gitHub className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link to={'/'} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'px-0 w-9',
                )}
              >
                <Icons.twitter className="w-3 h-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
