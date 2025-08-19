import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { LucideHome, Menu, X } from "lucide-react";
import { navbarData } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

interface props {
  data: navbarData;
}

export default function MobileDrawer({ data }: props) {
  return (
    <div className="sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex flex-col justify-center items-center gap-12">
              <DrawerClose>
                <X />
              </DrawerClose>
              <DrawerClose className="flex flex-col gap-6">
                {data.navLinks.map((link) => {
                  const Icon = link.logo;
                  return (
                    <div
                      onClick={() => {
                        redirect(link.href);
                      }}
                      key={link.title}
                      className="font-medium flex gap-4 items-center"
                    >
                      <Icon />
                      <p>{link.title}</p>
                    </div>
                  );
                })}
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          {/* <DrawerFooter className="flex items-center">
            <Link href={"/"} className="font-medium flex gap-1 items-center">
              <LucideHome />
              Developer
            </Link>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
