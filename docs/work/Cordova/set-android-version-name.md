# cordova项目小问题集合

## 1.How to get Cordova 3.4.0 to set Android version name or code on build

Cordova 3.5.0-0.2.4 I added this attribute to the widget tag node config.xml

**android-versionCode="10"**


and the AndroidManifest.xml was properly updated to

**android:versionCode="10"**

## 2.建立项目充分考虑好包名
项目建立的时候要考虑到ios的bundl id，包名要与其一致，或者在建立之后改包名要趁早，别引入很多插件之后再去，这样虽然也可以，但是最好不这样，极光推送建立应用的包名要与ios的bundle id，项目的包名一致，