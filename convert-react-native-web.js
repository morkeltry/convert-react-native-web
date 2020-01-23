const path = require ('path');
const writePackage = require('write-pkg');

if (process.argv[2]==='.')
  process.argv[2] =  __dirname;
const target = process.argv[2] ||  __dirname;
const packageJson = require(path.join(target,'package.json'));

console.log(target);
console.log(packageJson);

let { scripts, dependencies, devDependencies } = packageJson;

const throttleBuildUnix = true;
const HOME = process.env.HOME || '~';
const ANDROID_HOME = process.env.ANDROID_HOME || `${process.env.HOME}/Android`;
const device = 'Android-9-Pixel-XL.avd'

console.log(packageJson);
console.log(HOME, ANDROID_HOME);

scripts.web = scripts.start;
scripts.start = throttleBuildUnix ? 'nice -n2 react-native start' : 'react-native start';
scripts.android = throttleBuildUnix ? 'nice -n2 react-native run-android' : 'react-native run-android';
scripts.ios = throttleBuildUnix ? 'nice -n2 react-native run-ios' : 'react-native run-ios';
scripts.postinstall = 'jetify';
scripts.shake ='adb shell input keyevent 82';
scripts.killemu = `killall -9 ${path.join(ANDROID_HOME,'emulator/qemu/linux-x86_64/qemu-system-x86_64')}`;
scripts.clearemu = `rm ${path.join(ANDROID_HOME,`avd/${device}/userdata-qemu.img.qcow2 `)}`;

// delete packageJson.dependencies.expo;

packageJson.dependencies= Object.assign( {
    'react': '^16.12.0',
    'react-dom': '^16.12.0',
    'react-native': '^0.61.5',
    'react-native-gesture-handler': '~1.5.0',
    'react-native-reanimated': '~1.4.0',
    'react-native-screens': '~2.0.0-alpha.12',
    'react-native-unimodules': '~0.7.0',
    'react-native-web': '~0.11.7'
  }, dependencies );

packageJson.devDependencies= Object.assign( {
    '@babel/core': '^7.0.0',
    'babel-jest': '~24.9.0',
    jest: '~24.9.0',
    jetifier: '~1.6.4',
    'metro-react-native-babel-preset': '~0.56.0',
    'react-test-renderer': '~16.9.0',
    'babel-preset-expo': '~8.0.0'
  }, devDependencies );
console.log(packageJson);

if (packageJson.private === undefined)
  packageJson.private = true;

writePackage(target, packageJson);
