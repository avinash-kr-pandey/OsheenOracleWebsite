/**
 * Global type definitions for your project.
 * Place shared interfaces, types, and module declarations here.
 */

// Example: Declare a global interface
interface Window {
    myCustomProperty?: string;
}

// Example: Module declaration for importing non-TypeScript files
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const value: string;
    export default value;
}