This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 类 Excel 编辑器
<p style="text-align:center;">
  <a href="https://travis-ci.org/heruiwoniou/excel-editor">
    <img src="https://travis-ci.org/heruiwoniou/excel-editor.svg?branch=master" alt="Build Status" />
  </a>
</p>

[演示页面](https://heruiwoniou.github.io/excel-editor/)

## 技术栈

- react

## 功能说明


- 动态表格 (无限加载)
- 表格选取
- 表格内容编辑: 
	- 添加 (双击 或者 通过直接键盘输入)
	- 修改 (双击 或者 通过直接键盘输入)
	- 删除 (backspace/delete)
- 插入函数功能
	- sum 函数
- 排序 (对选区进行排序操作)
	- 行(正/倒)排序
	- 列(正/倒)排序

## 运行
```
npm run install
npm run start
```

## 打包
```
npm run install
npm run build
```

`注意, 如果是本地build请删除package.json 下的homepage再进行打包, 项目会根据homepage设置publicPath`
