# convert-react-native-web

Simple script to copy minimal files to convert a project working with `react-native-web` to one which will build wil `react-native` for Android. It is based on `create-react-native-app` with Expo removed.

Assumes you have an android envionment ready to go.

#### Usage
`cd convert-react-native-web`

`npm i`

then:

(Unix-like CLIs)

ensure `const throttleBuildUnix = true;`in `convert-react-native-web.js`

`chmod 755 convert-react-native-web`

`convert-react-native-web ../path/to/target/project`

(Windows)

open `convert-react-native-web`, copy the relevant folders and files

then run

`node convert-react-native-web.js ../path/to/target/project`


#### File locations
Assumes a directory within your target, named `/src`, containing an `App.js` file.

Change these in `index.js`

#### Naming
To change the name of the project, change occurrences in `index.js`, the folder name (ting) of `/android/app/src/main/java/com/ting` and in the `MainActivity.java` it contains.
