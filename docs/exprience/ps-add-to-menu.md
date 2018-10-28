# 在windows上添加photoshop到右键菜单

1. 使用win+R打开，输入regedit，点击确定即可打开注册表

![ps](/exprience/ps1.png)

如下界面

![ps](/exprience/ps2.png)

2. 依次展开左侧的 计算机>HKEY_CLASSES_ROOT>*>shell

![ps](/exprience/ps3.png)

3. 在【shell】上单击鼠标右键，选择新建>项，将（新项 #1）改为（使用 Photoshop 编辑）

![ps](/exprience/ps4.png)

![ps](/exprience/ps5.png)

4. 同理，在【使用 Photoshop 编辑】上单击鼠标右键，选择新建>项，将（新项 #1）改为 command

![ps](/exprience/ps6.png)

5. 确保当前选中的是command项，双击其右侧的(默认)，在【编辑字符串】窗口中，输入PS的路径，并追加 %1 ，确定后就完成了~

![ps](/exprience/ps7.png)