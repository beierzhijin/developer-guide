# UNI-APP

## 真机无线调试

[Android 调试桥](https://developer.android.google.cn/studio/releases/platform-tools?hl=zh-cn)

1. cd 到 Android 调试桥所在目录 platform-tools 下（或者可以配置 adb.exe 父目录的环境变量）
2. 配对，这一步分开也可以，先 `adb pair ip:port`，再输入配对码

```shell
adb pair ip:port 配对码
```

3. 连接

```shell
adb connect ip:port
```
