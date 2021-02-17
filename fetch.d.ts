// Type definitions for cordova.plugins.backgroundFetch

/// <reference types="cordova"/>

interface BackgroundFetch {
    configure(
        successCallback: () => void,
        errorCallback: (error: string) => void,
        config: {[key: string]: string}
    ): void,
    finish(
        status: number
    ): void,
    start(
        successCallback: () => void,
        errorCallback: (error: string) => void,
    ),
    stop(
        successCallback: () => void,
        errorCallback: (error: string) => void,
    ),
    status(
        successCallback: (status: number) => void,
        errorCallback: (error: string) => void,
    )
}

interface CordovaPlugins {
    backgroundFetch: BackgroundFetch
}
