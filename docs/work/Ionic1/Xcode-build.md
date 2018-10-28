# XCode中进行打包的步骤


1.General选项下的Identity选项可以更新版本Version（1.0.2），Build（1.0.2）,Team选择的是开发者证书

![xcode](/work/Ionic1/xcode1.png)

2.Device有三个选项iPhone，ipad，Universal，如果你只做手机版就选择iphone，默认的是Universal，在上传至app store的时候会叫你提供ipad的截图

3.在Build Settings选项下的Code Signing选项下Code Signing Identity下Debug选择开发者证书，Release选择发布证书

![xcode](/work/Ionic1/xcode2.png)

4.在Build Settings选项下的Search Paths选项下Header Search Paths下Debug，Release下，如果没有"$(OBJROOT)/UninstalledProducts/$(PLATFORM_NAME)/include"需要添加，应该最开始默认的只有"$(OBJROOT)/UninstalledProducts/include"

5.在XCode的左上部分app的名字处点击，选择Generic ios Device

![xcode](/work/Ionic1/xcode3.png)

6.最后点击Product下的Archive，有时候会build失败，clean一下，特殊错误的话需要查资料解决，如果需要发布到app store里面，在Product下Scheme选项下点击Edit Scheme，在run里面的Build Configuration下选择Release

![xcode](/work/Ionic1/xcode4.png)

7.Archive完成之后出现这个界面

![xcode](/work/Ionic1/xcode5.png)

点击Export，会出现四个选项，如果要发布到app store的话，选择Save for ios App Store Deployment，如果只是测试包的话，选择Save for Development Deployment即可，

![xcode](/work/Ionic1/xcode6.png)

下一步选择提供的team，最开始General里面第一项选择的那个证书

![xcode](/work/Ionic1/xcode7.png)

8.最后便导出了APP，要么安装在手机上，要么发布到APP store，后者点开Application Loader，进入模板选择器

![xcode](/work/Ionic1/xcode8.png)

把APP，拖入Application Loader文件夹，它会自动识别您最近的操作内容，之后就是系统复查的app信息了，

![xcode](/work/Ionic1/xcode9.png)

9.接下来就是提交，几分钟没有错误的话，差不多就成功了