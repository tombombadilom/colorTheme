import React from "react";

import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { siteConfig } from "../examples/config/site";
import { Icons } from "./icons";

export function MainNav() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="hidden mr-4 md:flex">
			<Link to="/" className="flex items-center mr-6 space-x-2">
				<Icons.logo className="w-6 h-6" />
				<span className="hidden font-bold sm:inline-block">
					{siteConfig.name}
				</span>
			</Link>
			<nav className="flex gap-6 items-center text-sm">
				<Link
					to="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/60",
					)}
				>
					Docs
				</Link>
				<Link
					to="/docs/components"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components")
							? "text-foreground"
							: "text-foreground/60",
					)}
				>
					Components
				</Link>
				<Link
					to="/themes"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/themes")
							? "text-foreground"
							: "text-foreground/60",
					)}
				>
					Themes
				</Link>
				<Link
					to="/examples"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/examples")
							? "text-foreground"
							: "text-foreground/60",
					)}
				>
					Examples
				</Link>
				<Link
					to={siteConfig.links.github}
					className={cn(
						"hidden transition-colors text-foreground/60 hover:text-foreground/80 lg:block",
					)}
				>
					GitHub
				</Link>
			</nav>
		</div>
	);
}
