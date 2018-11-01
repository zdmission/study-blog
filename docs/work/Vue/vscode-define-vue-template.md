# vscode中vue模板自定义

安装vueHelper插件
1. 文件--> 首选项 --> 用户代码片段，之后会打开弹窗，选择代码片段的语言 输入 vue，就会打开vue.json文件，开始编辑
```json
{
    /*
        // Place your snippets for Vue here. Each snippet is defined under a snippet name and has a prefix, body and 
        // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
        // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
        // same ids are connected.
        // Example:
        "Print to console": {
            "prefix": "log",
            "body": [
                "console.log('$1');",
                "$2"
            ],
            "description": "Log output to console"
        }
    */
    "Print to console": {
        "prefix": "vue",
        "body": [
            "<template>",
            "   <div>\n",
            "   </div>",
            "</template>\n",
            "<script>",
            "   export default {",
            "       name: \"${1:component_name}\",",
            "       data() {",
            "           return {\n",
            "           }",
            "       },",
            "       mounted() {\n",
            "       },",
            "       methods: {\n",
            "       },",
            "       components: {\n",
            "       }"
            "   }",
            "</script>\n",
            "<style lang=\"${2:scss}\" scoped>\n",
            "</style>"
        ],
        "description": "Log output to console"
    }
}
```
保存即可，然后在新建的vue文件中，输入vue回车便可以看见刚才新建的模板