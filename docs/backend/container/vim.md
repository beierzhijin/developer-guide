---
title: VIM
titleTemplate: ShowMaker
---

# VIM

## 光标进入编辑模式
`i` `a` `o` `O` `I` `A`

## 删除（normal mode）
`dt 不包含` `df 包含` `删除光标到指定字符之间的内容`

`x` `dl` `删除当前光标下的字符`

`dw 删除光标之后的单词剩余部分`

`d$ 删除光标之后的该行剩余部分`

`dd 删除当前行`

`d0 删除光标之前的该行剩余部分`

`c 功能和d相同，区别在于完成删除操作后进入INSERT MODE`

`cc 也是删除当前行，然后进入INSERT MODE`

`da(` `di(` `删除成对符号之间的内容 例如：() {} [] '' ""`

`daw 删除光标所在的单词`

`删除任意字符之间的内容 例如：abcdefg，先fa将光标移动到a字符，按v进入visual mode，然后fg移动光标到g字符，按d删除`

## 搜索后切换
`n 下一个` `N 上一个` `noh 取消高亮`

## 查找
`/ 查找` `? 查找上一个` `n 下一个` `N 上一个`

`gd 跳转到定义`

## 复制
`复制整行（nyy或者yny ，复制n行，n为数字）`

`y$ 复制光标到行尾`

`y0 复制光标到行首`

`yw 复制光标到单词尾`

`yiw 复制光标到单词首`

`yyp 复制当前行粘贴`

## 光标移动
> https://zhuanlan.zhihu.com/p/365490170

`w : 移动到下一个word开头`

`W : 也是移动到下一个WORD开头`

`e : 移动到下一个word结尾，不在空行停留`

`E : 移动到下一个WORD结尾 ，不在空行停留`

`b : 移动到上一个word开头`

`B : 移动到上一个WORD开头`

`ge : 移动到上一个word结尾`

`gE : 移动到上一个WORD结尾`

`$ or A : 移动到行尾`
  
`^ or I or 0 : 移动到行首`

`F xiangying 移动到当前行中，光标之前的xiangying字符`

`f xiangying 移动到当前行中，光标之后的xiangying字符`
