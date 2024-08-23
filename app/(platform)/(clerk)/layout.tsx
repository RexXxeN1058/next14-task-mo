const ClerkLayout = ({ children }: { 
    children: React.ReactNode; // Define a prop named "children" which can be any valid React element(s)
}) => {
    return (
        // Main Layout Container:
        // - Fills the entire screen (w-full, h-screen)
        // - Uses flexbox for layout (flex)
        // - Centers children horizontally (justify-center)
        // - Centers children vertically (items-center)
        <div className="w-full h-screen flex justify-center items-center">
            {children}  {/* Render the passed-in children (content) within this centered div */}
        </div>
    );
};

export default ClerkLayout; // Make this component available for import and use in other parts of the application
