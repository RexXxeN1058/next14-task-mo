"use client";

import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();



  return (
    <nav
      className={cn(
        "fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm flex items-center backdrop-filter backdrop-blur-xl"
      )}
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button variant="primary" size="default" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
            Create
          </Button>
        </FormPopover>

        <FormPopover>
          <Button variant="primary" size="default" className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <DarkModeToggle />

        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootbox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      </div>
    </nav>
  );
};
