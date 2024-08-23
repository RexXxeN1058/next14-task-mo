"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

// Define the props for the Sidebar component
interface SidebarProps {
    storageKey?: string;
}

// Define the Sidebar component
export const Sidebar = ({
    storageKey = "t-sidebar-state",
}: SidebarProps) => {
    // Use the useLocalStorage hook to store and retrieve the expanded state of the sidebar
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );

    // Use the useOrganization hook to get the active organization
    const {
        organization: activeOrganization,
        isLoaded: isLoadedOrg,
    } = useOrganization();

    // Use the useOrganizationList hook to get the list of user memberships
    const {
        userMemberships,
        isLoaded: isLoadedOrgList,
    } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    // Get the default accordion value based on the expanded state
    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }
            return acc;
        },
        []
    );

    // Function to handle expanding/collapsing an accordion item
    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }));
    };

    // If the organization or organization list is still loading, show skeleton placeholders
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                </div>
            </>
        );
    }

    // Render the sidebar content once the organization and organization list are loaded
    return (
        <>
            <div className="font-meduim text-xs flex items-center mb-1">
                <span className="pl-4">WorkSpaces</span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    );
};