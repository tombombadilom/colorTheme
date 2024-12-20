import React from "react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { cn } from "../../../../lib/utils";
import { Icons } from "../../../components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
						)}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="flex absolute inset-0 items-center">
					<span className="w-full border-t" />
				</div>
				<div className="flex relative justify-center text-xs uppercase">
					<span className="px-2 bg-background text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 w-4 h-4" />
				)}{" "}
				GitHub
			</Button>
		</div>
	);
}
