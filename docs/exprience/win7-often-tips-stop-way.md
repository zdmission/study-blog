# win7频繁提示资源管理器已停止工作解决办法

1.win+R,在弹出的运行对话框中输入 regedit 命令，点击确定进入注册表界面

![win7](/exprience/win75.png)

2.进入注册表界面，依次定位到【HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies】项下

![win7](/exprience/win71.png)

3.右键点击Policies项，选择【新建】，【项】将其命名为 System

![win7](/exprience/win72.png)

4.接着在System项右方空白区域选择【新建】，【字符串值】将其命名为 DisableTaskMgr

![win7](/exprience/win73.png)

5.双击打开新建的DisableTaskMgr数值，将其数据设置为 0 点击确定，问题解决

![win7](/exprience/win74.png)




