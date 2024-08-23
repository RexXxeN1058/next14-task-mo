import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs"; 
import { ModalProvider } from "@/components/providers/modal-provider"; 
import { QueryProvider } from "@/components/providers/query-provider";  
import { SocketProvider } from "@/components/providers/socket-provider";


const PlatformLayout = ({ children }: { children: React.ReactNode }) => { 
    return (
        <SocketProvider>
            <ClerkProvider>
                <QueryProvider> 
                    <Toaster />  
                        <ModalProvider /> 
                        {children}  
                </QueryProvider>
            </ClerkProvider>
        </SocketProvider>
    );
};

export default PlatformLayout;
