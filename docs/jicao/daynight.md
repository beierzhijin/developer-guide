# Day & Night

## OSS

### [PicGo](https://support.typora.io/Upload-Image/#picgo-core-command-line-opensource)
Config PicGo-Core
Please edit config.json at following location
  - Linux / macOS → <u>~/.picgo/config.json</u>
  - Windows → <u>C:\Users\klaus\ .picgo\config.json</u>

[选择 PicGo-Core (Command line)下载或更新](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
```bash
# 在此目录下 C:\Users\klaus\AppData\Roaming\Typora\picgo\win64
.\picgo.exe set uploader
.\picgo.exe use uploader
```

```json
# area（阿里云区域查询）https://help.aliyun.com/document_detail/31837.html
# area（七牛区域查询）https://developer.qiniu.com/kodo/1671/region-endpoint-fq
{
    "picBed": {
        "current": "qiniu",
        "aliyun": {
            "accessKeyId": "**************",
            "accessKeySecret": "**************",
            "bucket": "ulooklikeamovie",
            "area": "oss-cn-beijing",
            "path": "img/",
            "customUrl": "",
            "options": ""
        },
        "uploader": "qiniu",
        "transformer": "path",
        "qiniu": {
            "accessKey": "**************",
            "secretKey": "**************",
            "bucket": "chinatelecom",
            "url": "qiniu.viphimself.vip",
            "area": "z0",
            "options": "",
            "path": ""
        }
    },
    "picgoPlugins": {}
}
```

### issues

🔺[picgo + 七牛云`华东-浙江2`无法上传图片](https://github.com/Molunerfinn/PicGo/issues/365#issuecomment-1380207705)


## [火狐开发者版切换语言](https://support.mozilla.org/en-US/questions/1223719)

💔开发者版参考Firefox官方更换语言指引不生效

1. 在地址栏输入 about:config
2. "I accept the risk!"
3. 搜索框输入 intl.locale.requested
4. 选择 string（字符串），然后点击右侧➕号
5. 输入zh-cn，en-us等
6. 重启浏览器

## PowerToys

![image-20230308170748337](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230308170748337.png){width="555px"}
