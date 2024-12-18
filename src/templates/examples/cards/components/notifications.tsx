
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";

export function DemoNotifications() {
	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle>Notifications</CardTitle>
				<CardDescription>
					Choose what you want to be notified about.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-1">
				<div className="flex items-start p-2 -mx-2 space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
					<BellIcon className="mt-px w-5 h-5" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Everything</p>
						<p className="text-sm text-muted-foreground">
							Email digest, mentions & all activity.
						</p>
					</div>
				</div>
				<div className="flex items-start p-2 -mx-2 space-x-4 rounded-md transition-all bg-accent text-accent-foreground">
					<PersonIcon className="mt-px w-5 h-5" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Available</p>
						<p className="text-sm text-muted-foreground">
							Only mentions and comments.
						</p>
					</div>
				</div>
				<div className="flex items-start p-2 -mx-2 space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
					<EyeNoneIcon className="mt-px w-5 h-5" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">Ignoring</p>
						<p className="text-sm text-muted-foreground">
							Turn off all notifications.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
