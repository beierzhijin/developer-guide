# RuoYi-Vue3

## v1.7.1 Bug

1. 配置菜单<strong style="color: #e44272;">路由末尾切记不要不小心加空格</strong>，否则会导致即使第一次点击正常，但是刷新后浏览器会自动去掉路由空格导致404
2. 文件名最好不要是包含关系，<strong style="color: #e44272;">因为路由一般与文件名保持一致</strong>，意味着路由也会是包含关系，这样会导致接口调用错乱，例如：`/system/page`和`/system/page-user`，如果文件名是`page`和`page-user`，那么路由就会是`/system/page`和`/system/page-user`，这样就会导致`/system/page`接口调用的是`/system/page-user`的接口
3. crudSchemas.columns.search 添加配置不生效
