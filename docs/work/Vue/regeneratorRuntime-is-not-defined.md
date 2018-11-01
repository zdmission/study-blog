# regeneratorRuntime is not defined

webpack编译代码时控制台报错<font color=red>regeneratorRuntime is not defined</font>

babel不能完全的编译支持es6及以上,对于async，await之类的还需要另外添加包兼容

**解决方式**
### 方法一
安装插件
```bash
npm install --save-dev babel-plugin-transform-runtime
```
然后在.babelrc文件中，添加 transform-runtime的内容和regenerator为true
```json{21,25}
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "iOS >= 6",
            "Android >= 4.1"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "syntax-dynamic-import",
    "transform-object-assign",
    "transform-object-rest-spread",
    [
        "transform-runtime",
        {
            "helpers": false,
            "polyfill": false,
            "regenerator": true,
            "moduleName": "babel-runtime"
        }
    ]
  ]
}
```

### 方法二
安装插件
```bash
npm install --save-dev babel-plugin-transform-async-to-generator
```
然后在.babelrc文件中，添加 transform-async-to-generator
```json {20}
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "iOS >= 6",
            "Android >= 4.1"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "syntax-dynamic-import",
    "transform-object-assign",
    "transform-object-rest-spread",
    "transform-async-to-generator"
  ]
}
```
