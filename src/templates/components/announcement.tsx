import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Separator } from '../../components/ui/separator';

export function Announcement() {
  return (
    <Link
      to="/docs/changelog"
      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-muted"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
      <span className="sm:hidden">New components and more.</span>
      <span className="hidden sm:inline">New components, cli updates and more.</span>
      <ArrowRightIcon className="ml-1 w-4 h-4" />
    </Link>
  );
}
