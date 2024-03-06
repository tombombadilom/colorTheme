import React, { useState, useCallback, ReactNode, lazy, Suspense } from 'react';
// Import UI component types...
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Menu, Palette } from 'lucide-react';
import SideMenu from './Menu';
import Header from './Header';
import { Button } from '../components/ui/button';

const Colors = lazy(() => import('../lib/Colors'));

type SheetProps = {
  children: ReactNode;
};

const MySheet: React.FC<SheetProps> = ({ children }) => {
   const [isSheetOpen, setSheetOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const side = 'left';

   // Handle Sheet toggling independently
  const toggleSheet = useCallback(() => {
    setSheetOpen(prev => !prev);
    if (isDrawerOpen) {
      setDrawerOpen(false); // Optionally close drawer when sheet opens
    }
  }, [isDrawerOpen]);

  // Handle Drawer toggling independently
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
    if (isSheetOpen) {
      setSheetOpen(false); // Fermer le Sheet si le Drawer s'ouvre
    }
  }, [isSheetOpen]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sheet open={isSheetOpen} 
        onOpenChange={() => toggleSheet()} 
      key={side}>
        <Drawer 
        key={"bottom"}
        open={isDrawerOpen}
        onOpenChange={toggleDrawer} 
      >
          <Header
            colorTheme={
              <DrawerTrigger onClick={(e) => {
                e.stopPropagation();
                toggleDrawer();
              }}>
                <Palette />
              </DrawerTrigger>
            }
          >
            <SheetTrigger
             onClick={(e) => {
               e.stopPropagation();
               toggleSheet();
              }}
              className="p-1 w-12 h-12 bg-transparent rounded-lg focus:bg-opacity-60 active:bg-opacity-75 dark:bg-transparent dark:bg-opacity-10 dark:hover:bg-opacity-60 dark:focus:bg-opacity-60 dark:active:bg-opacity-75"
            >
              <Menu className="w-full h-full rounded-md backdrop-filter backdrop-blur-lg bg-opacity-light text-nav-foreground dark:bg-opacity-light dark:text-nav-foreground" />
            </SheetTrigger>
          </Header>
          <div className="flex flex-col items-center justify-center min-h-[90vh] overflow-y-auto text-align-center">
            {children}
          </div>
          <DrawerContent>
            <Tabs defaultValue="background" className="w-screen">
              <TabsList className="flex-grow-0 w-screen">
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>
              <TabsContent value="background" className="w-screen">
              
                {/* Background tab contents */}
                <DrawerHeader className="w-screen min-h-[40vh]">
                  <DrawerTitle>Set your animated background</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Save Background</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </TabsContent>
              <TabsContent value="colors">
                <DrawerHeader className="w-screen min-h-[40vh]">
                  <DrawerTitle>Set your first 3 primary colors</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="w-full flex flex-row p-2 gap-2 m-auto flex-wrap content-start items-center justify-normal min-h-[20vh] rounded-xl ">
                  <Colors />
                </DrawerDescription>
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
              <p className="mt-6 text-center text-gray-300 text-1xl">ColorTheme</p>
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
    </Suspense>
  );
};

export default MySheet;
