一、Ext.util.CSS
概述：有效的控制样式表，可以删除修改以及交换
主要方法：
1.createStyleSheet创建一个css样式在head中的标签
2.getRule根据类名得到一个CSSRule的对象
3.swapStyleSheet引入一个css样式文件并指定ID
4.removeStyleSheet用指定的id来删除一个样式
5.update修改样式表中的属性值
代码实现以及注释说明：
//1.createStyleSheet(StringcssText,String id) :StyleSheet 创建一个css样式在head中的标签
Ext.util.CSS.createStyleSheet(".c{color:red}","red");
Ext.get("d1").addClsOnOver("c");
//2.getRule(String/Arrayselector,Boolean refreshCache)根据类名得到一个CSSRule的对象，对象可以获取到里面指定属性
varcssobj=Ext.util.CSS.getRule(".c",true);
alert(cssobj.style.color);
//3.swapStyleSheet(Stringid,String url) 引入一个css样式文件并指定ID，交换样式表，将会把此样式表引入的数序靠前。多用于皮肤切换
vari=1;
Ext.get("b1").on("click",function(){ 
if(i%2==0){
Ext.util.CSS.swapStyleSheet("one","lession10/one.css");
Ext.get("d2").addClsOnOver("col");
i++;
}else{
Ext.util.CSS.swapStyleSheet("two","lession10/two.css");
Ext.get("d2").addClsOnOver("col");
i++;
}
});
//4.removeStyleSheet(Stringid) 用指定的id来删除一个样式
Ext.get("b2").on("click",function(){
Ext.util.CSS.removeStyleSheet("red");
});
//5.updateRule(String/Arrayselector,String property,String value) :Boolean 参数为类名、属性名、值
Ext.get("b3").on("click",function(){
Ext.util.CSS.updateRule(".c","color","#990055");
});
二、Ext.util.ClickRepeater
概述：单机一次，如果不失去焦点。系统自动会去请求 主要用于挤房器和网络忙的时候请等待的功能
直接实例化这个类，第一个参数为 组件的元素对象，第二个为配置对象
delay 首次单机时候的间隔时间
interval发生首次重复事件调用之后每一次事件的间隔时间
stopDefault停止这个el上的默认单机事件
handler执行的动作
//控制元素在指定时间内被单机(如果元素没有失去焦点)
//第一次单击马上会触发事件，如果不去点击其他的元素那么3秒后会自动执行第二次
//以后会以4秒的间隔执行相应的程序
varc1=new Ext.util.ClickRepeater(Ext.get("b4"),{
delay:3000,//首次单机时候的间隔时间
interval:4000,//发生首次重复事件调用之后每一次事件的间隔时间
stopDefault:true,//停止这个el上的默认单机事件
handler:function(){
alert("单机我");
}
});

三、Ext.util.DelayedTask
概述：在规定的时间之后调用函数
创建对象指定一个function为参数
主要方法：delay 参数执行时间， 表示多少时间后触发该对象的函数
cancel移除正在等待的最后一个函数
代码：
//实例化对象，并传入一个可执行的函数为参数
varc1=new Ext.util.DelayedTask(function(){
alert("-------");
});
Ext.get("b5").on("click",function(){
c1.delay(2000);//在2秒后调用，也可以传入第二个参数，参数为执行函数。
c1.cancel();//移除在最后等待的事件
});
四、Ext.util.Format
格式化表示数值和日期等
主要方法：
1.ellipsis当超过位超过指定值时，用...来表示
2.capitalize将首字母变为大写， 一般用于得到它的set和get方法的时候常用
3.date格式化输出日期，第一个传入日期对象， 第二个传入格式
4.substr截取字符串操作
5.lowercase将所有大写转化为小写
6.number讲数值以一定的格式去输入，因为各国的数值表示不同 
7.nl2br将JS中的换行\n解析成<br>标签

代码实现：
varstr="marcio_zhang@163.com";
//1.ellipsis()参数第一为字符串，第二个为当超过位超过此值时，用...来表示
alert(Ext.util.Format.ellipsis(str,10));
//2.capitalize()将首字母变为大写， 一般用于得到它的set和get方法的时候常用
alert(Ext.util.Format.capitalize(str));
//3.date()格式化输出日期，第一个传入日期对象， 第二个传入格式
alert(Ext.util.Format.date(newDate(),"Y年-m月-d日"));
//4.substr截取字符串操作
alert(Ext.util.Format.substr(str,0,5));
//5.lowercase将所有大写转化为小写
alert(Ext.util.Format.lowercase("MARICO"));
//6.number讲数值以一定的格式去输入，因为各国的数值表示不同 
alert(Ext.util.Format.number(123123.123123,"0,000.00"));
//7.nl2br将JS中的换行\n解析成<br>标签
alert(Ext.util.Format.nl2br("marico\nzhang"));
五、Ext.util.MixedCollection对象集合类
概述：可以增加对应的键值对，相当于java的一个Map集合，适合做缓存和静态常量，方便管理
主要方法：
1.集合类的add(String key,Object o) 添加一个对象到集合类中,也可以在第一个参数指定的相应的key值
2.addAll(Object/Arrayobjs)方法。 增加一个数组或者一个集合类
3.clear方法 移除里面所有的对象
4.clone克隆 等于复制对象 
5.判断集合中是否有相应的对象 contains(Objecto) containsKey(String key) 返回一个boolean值
6.each(functionfn,[Object scope]) :void 遍历这个集合类
7.从集合中得到单个的对象
get(String/Numberkey): Object 根据key得到指定的对象 
first()得到集合类中的第一个对象
8.集合的有关事件 当执行add,clear,remove,replace方法的时候可以指定触发的事件,可以on方法来指定
事件，参数一为执行什么操作，第二个是函数，函数参数第一个为这个对象的坐标，第二个为这个对象，第三个为
这个对象key值

代码实现：
//1.集合类的add(String key,Object o) 添加一个对象到集合类中,也可以在第一个参数指定的相应的key值
varitem1=new Ext.util.MixedCollection();
vara={name:'a'};
varb={name:'b'};
item1.add("01",a);
item1.add("02",b);
//alert(item1);
//2.addAll(Object/Arrayobjs)方法。 增加一个数组或者一个集合类
vararr=[a,b]
varitem2=new Ext.util.MixedCollection();
item2.addAll(arr);
//alert(item2);
//3.clear方法 移除里面所有的对象
item2.clear();
//alert(item2);
//4.clone克隆 等于复制对象 
varitem3=item1.clone();
//alert(item3);
/*
* 5.判断集合中是否有相应的对象
* contains(Object o): 返回一个boolean值
* containsKey(String key):Boolean
* */
//alert(item3.contains(a));
//alert(item3.containsKey("01"));
//6.each(functionfn,[Object scope]) :void 遍历这个集合类
item1.each(function(item){
//alert(item.name);
});
//7.从集合中得到单个的对象
//get(String/Numberkey): Object 根据key得到指定的对象 
//first()得到集合类中的第一个对象
//alert(item1.get("01").name);
//alert(item1.get(1).name);
//alert(item1.first().name);
//8.集合的有关事件
//add,clear,remove,replace
item1.on("add",function(index,o,key){
alert("集合item1有了一个新的成员："+key);
});
item1.add("03",{name:"c"}); 
六、Ext.util.TashRunner
概述：主要操作的为线程，可以实现线程的运行和停止，多个线程之间互不影响，与java中的多线程机制相似
1.实例化一个Ext.util.TaskRunner类的对象
2.定一个线程的对象 里面指定属性：
run指定的为function，表示线程开启后执行的函数
interval指定的为一个时间数，表示每隔多少事件执行run指定的函数
3.调用start方法开启线程 传入的一个线程的对象
4.调用stop方法停止线程，传入的是需要停止的那个线程的对象

varrunner=new Ext.util.TaskRunner();
vartask={
run:function(){
Ext.getDom("input").value=Ext.util.Format.date(newDate(),"Y-m-d-s");
},
interval:1000
};
runner.start(task);
Ext.get("b6").on("click",function(){
runner.stop(task);
});


PS：一次性发的话 论坛字数有限制！　
二、Ext.util.Format 
　　　　2.1　　Ext.util.Format.capitalize(value);　　//首字母大写 
　　　　2.2　　Ext.util.Format.ellipsis(value, len, word); 　　//从字符串开始处截取len长度显示，超过部分用...表示；word为布尔值，为true时在前面截取的基础上再从' '、'.'、'!'、'?'关键字处截取前面(len)，ellipsis("abcde.fghijkl",10,true)返回abcde 
　　　　2.3　　Ext.util.Format.htmlEncode(value);　　 //HTML编码，将& <  >  “替换为&amp;&lt;&gt;&quot; 
　　　　2.4　　Ext.util.Format.htmlDecode(value);　　 //HTML解码，与上面相反 
　　　　2.5　　Ext.util.Format.trim(value); 　　　　　　//截取字符串左右的空格 
　　　　2.6　　Ext.util.Format.substr(value, start, length); 　　//从value指定的start位置开始截取length长度的子串返回 
　　　　2.7　　Ext.util.Format.lowercase(value);　　      //转换大写 
　　　　2.8　　Ext.util.Format.uppercase(value);　　     //转换小写 
　　　　2.9　　Ext.util.Format.stripTags(v);　　　　      //去除HTML标签:/<\/?[^>]+>/gi 
　　　　2.10　　Ext.util.Format.usMoney(v); 　　　　　 //转换到'$'符号的货币形式 
　　　　2.11　　Ext.util.Format.date(v, format);　　　　//格式化日期输出,format默认格式"m/d/Y" 
　　　　2.12　　Ext.util.Format.round(value, precision);　　//四舍五入，precision指精确位数 
　　　　2.13　　Ext.util.Format.number(v, format);　　　　//格式化数字显示 
　　　　2.14　　Ext.util.Format.nl2br(value); 　　　 //将字符串中的'\n'替换成'<br />' 
　　　　2.15　　Ext.util.Format.fileSize(value);  　　//将字节数转成更大的单位KB和MB显示，fileSize(1024) = 1KB 
　　　　2.16　　Ext.util.Format.defaultValue(value, defaultValue);　　//如果value未定义或为空字符串则返回defaultValue 
　　　　2.17　　Ext.util.Format.stripScripts(v);　　　//去除脚本标签 
　　　　2.18　　Ext.util.Format.undef(value);　　　　//如果value未定义,返回空字符串，反之返回value本身 

　　三、扩展JS原有对象 
　　　　3.1　　String 
　　　　　　3.1.1　　.format(format)　　//和C#里面是一样的用法 
　　　　　　3.1.2　　.toggle(value, other)　　//交换值,如果当前值等于value,则被赋值other 
　　　　3.2　　Array 
　　　　　　3.2.1　　.indexOf(o)　　//返回元素o在数组ArrayObject中的位置，找不到返回-1 
　　　　　　3.2.2　　.remove(o)　　//从数组ArrayObject删除元素o 
　　　　3.3　　Function 
　　　　　　3.3.1　　.createInterceptor(fcn, scope)　　//创建阻断方法,如果fcn返回false,原方法将不会被执行，参见这里
　　　　　　3.3.2　　.createCallback(/*args...*/)　　　//创建回调，以无参的函数作为参数，但是现有的方法已经具有了参数，如果直接写上可以用这个来创建一个回调，类似于function(){ //实际的带参调用 } ，见这里1、这里2 
　　　　　　3.3.3　　.createDelegate(obj, args, appendArgs) //创建委托，与上面相比，自己可以访问obj中的属性和方法，见这里 
　　　　　　3.3.4　　.defer(millis, obj, args, appendArgs)　　//定时执行，隔millis毫秒后执行原方法，参见这里 
　　　　　　3.3.5　　.createSequence(fcn, scope)　　　　//Ext-more.js中，创建组合方法,执行原方法+fcn，参见这里 

　　四、 其他 
　　　　4.1　　表单 
　　　　　　4.1.1　　一次取得表单所有的表单元素key/value集合 
　　　　　　　　form1.form.getValues()  //form1为Ext.FormPanel，例如： 
                        //注意 
                        var conn = new Ext.data.Connection(); 
                        conn.request({ 
                            url: 'submit.aspx?method=Submit4', 
                            //此处与params对应，如果为POST，则服务器端从Request.Form中可以取得到数据，反之从QueryString中取数据 
                            method: 'POST',//GET 
                            params:form1.form.getValues(), 
                            success: function(response, opts) { 
                                 MsgInfo(response.responseText); 
                            } 
                        }); 
　　　　　　　　form1.form.setValues(values)     //form1.form.setValues({id:1,name:'aabbcc'}) 赋值 
　　　　　　4.1.2　　表单元素取值赋值一次取得 
　　　　　　　　4.1.2.1　　form1.form.findField('TextBox').getValue() 
　　　　　　　　4.1.2.2　　form1.form.getValues().TextBox 
　　　　　　　　4.1.2.3　　form1.form.getFieldValues().TextBox 
　　　　4.2　　切换皮肤 
　　　　　　Ext.util.CSS.swapStyleSheet("theme", "resources/css/ext/xtheme-orange.css");　　　　//注意路径