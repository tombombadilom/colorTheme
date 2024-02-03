import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { cn } from '../../lib/utils';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';

const examples = [
  {
    name: 'Mail',
    href: '/mail',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/mail',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/dashboard',
  },
  {
    name: 'Cards',
    href: '/cards',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/cards',
  },
  {
    name: 'Tasks',
    href: '/tasks',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/tasks',
  },
  {
    name: 'Playground',
    href: '/playground',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/playground',
  },
  {
    name: 'Forms',
    href: '/forms',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/forms',
  },
  {
    name: 'Music',
    href: '/music',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/music',
  },
  {
    name: 'Authentication',
    href: '/authentication',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/authentication',
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn('mb-4 flex items-center', className)} {...props}>
          {examples.map((example, index) => (
            <Link
              onClick={() => navigate(example.href)}
              key={'l' + index}
              to={example.href}
              className={cn(
                'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(example.href) || (index === 0 && pathname === '/')
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

interface ExampleCodeLinkProps {
  pathname: string | null;
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find(example => pathname?.startsWith(example.href));

  if (!example?.code) {
    return null;
  }

  return (
    <Link
      to={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
