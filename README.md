# Software Maintainance Guide

This app is built using [npm](https://github.com/AntonyM71/FreestyleApp.git) and [expo](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

## Development process


### Install Node

Install node, for example using the instructions for your OS [here](https://nodejs.org/en/download)

### Install Dependencies
Install the dependencies with:
`npm install`
### Start the App in Expo
Start the app in development mode using:
`npx expo start`

### Emulating
We can emulate iOS devices (on a mac), and Android devices (just about anywhere):

#### iOS
Download XCode on your mac from the app store.

#### Android

Follow the instructions [here](https://developer.android.com/studio/install#linux) for your Operating System.

### Development practices

Try and keep to good programming practices, including:

-   linting using eslint (VSCode)
-   testing (hah!) using jest
-   functional (arrow funciton) components wherever possible
-   redux-hooks on new components

This app was developed using Node 18 LTS or later, install from [here](https://nodejs.org/en/download/) I've been developing using VSCode for my IDE.

## Deploying a new version

### Not an admin

Make a pull-request on [git](https://github.com/AntonyM71/FreestyleApp)

### Admin

The following is a summary of the [expo documentation](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/), if it doesn't work, look there for more advice.

1. Contact contact kayak.freestyle.app@gmail.com to get our api key json file

1. Run `npm ci` and `npm audit fix` to install packages and fix vulterabilities.

1. Update `version` in [app.json](./app.json), try to use semantic versioning. And increment the `versionCode`

1. Install the expo cli (If you don't already have it) using `npm install -g expo-cli`

1. Build the APK using

```
npx eas-cli build --platform android
npx eas-cli submit --platform android
```

```
npx eas-cli build --platform ios
npx eas-cli submit --platform ios
```
