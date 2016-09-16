PATH:=$(PATH):../node_modules/.bin
CORDOVA=PATH=$(PATH) cordova

all: android browser

www: www/css/*.css www/img/*.png www/*.html www/js/*.js

android: ./platforms/android/assets ./platforms/android/build/outputs/apk/android-armv7-debug.apk ./platforms/android/build/outputs/apk/android-x86-debug.apk ./platforms/android/build/outputs/apk/android-arm64-debug.apk ./platforms/android/build/outputs/apk/android-x86_64-debug.apk

./platforms/android/assets:
	mkdir -p platforms/android/assets

browser: www
	$(CORDOVA) build browser

./platforms/android/build/outputs/apk/android-armv7-debug.apk: www
	echo $(PATH)
	$(CORDOVA) build android

./platforms/android/build/outputs/apk/android-x86-debug.apk: www
	$(CORDOVA) build android

./platforms/android/build/outputs/apk/android-arm64-debug.apk:
	$(CORDOVA) build android --xwalk64bit

./platforms/android/build/outputs/apk/android-x86_64-debug.apk:
	$(CORDOVA) build android --xwalk64bit

clean:
	rm -fr platforms/android/build
	rm -fr platforms/browser/build

try:
	$(CORDOVA) emulate browser
