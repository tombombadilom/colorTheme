import { PlusCircledIcon } from "@radix-ui/react-icons";


import { Button } from "../../../components/ui/button";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";

export default function MusicPage() {
	return (
		<>
			<div className="md:hidden">
				<img
					src="/examples/music-light.png"
					width={1280}
					height={1114}
					alt="Music"
					className="block dark:hidden"
				/>
				<img
					src="/examples/music-dark.png"
					width={1280}
					height={1114}
					alt="Music"
					className="hidden dark:block"
				/>
			</div>
			<div className="hidden md:block">
				<Menu />
				<div className="border-t">
					<div className="bg-background">
						<div className="grid lg:grid-cols-5">
							<Sidebar playlists={playlists} className="hidden lg:block" />
							<div className="col-span-3 lg:col-span-4 lg:border-l">
								<div className="px-4 py-6 h-full lg:px-8">
									<Tabs defaultValue="music" className="space-y-6 h-full">
										<div className="flex items-center space-between">
											<TabsList>
												<TabsTrigger value="music" className="relative">
													Music
												</TabsTrigger>
												<TabsTrigger value="podcasts">Podcasts</TabsTrigger>
												<TabsTrigger value="live" disabled>
													Live
												</TabsTrigger>
											</TabsList>
											<div className="mr-4 ml-auto">
												<Button>
													<PlusCircledIcon className="mr-2 w-4 h-4" />
													Add music
												</Button>
											</div>
										</div>
										<TabsContent
											value="music"
											className="p-0 border-none outline-none"
										>
											<div className="flex justify-between items-center">
												<div className="space-y-1">
													<h2 className="text-2xl font-semibold tracking-tight">
														Listen Now
													</h2>
													<p className="text-sm text-muted-foreground">
														Top picks for you. Updated daily.
													</p>
												</div>
											</div>
											<Separator className="my-4" />
											<div className="relative">
												<ScrollArea>
													<div className="flex pb-4 space-x-4">
														{listenNowAlbums.map((album) => (
															<AlbumArtwork
																key={album.name}
																album={album}
																className="w-[250px]"
																aspectRatio="portrait"
																width={250}
																height={330}
															/>
														))}
													</div>
													<ScrollBar orientation="horizontal" />
												</ScrollArea>
											</div>
											<div className="mt-6 space-y-1">
												<h2 className="text-2xl font-semibold tracking-tight">
													Made for You
												</h2>
												<p className="text-sm text-muted-foreground">
													Your personal playlists. Updated daily.
												</p>
											</div>
											<Separator className="my-4" />
											<div className="relative">
												<ScrollArea>
													<div className="flex pb-4 space-x-4">
														{madeForYouAlbums.map((album) => (
															<AlbumArtwork
																key={album.name}
																album={album}
																className="w-[150px]"
																aspectRatio="square"
																width={150}
																height={150}
															/>
														))}
													</div>
													<ScrollBar orientation="horizontal" />
												</ScrollArea>
											</div>
										</TabsContent>
										<TabsContent
											value="podcasts"
											className="h-full flex-col border-none p-0 data-[state=active]:flex"
										>
											<div className="flex justify-between items-center">
												<div className="space-y-1">
													<h2 className="text-2xl font-semibold tracking-tight">
														New Episodes
													</h2>
													<p className="text-sm text-muted-foreground">
														Your favorite podcasts. Updated daily.
													</p>
												</div>
											</div>
											<Separator className="my-4" />
											<PodcastEmptyPlaceholder />
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
