// Type definitions for cordova.plugins.backgroundFetch

/// <reference types="cordova"/>

/**
* | BackgroundFetchStatus              | Description                                     |
* |------------------------------------|-------------------------------------------------|
* | BackgroundFetch.STATUS_RESTRICTED  | Background fetch updates are unavailable and the user cannot enable them again. For example, this status can occur when parental controls are in effect for the current user. |
* | BackgroundFetch.STATUS_DENIED      | The user explicitly disabled background behavior for this app or for the whole system. |
* | BackgroundFetch.STATUS_AVAILABLE   | Background fetch is available and enabled.      |
*/
type BackgroundFetchResult = 0 | 1 | 2;

/**
* | BackgroundFetchResult                 | Description                                                   |
* |---------------------------------------|---------------------------------------------------------------|
* | BackgroundFetch.FETCH_RESULT_NEW_DATA | New data was successfully downloaded.                         |
* | BackgroundFetch.FETCH_RESULT_NO_DATA  | There was no new data to download.                            |
* | BackgroundFetch.FETCH_RESULT_FAILED   | An attempt to download data was made but that attempt failed. |
*/
type BackgroundFetchStatus = 0 | 1 | 2;

interface BackgroundFetchConfig {
    /**
    * The minimum interval in minutes to execute background fetch events.  Defaults to 15 minutes.  Minimum is 15 minutes.
    */
    minimumFetchInterval?: number;
    /**
    * [Android only] Set false to continue background-fetch events after user terminates the app.  Default to true.
    */
    stopOnTerminate?: boolean;
    /**
    * [Android only] Set true to initiate background-fetch events when the device is rebooted.  Defaults to false.
    */
    startOnBoot?: boolean;
    /**
    * [Android only] Set true to automatically relaunch the application (if it was terminated) -- the application will launch to the foreground then immediately minimize.  Defaults to false.
    */
    forceReload?: boolean;
    /**
    * [Android only] Set true to enable Headless mechanism for handling fetch events after app termination.
    */
    enableHeadless?: boolean;
    /**
    * [Android only] Set detailed description of the kind of network your job requires.
    *
    * If your job doesn't need a network connection, you don't need to use this option, as the default is [[BackgroundFetch.NEWORK_TYPE_NONE]].
    *
    * Calling this method defines network as a strict requirement for your job. If the network requested is not available your job will never run.
    */
    requiredNetworkType?: NetworkType;
    /**
    * [Android only] Specify that to run this job, the device's battery level must not be low.
    *
    * This defaults to false. If true, the job will only run when the battery level is not low, which is generally the point where the user is given a "low battery" warning.
    */
    requiresBatteryNotLow?: boolean;
    /**
    * [Android only] Specify that to run this job, the device's available storage must not be low.
    *
    * This defaults to false. If true, the job will only run when the device is not in a low storage state, which is generally the point where the user is given a "low storage" warning.
    */
    requiresStorageNotLow?: boolean;
    /**
    * [Android only] Specify that to run this job, the device must be charging (or be a non-battery-powered device connected to permanent power, such as Android TV devices). This defaults to false.
    */
    requiresCharging?: boolean;
    /**
    * [Android only] When set true, ensure that this job will not run if the device is in active use.
    *
    * The default state is false: that is, the for the job to be runnable even when someone is interacting with the device.
    *
    * This state is a loose definition provided by the system. In general, it means that the device is not currently being used interactively, and has not been in use for some time. As such, it is a good time to perform resource heavy jobs. Bear in mind that battery usage will still be attributed to your application, and surfaced to the user in battery stats.
    */
    requiresDeviceIdle?: boolean;
}

interface BackgroundFetch {

    /**
    * Initial configuration of BackgroundFetch, including config-options and Fetch-callback.  The [[start]] method will automatically be executed.
    */
    configure(callback: () => void, failure: (status: BackgroundFetchStatus) => void, config: BackgroundFetchConfig): void;

    /**
    * Start subscribing to fetch events.
    */
    start(success?: () => void, failure?: (status: BackgroundFetchStatus) => void): void;
    /**
    * Stop subscribing to fetch events.
    */
    stop(): void;
    /**
    * You must execute [[finish]] within your fetch-callback to signal completion of your task.  You may optionally provide a [[BackgroundFetchResult]].  If no result is provided, default to FETCH_RESULT_NEW_DATA.
    *
    * | BackgroundFetchResult                 |
    * |---------------------------------------|
    * | BackgroundFetch.FETCH_RESULT_NEW_DATA |
    * | BackgroundFetch.FETCH_RESULT_NO_DATA  |
    * | BackgroundFetch.FETCH_RESULT_FAILED   |
    *
    */
    finish(result?: BackgroundFetchResult): void;
    /**
    * Query the BackgroundFetch API status
    *
    * | BackgroundFetchStatus              | Description                                     |
    * |------------------------------------|-------------------------------------------------|
    * | BackgroundFetch.STATUS_RESTRICTED  | Background fetch updates are unavailable and the user cannot enable them again. For example, this status can occur when parental controls are in effect for the current user. |
    * | BackgroundFetch.STATUS_DENIED      | The user explicitly disabled background behavior for this app or for the whole system. |
    * | BackgroundFetch.STATUS_AVAILABLE   | Background fetch is available and enabled.      |
    */
    status(callback: (status: BackgroundFetchStatus) => void): void;
}

interface CordovaPlugins {
    backgroundFetch: BackgroundFetch;
}
