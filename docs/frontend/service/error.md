---
outline: deep
---

- <strong style="color:red;">[Vue warn]: onMounted is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().</strong>
  
    **解决办法**：删除package-lock.json，yarn.lock重新安装即可，有效性存疑

    **原因**：三方组件在安装的时候安装了新的Vue相关包，在运行过程中三方包引用的vue和项目Vue包不是同一个,具体可以查看发出警告的文件路径（点击警告最右侧的js即可查看该文件详情）
    