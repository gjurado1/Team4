/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: "e2e/jest.config.js",
    },
    jest: {
      setupTimeout: 120000,
    },
  },

  apps: {
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      testBinaryPath:
        "android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk",
      build:
        "cd android && cmd /c gradlew.bat assembleDebug assembleAndroidTest -DtestBuildType=debug",
    },
  },

  devices: {
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Medium_Phone_API_36.1",
      },
    },
  },

  configurations: {
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
  },
};
