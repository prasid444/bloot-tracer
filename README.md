# Blood Tracer
An app made on React Native which acts as platform for searching and donating blood to needed one.

Steps to run:
- 
- Clone the Project
```sh
$ git clone https://github.com/prasid444/blood-tracer.git
```
- Install node modules
```sh
$ nmp install
```
- Run Project
```sh
$ react-native run-android
$ react-native run-ios
```
- Bundle gradle
```sh
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
-Goto android folder
```sh
$ cd android
```
- Build Realease or Debug version (for release make please make keystore)
```sh
$ ./gradlew assembleDebug
$ ./gradle assembleRelease
```
### Used Library:
* [react-navigation](https://github.com/react-navigation/react-navigation) - For Routing
* [react-native-paper](https://github.com/callstack/react-native-paper) - UI Library
* [react-navigation-material-bottom-tabs](https://github.com/react-navigation/react-navigation-material-bottom-tabs) - Bottom Tab Navigation
