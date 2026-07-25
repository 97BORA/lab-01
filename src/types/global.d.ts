export {};

declare global {
    interface Window {
        __initialLoaderTimer?: number[];
    }
}
