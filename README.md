# Software Maintainance Guide

This app is built using [npm](https://github.com/AntonyM71/FreestyleApp.git) and [expo](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

## Development process

Try and keep to good programming practices, including:

-   linting using eslint (VSCode)
-   testing (hah!) using jest
-   functional (arrow funciton) components wherever possible
-   redux-hooks on new components

This app was developed using NPM 6.13.4 and Node 12.16.1, install from [here](https://nodejs.org/en/download/) I've been developing using VSCode for my IDE.

Start developing by running `npm ci` and `npm install -g expo-cli`

Some expo commands aren't allowed by the default powershell execution policies, update them using `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted` (see [here](https://stackoverflow.com/questions/41117421/ps1-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system) for a discussion on this).

1. `sudo apt-get install curl`
1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
1. Restart your terminal and run the command `nvm install --lts`

You'll need an expo installed on an [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB) or [iOS](https://apps.apple.com/gb/app/expo-client/id982107779). If you have a mac you can install [XCode](https://developer.apple.com/xcode/) and simulate apple devices locally (This is super handy, I would recommend!) Currently we don't have an app store account, but iOS compatability is desired.

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
