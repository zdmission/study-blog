# 利用软碟通装系统会出现一个问题

利用软碟通装系统会出现一个问题，

Windows无法安装到这个磁盘。选中的磁盘具有 MBR 分区表。在EFI系统上，Windows只能安装到这个GPT磁盘。

![win7](/exprience/ruandietong.png)

方法一：开机按ESC键，会显示两个光驱或者U盘的选项，选择光驱名称前没有UEFI的选项启动，即可正常把系统安装在MBR分区表硬盘上

方法二：利用分区助手把该盘转换为GPT格式，U深度比较好

方法三：将bioS 里的EFI 选项关闭, 基本上就可以安装了.


CSM全名Compatibility Support Module即兼容性支持模块，是UEFI的一个特殊模块，对于不支持UEFI的系统提供兼容性支持。目前Windows8完全支持UEFI，Windows7的64位不完全支持UEFI。因此UEFI BIOS下安装Windows7必须开启CSM，多数电脑能自动或手动开启，少数电脑则强制关闭CSM。 这既是UEFI开关





