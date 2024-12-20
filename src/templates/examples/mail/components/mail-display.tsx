

import { addDays, addHours, format, nextSaturday } from "date-fns";
import {
	Archive,
	ArchiveX,
	Clock,
	Forward,
	MoreVertical,
	Reply,
	ReplyAll,
	Trash2,
} from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Label } from "../../../../components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../components/ui/popover";
import { Separator } from "../../../../components/ui/separator";
import { Switch } from "../../../../components/ui/switch";
import { Textarea } from "../../../../components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../../../components/ui/tooltip";
import type { Mail } from "../data";

interface MailDisplayProps {
	mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
	const today = new Date();

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center p-2">
				<div className="flex gap-2 items-center">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<Archive className="w-4 h-4" />
								<span className="sr-only">Archive</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Archive</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<ArchiveX className="w-4 h-4" />
								<span className="sr-only">Move to junk</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move to junk</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<Trash2 className="w-4 h-4" />
								<span className="sr-only">Move to trash</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move to trash</TooltipContent>
					</Tooltip>
					<Separator orientation="vertical" className="mx-1 h-6" />
					<Tooltip>
						<Popover>
							<PopoverTrigger asChild>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" disabled={!mail}>
										<Clock className="w-4 h-4" />
										<span className="sr-only">Snooze</span>
									</Button>
								</TooltipTrigger>
							</PopoverTrigger>
							<PopoverContent className="flex w-[535px] p-0">
								<div className="flex flex-col gap-2 px-2 py-4 border-r">
									<div className="px-4 text-sm font-medium">Snooze until</div>
									<div className="grid min-w-[250px] gap-1">
										<Button
											variant="ghost"
											className="justify-start font-normal"
										>
											Later today{" "}
											<span className="ml-auto text-muted-foreground">
												{format(addHours(today, 4), "E, h:m b")}
											</span>
										</Button>
										<Button
											variant="ghost"
											className="justify-start font-normal"
										>
											Tomorrow
											<span className="ml-auto text-muted-foreground">
												{format(addDays(today, 1), "E, h:m b")}
											</span>
										</Button>
										<Button
											variant="ghost"
											className="justify-start font-normal"
										>
											This weekend
											<span className="ml-auto text-muted-foreground">
												{format(nextSaturday(today), "E, h:m b")}
											</span>
										</Button>
										<Button
											variant="ghost"
											className="justify-start font-normal"
										>
											Next week
											<span className="ml-auto text-muted-foreground">
												{format(addDays(today, 7), "E, h:m b")}
											</span>
										</Button>
									</div>
								</div>
								<div className="p-2">
									<Calendar />
								</div>
							</PopoverContent>
						</Popover>
						<TooltipContent>Snooze</TooltipContent>
					</Tooltip>
				</div>
				<div className="flex gap-2 items-center ml-auto">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<Reply className="w-4 h-4" />
								<span className="sr-only">Reply</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Reply</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<ReplyAll className="w-4 h-4" />
								<span className="sr-only">Reply all</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Reply all</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!mail}>
								<Forward className="w-4 h-4" />
								<span className="sr-only">Forward</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Forward</TooltipContent>
					</Tooltip>
				</div>
				<Separator orientation="vertical" className="mx-2 h-6" />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" disabled={!mail}>
							<MoreVertical className="w-4 h-4" />
							<span className="sr-only">More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Mark as unread</DropdownMenuItem>
						<DropdownMenuItem>Star thread</DropdownMenuItem>
						<DropdownMenuItem>Add label</DropdownMenuItem>
						<DropdownMenuItem>Mute thread</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Separator />
			{mail ? (
				<div className="flex flex-col flex-1">
					<div className="flex items-start p-4">
						<div className="flex gap-4 items-start text-sm">
							<Avatar>
								<AvatarImage alt={mail.name} />
								<AvatarFallback>
									{mail.name
										.split(" ")
										.map((chunk) => chunk[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<div className="font-semibold">{mail.name}</div>
								<div className="text-xs line-clamp-1">{mail.subject}</div>
								<div className="text-xs line-clamp-1">
									<span className="font-medium">Reply-To:</span> {mail.email}
								</div>
							</div>
						</div>
						{mail.date && (
							<div className="ml-auto text-xs text-muted-foreground">
								{format(new Date(mail.date), "PPpp")}
							</div>
						)}
					</div>
					<Separator />
					<div className="flex-1 p-4 text-sm whitespace-pre-wrap">
						{mail.text}
					</div>
					<Separator className="mt-auto" />
					<div className="p-4">
						<form>
							<div className="grid gap-4">
								<Textarea
									className="p-4"
									placeholder={`Reply ${mail.name}...`}
								/>
								<div className="flex items-center">
									<Label
										htmlFor="mute"
										className="flex gap-2 items-center text-xs font-normal"
									>
										<Switch id="mute" aria-label="Mute thread" /> Mute this
										thread
									</Label>
									<Button
										onClick={(e) => e.preventDefault()}
										size="sm"
										className="ml-auto"
									>
										Send
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="p-8 text-center text-muted-foreground">
					No message selected
				</div>
			)}
		</div>
	);
}
