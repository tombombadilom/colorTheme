import React, { useState, ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { lazy } from "react";
import { Menu, Palette } from "lucide-react";
import SideMenu from "./Menu";
import Header from "./Header";
import { Button } from "@/components/ui/button";
const Colors = lazy(() => import("../lib/Colors"));
/**
 * Renders the logo component.
 * @returns {ReactComponentElement<React.SVGProps<SVGSVGElement>>} The logo component.
 */

type SheetProps = {
  children: ReactNode;
};

const MySheet: React.FC<SheetProps> = ({ children }) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const side = "left";
  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={() => {
        setSheetOpen(!sheetOpen);
        setDrawerOpen?.(!sheetOpen);
      }}
      key={side}
    >
      <Drawer
        open={drawerOpen}
        onOpenChange={() => {
          setSheetOpen(!sheetOpen);
          setDrawerOpen?.(!drawerOpen);
        }}
      >
        <Header
          colorTheme={
            <DrawerTrigger>
              <Palette />
            </DrawerTrigger>
          }
        >
          <SheetTrigger className="w-12 h-12 bg-transparent  rounded-lg p-1 focus:bg-opacity-60 active:bg-opacity-75 dark:bg-transparent dark:bg-opacity-10 dark:hover:bg-opacity-60 dark:focus:bg-opacity-60 dark:active:bg-opacity-75">
            <Menu className="w-full h-full bg-opacity-light text-nav-foreground dark:bg-opacity-light dark:text-nav-foreground backdrop-filter backdrop-blur-lg rounded-md " />
          </SheetTrigger>
        </Header>
        <div className="flex flex-col items-center justify-center min-h-[90dvh] overflow-y-auto text-align-center">
          {children}
        </div>
        <DrawerContent>
          <Tabs defaultValue="background" className="w-screen">
            <TabsList className="w-screen flex-grow-0">
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
            </TabsList>
            <TabsContent value="backgrounds" className="w-screen">
              <DrawerHeader className="w-screen min-h-[40dvh]">
                <DrawerTitle>Set your animated background</DrawerTitle>
                <DrawerDescription className="w-full flex flex-row p-2 gap-2 m-auto  flex-wrap content-start items-center justify-normal  min-h-[40dvh] rounded-xl ">
                  <div className="w-screen min-h-[40dvh]">blah</div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Save Background</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </TabsContent>
            <TabsContent value="colors">
              <DrawerHeader className="w-screen min-h-[40dvh]">
                <DrawerTitle>Set your first 3 primary colors</DrawerTitle>
                <DrawerDescription className="w-full flex flex-row p-2 gap-2 m-auto  flex-wrap content-start items-center justify-normal  min-h-[20dvh] rounded-xl ">
                  <Colors />
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Save Theme</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
      <SheetContent
        side={side}
        className="w-drawerWidth bg-background bg-opacity-light text-nav-foreground dark:bg-background dark:bg-opacity-light dark:text-nav-foreground"
      >
        <SheetHeader>
          <SheetTitle>
            <img
              src="/icon/mstile-150x150.png"
              alt="Helia IPFS CMS"
              className="mx-auto h-[150px] md:h-[100px]"
            />
            <p className="mt-6 text-center text-1xl  text-gray-300">ColorTheme</p>
          </SheetTitle>
          <SheetDescription>
            <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]">
              <div className="table">
                <SideMenu />
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MySheet;
