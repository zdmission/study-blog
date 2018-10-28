# 如何通过命令的方式设置查看隐藏文件夹

- 1.打开“终端”，根据自己的版本选择命令
- 2.早期的OS X（10.6~10.8）系统可以使用如下两条命令来开始或者关闭系统隐藏文件的显示：
```bash
defaults write com.apple.Finder AppleShowAllFiles Yes && killall Finder //显示隐藏文件
defaults write com.apple.Finder AppleShowAllFiles No && killall Finder //不显示隐藏文件
```
- 3.当升级到OS X 10.9 Mavericks版本之后，这两条命令需要做一些修改，变成了如下命令：
```bash
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder //显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles No && killall Finder //不显示隐藏文件
```
- 4.复制命令，在“终端”中粘贴命令，按下enter键--执行。