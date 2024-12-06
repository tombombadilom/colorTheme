import React from 'react';

import type { ComponentProps } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { cn } from '../../../../lib/utils';
import { Badge } from '../../../../components/ui/badge';
import { ScrollArea } from '../../../../components/ui/scroll-area';

import type { Mail } from '../data';
import { useMail } from '../use-mail';

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map(item => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              mail.selected === item.id && 'bg-muted',
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && <span className="flex w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mail.selected === item.id ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="text-xs line-clamp-2 text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex gap-2 items-center">
                {item.labels.map(label => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}
