import type React from "react";
import { Link, useLocation } from "react-router-dom";

import { buttonVariants } from "@/components/ui/variant-button";
import { cn } from "../../../../lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className,
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					to={item.href}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						pathname === item.href
							? "bg-muted hover:bg-muted"
							: "hover:bg-transparent hover:underline",
						"justify-start",
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}
export default SidebarNav;
