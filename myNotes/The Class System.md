Class System
===
Ext JS 4.x的Class System进行了重新设计。

1. Overview
---
EXT JS4拥有超过300个类，社区中有超过200,000乐名不同背景的开发者参与开发，因此，为了构建一个统一的代码结构面临很大挑战：
× 简单易学
× 开发快速，调试简单，布署方便
× 组织结构良好，易扩展和维护

JS是一种classless, 基于原型的语言，因此，这种语言的最大好处是它的灵活性，它可以用很多种方式, 各种编码风格和技术，实现一种功能。这种特性带来了很多不可预知性。没有统一的结构，JS代码会很难被理解、维护和重用。

面向对象的编程，从另一方面来说，仍然是OOP最爱欢迎的模式。面向对象语言通常是强类型、具有封装特性，并且有标准的编码约定。通过让程序员们认可大量的原则，写的代码变得更加可预知、可扩展和可估量。但是，在JS这样一种语言中并没有发现这些动态特性。

每种方法都有它的优点和缺点，但是我们可以在保留优点的同时，尽量避免其缺点吗？答案是肯定的，我们在EXT JS4中实现了。

2. 命名约定
使用统一的命名约定对你的代码中的类、命名空间及文件名进行命名，可以让你的代码保持整洁、结构良好及可读性好。

1）Classes
类的命名只可以包含`字母`字符，数字也是允许使用的但是在大多数情况下不建议，除非它们属于一个技术名词。不要用下划线，-及其它非字母字符，比如：
* MyCompany.userful_util.Debug_toolbar is discouraged
* MyCompany.util.Base64 is acceptable

类的名字应该使用包来分组管理，这样可以使用.来引用到。至少，应该有一个唯一的顶级命名空间下跟着一个类名，比如：

MyCompany.data.CoolProxy
MyCompany.Application

顶级命名空间名称及类名应该使用骆驼命名法命名，除此之外，其它的都应该使用全是小写。比如：

MyCompany.form.action.AutoLoad

类名不应该是Sencha及Ext作为顶级命名空间名称。

首字母缩略词也应该遵循骆驼命名法。比如：
Ext.data.JsonProxy instead of Ext.data.JSONProxy
MyCompany.util.HtmlParser instead of MyCompary.parser.HTMLParser
MyCompany.server.Http instead of MyCompany.server.HTTP

2) 源文件命名
类的命名直接反映它们的存储路径。因此，它们必须保存在单独的文件中，比如：
Ext.util.Observable is stored in path/to/src/Ext/util/Observable.js
Ext.form.action.Submit is stored in path/to/src/Ext/form/action/Submit.js
MyCompany.chart.axis.Numeric is stored in path/to/src/MyCompany/chart/axis/Numeric.js

`path/to/src`是你的程序类的目录，所有的类都应该在通用根目录下，并且与命名空间相一致。这样更易于开发、维护和布署。

3）方法和变量命名
* 与类的命名一样，方法和变量名也必须只使用字母字符，数字只允许用在特定的技术名词中，不要使用下划线、中划线及其它非字母字符。
* 方法和变量名遵循骆驼命名法则，缩略词也一样。
* 示例：
> * 允许使用的方法名：encodeUsingMd5() getHtml() instead of getHTML() getJsonResponse() instead of getJSONResponse() parseXmlContent() instead ofparseXMLContent()
> * 允许使用的变量名：var isGoodName var base64Encoder var xmlReader var httpServer

4) 属性命名
* 类的名字与属性的命名规则完全相同，除了对于静态变量的属性。
* 静态变量的属性命名全部大写。例如：
> * Ext.MessageBox.YES = "Yes"
> * Ext.MessageBox.NO = "No"
> * MyCompany.alien.Math.PI = "4.13"


