"use client";

// (2) Imports:
import { Menu } from "lucide-react";   // Icon library for the menu icon
import { useEffect, useState } from "react";   
import { usePathname } from "next/navigation"; // Hook to get the current route path

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";  // Custom hook for sidebar state
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Sidebar } from "./sidebar";        // Main sidebar component

// (3) MobileSidebar Component
export const MobileSidebar = () => {
    // (4) State and Hooks:
    const pathname = usePathname();      // Get the current route (URL path)
    const [isMounted, setIsMounted] = useState(false);  // Track if the component is mounted

    // Get functions and state from the `useMobileSidebar` hook
    const onOpen = useMobileSidebar((state) => state.onOpen);  // Function to open the sidebar
    const onClose = useMobileSidebar((state) => state.onClose); // Function to close the sidebar
    const isOpen = useMobileSidebar((state) => state.isOpen);   // Current open/closed state

    // (5) useEffect Hooks:
    // Run after the component is first rendered:
    useEffect(() => {
        setIsMounted(true);     // Set isMounted to true (indicating the component is ready)
    }, []); // Empty dependency array ensures this runs only once on mount

    // Run whenever the pathname changes:
    useEffect(() => {
        onClose(); // Close the sidebar when navigating to a new route
    }, [pathname, onClose]);

    // (6) Conditional Rendering:
    if (!isMounted) {  // If the component hasn't mounted yet, don't render anything
        return null;
    }

    // (7) Main JSX Structure:
    return (
        <> {/* Fragment to group elements */}
            {/* Button to Toggle Sidebar */}
            <Button 
                onClick={onOpen}      // Open sidebar on click
                className="block md:hidden mr-2"  // Visible on smaller screens, hidden on medium+
                variant="ghost"      // Use a ghost button variant (likely transparent)
                size="sm"             // Small size button
            >
                <Menu className="h-4 w-4" /> {/* Menu icon from Lucide */}
            </Button>
            
            {/* Sidebar (Sheet Component) */}
            <Sheet open={isOpen} onOpenChange={onClose}>  {/* Open/close based on 'isOpen' state*/}
                <SheetContent side="left" className="p-2 pt-10"> 
                    {/* Render the Sidebar component, providing a storage key */}
                    <Sidebar storageKey="t-sidebar-mobile-state" />  
                </SheetContent>
            </Sheet>
        </>
    );
};
