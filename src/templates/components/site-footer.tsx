import React from "react";

export function SiteFooter() {
	return (
		<footer className="py-6 md:px-8 md:py-0">
			<div className="container flex flex-col gap-4 justify-between items-center md:h-24 md:flex-row">
				<p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
					Built by{" "}
					<a
						href={"/"}
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						shadcn
					</a>
					. The source code is available on{" "}
					<a
						href={"/"}
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
