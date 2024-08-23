"use client";
import Link from "next/link"; 
import { Logo } from "@/components/logo"; 
import { Button } from "@/components/ui/button"; 
import { DarkModeToggle } from "@/components/dark-mode-toggle";


export const Navbar = () => { 
    return (

        <div className="fixed top-0 w-full p-4 border-t backdrop-filter backdrop-blur-xl" >
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo /> 
                <div className="space-x-4">
                    <DarkModeToggle />
                </div>
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">
                            Login
                        </Link> 
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">
                            Try it out!
                        </Link> 
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;