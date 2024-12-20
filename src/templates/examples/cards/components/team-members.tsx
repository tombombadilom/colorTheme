
import { ChevronDownIcon } from "@radix-ui/react-icons";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../../../../components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../components/ui/popover";

export function DemoTeamMembers() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Members</CardTitle>
				<CardDescription>
					Invite your team members to collaborate.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<div className="flex justify-between items-center space-x-4">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage src="/avatars/01.png" />
							<AvatarFallback>OM</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium leading-none">Sofia Davis</p>
							<p className="text-sm text-muted-foreground">m@example.com</p>
						</div>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Owner{" "}
								<ChevronDownIcon className="ml-2 w-4 h-4 text-muted-foreground" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0" align="end">
							<Command>
								<CommandInput placeholder="Select new role..." />
								<CommandList>
									<CommandEmpty>No roles found.</CommandEmpty>
									<CommandGroup>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Viewer</p>
											<p className="text-sm text-muted-foreground">
												Can view and comment.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Developer</p>
											<p className="text-sm text-muted-foreground">
												Can view, comment and edit.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Billing</p>
											<p className="text-sm text-muted-foreground">
												Can view, comment and manage billing.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Owner</p>
											<p className="text-sm text-muted-foreground">
												Admin-level access to all resources.
											</p>
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex justify-between items-center space-x-4">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage src="/avatars/02.png" />
							<AvatarFallback>JL</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium leading-none">Jackson Lee</p>
							<p className="text-sm text-muted-foreground">p@example.com</p>
						</div>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Member{" "}
								<ChevronDownIcon className="ml-2 w-4 h-4 text-muted-foreground" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0" align="end">
							<Command>
								<CommandInput placeholder="Select new role..." />
								<CommandList>
									<CommandEmpty>No roles found.</CommandEmpty>
									<CommandGroup className="p-1.5">
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Viewer</p>
											<p className="text-sm text-muted-foreground">
												Can view and comment.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Developer</p>
											<p className="text-sm text-muted-foreground">
												Can view, comment and edit.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Billing</p>
											<p className="text-sm text-muted-foreground">
												Can view, comment and manage billing.
											</p>
										</CommandItem>
										<CommandItem className="flex flex-col items-start px-4 py-2 teamaspace-y-1">
											<p>Owner</p>
											<p className="text-sm text-muted-foreground">
												Admin-level access to all resources.
											</p>
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
