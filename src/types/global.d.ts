export {};

declare global {
    interface Window {
        __initialLoaderTimers?: number[];
    }
}
