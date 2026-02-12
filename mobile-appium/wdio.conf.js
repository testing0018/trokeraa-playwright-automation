exports.config = {
    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    //
    // Appium server
    //
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    //
    // Mobile capability
    //
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './apps/app.apk',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:uiautomator2ServerLaunchTimeout': 120000

    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
