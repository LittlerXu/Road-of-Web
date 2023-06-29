# Web API

## DOM

### DOM概述

#### 什么是DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。

<img src="Web API.assets/image-20221212203457313.png" alt="image-20221212203457313" style="zoom:67%;" />

#### 节点

DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。

节点的类型有七种:

- **文档节点**(Document)：整个文档树的顶层节点,浏览器原生提供`document`节点，代表整个文档。
- **文档类型节点**(DocumentType)：`doctype`标签（比如`<!DOCTYPE html>`）
- **元素节点**(Element)：网页的各种HTML标签（比如`<body>`、`<a>`等）
- **属性节点**(Attribute)：网页元素的属性（比如`class="right"`）
- **文本节点**(Text)：标签之间或标签包含的文本(包含文字、空格、换行等)
- **注释节点**(Comment)：注释47 
- **文档片段节点**(DocumentFragment)：文档的片段

浏览器提供一个原生的节点对象`Node`，上面这七种节点都继承了`Node`，因此具有一些共同的属性和方法。

一般地，节点都拥有`nodeType（节点类型）`、`nodeName（节点名称）`和`nodeValue（节点值）`这三个基本属性。

- 元素节点  nodeType 为 1

- 属性节点 nodeType 为 2

- 文本节点 nodeType 为 3 

#### 节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，又像一棵树。

<img src="Web API.assets/image-20221212203457313.png" alt="image-20221212203457313" style="zoom:67%;" />

浏览器原生提供`document`节点，代表整个文档。

```js
document
// 整个文档树
```

文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。后者构成了树结构的根元素节点，其他 HTML 元素节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

### 获取元素

>由节点组成的伪数组都继承了NodeList接口,有如下特征:
>
>很像数组，可以使用`length`属性和`forEach`方法。但是，它不是数组，不能使用`pop`或`push`之类数组特有的方法。
>
>>一些`Document`对象的集合属性，比如`document.links`、`document.forms`、`document.images`等继承的是HTMLCollection接口,只能包含元素节点,且没有`forEach`方法，只能使用`for`循环遍历。
>
>[详情请见]([NodeList 接口，HTMLCollection 接口 - JavaScript 教程 - 网道 (wangdoc.com)](https://wangdoc.com/javascript/dom/nodelist#nodelist-接口))

#### 利用节点层级关系获取元素

DOM树中的节点有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 兄弟节点关系（sibling）：拥有同一个父节点的节点



DOM 提供操作接口，用来获取这三种关系的节点:

##### 父元素节点

对于一个节点来说，它的父节点只可能是三种类型: 元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

>文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是`null`。

`Node.parentElement`返回当前节点的**父元素节点**,相当于把后两种父节点都排除了。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。

##### 子元素节点

只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点.

`Element.children`返回由当前元素节点的所有**子元素节点**组成的伪数组,如果没有子元素节点，返回`null`。

>**注意**
>
>Element.children返回的是HTMLCollection实例对象,没有farEach方法,可以将其转为Array实例对象然后遍历,或者使用for循环遍历
>
>```js
>//将伪数组转化为真正的数组
>const lis = Element.children;
>const liArr = Array.from(lis);
>```
>
>

元素节点的第一个子**元素**节点: `Element.firstElementChild`或者`Element.children[0]`

元素节点的最后一个子**元素**节点: `Element.lastElementChild`或者`Element.children[Element.children.length - 1]`

如果没有子元素节点，这两个属性返回`null`。

综合案例:仿新浪下拉菜单:[16-新浪下拉菜单_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=231&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd)



##### 兄弟元素节点

`Element.nextElementsibling`返回当前元素节点的下一个兄弟元素节点，如果没有下一个兄弟节点则返回`null`。

`Element.previousElementsibling`返回当前元素节点的上一个兄弟元素节点，如果没有上一个兄弟节点则返回`null`。

#### 根据 ID 获取

使用 `getElementById()` 方法可以获取带有 ID 的元素对象.

```js
document.getElementById('id');
```

>**提示:**
>
>用`console.log()`输出元素对象,会以HTML标签的形式输出此对象
>
>用`console.dir()`输出对象元素,会以对象的形式输出
>
><img src="Web API.assets/image-20221212204753583.png" alt="image-20221212204753583" style="zoom: 67%;" />

#### 根据 标签名 获取

使用 `document/Element.getElementsByTagName()` 方法可以返回文档/指定元素中所有目标**元素对象组成的伪数组**.

```js
document.getElementsByTagName('标签名');
```

>**注意**
>
>1. 只要获取的是由元素组成的伪数组,操作里面的元素就需要用`数组名[索引]`的方式
>
>   
>2. 得到的元素对象是动态的,当文档中对应的元素对象发生改变,伪数组中的恶元素对象会随之改变
>3. 即使只获取了一个标签甚至文档中没有目标标签,都会返回一个伪数组,没有获取到元素对象则返回空的伪数组



#### 根据 类名 获取

使用 `document/Element.getElementsByClassName()` 方法可以返回文档/指定元素中所有目标**元素对象组成的伪数组**.

```js
document.getElementsByClassName('类名')
```

#### 根据 选择器 获取

按照选择器的方式来获取元素,也就是说，按照我们写 `css` 的时候的选择器来获取

- `document/Element.querySelector('选择器')` 返回文档/指定元素中符合选择器的**第一个**元素对象
- `document/Element.querySelectorAll('选择器')` 返回返回文档/指定元素中符合选择器的**所有**元素对象组成的伪数组

```js
var temp1 = document.querySelector('.box')
console.log(temp1)
var temp2 = document.querySelectorAll('.box')
console.log(temp2)
```

![image-20221212213559655](Web API.assets/image-20221212213559655.png)



> 提示:
>
> 将上述方法中的`document`换成`元素对象`可以获取元素中符合规则的后代元素
>
> eg:
>
> ```js
> element.getElementsByTagName('标签名');
> ```
>
> `element`是需要提前获取的父元素对象,获取的时候不包括父元素自己,注意:如果获取的父元素对象在伪数组中,则需要用`数组名[索引]`获取父元素对象

#### 获取特殊元素(body、html)

```js
document.body  //返回body元素节点
document.doucumentElement  //返回html元素节点
```

### 操作元素

JavaScript 的 DOM 操作可以改变网页内容、结构和样式，我们可以利用 DOM 操作元素来改变元素里面的内容 、属性等。

#### 操作元素内容

##### element.innerHTML

`innerHTML`设置或获取标签所包含的HTML结构+文本信息(从标签起始位置到终止位置全部内容，包括HTML标签)

```js
<body>
    <div>
      <p>
        he llo
        <span>world</span>
      </p>
    <div class="box"></div>
    </div>
    <script>
      var div = document.querySelector("div");
      console.log(div.innerHTML);
      var div2 = document.querySelector(".box")
      div2.innerHTML = "<p>hello<br><span>world</span></p>"
    </script>
  </body>
```

![image-20221212234322523](Web API.assets/image-20221212234322523.png)



##### element.innerText

`innerText`设置或获取标签所包含的文本信息(从起始位置到终止位置的内容, 但它去除 html 标签， 同时空格和换行也会去掉)

```js
<body>
    <div>
      <p>
        he llo
        <span>world</span>
      </p>
    <div class="box"></div>
    </div>
    <script>
      var div = document.querySelector("div");
      console.log(div.innerText);
      var div2 = document.querySelector(".box")
      div2.innerText = "<p>hello<br><span>world</span></p>"
    </script>
  </body>
```

![image-20221212234709752](Web API.assets/image-20221212234709752.png)

innerHTML和innerText详解:[innerHTML innerText的使用和区别 - 爱笑的小宇宙 - 博客园 (cnblogs.com)](https://www.cnblogs.com/yuer20180726/p/11135575.html#:~:text=document对象中有 innerHTML、innerText这 两个属性，都是获取document对象文本内容，但使用起来还是有区别的；,1） innerHTML设置或获取标签所包含的HTML%2B文本信息 (从标签起始位置到终止位置全部内容，包括HTML标签，但不包括自身))

>**提示**
>
>`innerHTML`是符合W3C标准的属性,全浏览器都可使用,但`innerText`火狐浏览器不适用,所以为了保证兼容性应尽可能地使用`innerHTML`,避免使用`innerText`
>
>- 要输出不含HTML标签的内容，可以使用`innerHTML`取得包含HTML标签的内容后，再用正则表达式去除HTML标签:
>
>```js
><html>
>    <head><title>innerHTML</title></head>
>    <body>
>        <div id="d1"><p id="p1">hello world </p></div>
>        <script>
>            var content = document.getElementById("p1");
>            console.log(content.innerHTML.replace(/& lt;.+?>/gim,''));  //hello world
>        </script>
>    </body>
></html>
>```
>
>- 要想使输入的文本中的HTML标签不被解析而是原文本,可以利用转义字符改写相关字符
>
>```js
><body>
>    <p id="p1"></p>
>    <script>
>      var content = document.getElementById("p1");
>      content.innerHTML = "&lt;span>Hello World&lt;/span>"  //&lt;表示'<'
>      console.log(content)  //<p id="p1"><span>Hello World< /span></p>
>    </script>
></body>
>```



#### 操作元素属性 

HTML 元素包括标签名和若干个键值对，这个键值对就称为“属性”（attribute）。

```HTML
<a id="test" href="http://www.example.com">
  链接
</a>
```

上面代码中，`a`元素包括两个属性：`id`属性和`href`属性。

属性本身是一个对象（`Attr`对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（`HTMlElement`对象）来操作属性。本章介绍如何操作这些属性。

##### Element.attributes 属性

元素对象有一个`attributes`属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有`attributes`属性，但返回的都是`null`，因此可以把这个属性视为元素对象独有的。

单个属性可以通过序号引用，也可以通过属性名引用。

```js
// HTML 代码如下
// <body bgcolor="yellow" onload="">

document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
```

注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。



属性节点对象有`name`和`value`属性，对应该属性的属性名和属性值，等同于`nodeName`属性和`nodeValue`属性。

```js
// HTML代码为
// <div id="mydiv">
var n = document.getElementById('mydiv');

n.attributes[0].name // "id"
n.attributes[0].nodeName // "id"

n.attributes[0].value // "mydiv"
n.attributes[0].nodeValue // "mydiv"
```

下面代码可以遍历一个元素节点的所有属性。

```js
var para = document.getElementsByTagName('p')[0];
var result = document.getElementById('result');

if (para.hasAttributes()) {
  var attrs = para.attributes;
  var output = '';
  for(var i = attrs.length - 1; i >= 0; i--) {
    output += attrs[i].name + '->' + attrs[i].value; 
  }
  result.textContent = output;
} else {
  result.textContent = 'No attributes to show';
}
```

##### 元素的标准属性

HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。

```js
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
```

上面代码中，`a`元素标签的属性`id`和`href`，自动成为节点对象的属性。



这些属性都是可写的。

```js
var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';
```

上面的写法，会立刻替换掉`img`对象的`src`属性，即会显示另外一张图片。

>注意: 这种用法虽然可以读写属性，但是无法删除属性，`delete`运算符在这里不会生效。



这种修改属性的方法，常常用于添加表单的属性。

```js
var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';
```

上面代码为表单添加提交网址和提交方法。



HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，则采用驼峰命名法, 比如`onClick`。

有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个。  

- `for`属性改为`htmlFor`
- `class`属性改为`className`

另外，HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将`onClick`的值转为一个函数，将`style`属性的值转为一个`CSSStyleDeclaration`对象。因此，可以对这些属性赋予各种类型的值。



综合案例:

- 点击按钮,图片改变:https://www.bilibili.com/video/BV1Sy4y1C7ha?t=25.0&p=204
- 分时问候:https://www.bilibili.com/video/BV1Sy4y1C7ha?t=6.6&p=205
- 仿京东显示/隐藏输入的密码: [17-仿京东显示隐藏密码明文案例（上）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=207&vd_source=2338fda5892f8a962e39f2e0fb4667dd)

##### 属性操作的标准方法

###### 概述

元素节点提供六个方法，用来操作属性。

- `getAttribute()`
- `getAttributeNames()`
- `setAttribute()`
- `hasAttribute()`
- `hasAttributes()`
- `removeAttribute()`

这有几点注意。

（1）适用性

这六个方法对所有属性（包括用户自定义的属性）都适用。

（2）返回值

`getAttribute()`只返回字符串，不会返回其他类型的值, 只需声明的属性返回的值为空字符串.

（3）属性名

这些方法只接受属性的标准名称，不用改写带'-'的属性名和保留字，比如`for`和`class`都可以直接使用。

```js
var image = document.images[0];
image.setAttribute('class', 'myImage');
```

上面代码中，`setAttribute`方法直接使用`class`作为属性名，不用写成`className`。

###### Element.getAttribute()

`Element.getAttribute`方法返回当前元素节点的指定属性。如果指定属性不存在，则返回`null`。

```js
// HTML 代码为
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align') // "left"
```

###### Element.setAttribute()

`Element.setAttribute`方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。

```js
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
b.setAttribute('disabled', true);
```

上面代码中，`button`元素的`name`属性被设成`myButton`，`disabled`属性被设成`true`。

>**注意**
>
>在HTML中,`disabled`和`checked`属性只要声明即可,在JS中这两个属性是布尔类型的(不是布尔值也会自动转化为布尔值),值为`true`相当于在HTML中声明了此属性,值为`false`相当于在HTML中未声明此属性. 在JS中设置这两个属性并不会表现在HTML标签中,所以不能通过`Element.hasAttribute()`方法判断此标签是否被选中(checked)或是否可用(disabled)

###### Element.removeAttribute()

`Element.removeAttribute`方法移除指定属性。该方法没有返回值。

```js
// HTML 代码为
// <div id="div1" align="left" width="200px">
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// <div id="div1" width="200px">
```

综合案例(**重点案例**):Tab栏切换:当鼠标点击上面相应的选项卡( tab )，下面内容跟随变化:[08-tab栏切换布局分析（重要）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=223&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd)

###### Element.getAttributeNames()

`Element.getAttributeNames()`返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。使用`Element.attributes`属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。

```js
var mydiv = document.getElementById('mydiv');

mydiv.getAttributeNames().forEach(function (key) {
  var value = mydiv.getAttribute(key);
  console.log(key, value);
})
```

上面代码用于遍历某个节点的所有属性。

###### Element.hasAttribute()

`Element.hasAttribute`方法返回一个布尔值，表示当前元素节点是否包含指定属性。

```js
var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
  d.setAttribute('align', 'center');
}
```

上面代码检查`div`节点是否含有`align`属性。如果有，则设置为居中对齐。

###### Element.hasAttributes()

`Element.hasAttributes`方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回`false`，否则返回`true`。

```js
var foo = document.getElementById('foo');
foo.hasAttributes() // true
```



##### 自定义属性(dataset)

有时，需要给HTML元素添加自定义属性，供 JavaScript 脚本使用。

H5规范:自定义属性以`data-`开头.

```js
<div id="mydiv" data-foo="bar">
```

在JS中,对于以`data-`开头的自定义属性有特有的读写方法:

元素节点都有一个`dataset`属性，它是一个对象，里面的属性是为元素以'data-'开头的自定义属性(不包含"data-"),可以用来操作 HTML 元素标签的`data-*`属性。

```js
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```

上面代码中，通过`dataset.foo`读写`data-foo`属性。

>注意:
>
>利用dataset获取到的元素属性值都是字符串类型, 有可能需要转换类型



删除一个`data-*`属性，可以直接使用`delete`命令。

```js
delete document.getElementById('myDiv').dataset.foo;
```



除了`dataset`属性，也可以用`getAttribute('data-foo')`、`removeAttribute('data-foo')`、`setAttribute('data-foo')`、`hasAttribute('data-foo')`等方法操作`data-*`属性,用这些方法时不用改写属性名.



注意，`data-`后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用`A`到`Z`的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。

>**提示**
>
>`data-*`属性名转成`dataset`的键名的规则:
>
>将开头的'data-'直接省略,然后将后面的内容改写为驼峰命名法,eg:`data-hello-world`->`helloWorld`
>
>反过来也是一样的,eg:`helloWorld`->`data-hello-world`](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=207&vd_source=2338fda5892f8a962e39f2e0fb4667dd)

#### 操作元素样式

##### style

操作 CSS 样式最简单的方法，直接操作网页元素的`style`属性。

```js
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
```

上面的代码相当于下面的 HTML 代码。

```HTML
<div style="background-color:red; border:1px solid black;" />
```

`style`不仅可以使用字符串读写，它本身还是一个对象，部署了 `CSSStyleDeclaration` 接口，可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。

```js
e.style.fontSize = '18px';
e.style.color = 'black';
```

综合案例:

- 循环精灵图: [21-循环精灵图_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=211&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd)

- 隐藏/显示文本框内容(类似placerholder):[22-显示隐藏文本框内容_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=212&vd_source=2338fda5892f8a962e39f2e0fb4667dd)(高级版在"Road-of-Web"里)



##### Window.getComputedStyle()

操作元素的`style`属性只能修改行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的全部样式要通过`window.getComputedStyle()`得到。

获取的样式是元素在浏览器中最终渲染效果的样式,也就是各种 CSS 规则叠加后的结果。

>**注意**
>
>CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。

**语法:**

```js
window.getComputedStyle(element, pseudoElement)
```

**参数说明：**

- element: 必需，要获取样式的元素。
- pseudoElement: 可选，伪类元素，当不查询伪类元素的时候可以忽略或者传入 null。

**返回值**

返回的对象是 CSSStyleDeclaration 类型的对象。

```js
//eg:获取 DIV 的背景颜色值：
function myFunction(){
    var elem = document.getElementById("test");
    var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue("background-color");
    console.log(theCSSprop)
}
```



##### className

`className`是元素对象的一个属性,用来操作元素的类名,主要用途为通过操作元素的类名从而类操作元素的样式,适合于样式较多或者功能复杂的情况

>注意:
>
>`className`操作类名为全覆盖式,即通过`className`修改元素的类名会直接将原来所有的类名都覆盖掉
>
>```js
><body>
>      <div class="box capacity"></div>
>      <script>
>        var chan = document.querySelector("div")
>        chan.className = "changed"
>        console.log(chan) //<div class="changed"></div>
>      </script>
>    </body>
>```
>
>想要直接添加类名而非直接覆盖的方法:
>
>语法:`element.className += " 新增类名"` //特别注意: "新增类名"前要有一个空格,多个新增类名之间用空格隔开
>
>```js
><body>
>      <div class="box capacity"></div>
>      <script>
>        var chan = document.querySelector("div")
>        chan.className += " changed"
>        console.log(chan) //<div class="box capacity changed"></div>
>      </script>
>    </body>
>```
>

综合案例:

密码框验证信息:[24-密码框验证信息_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=214&vd_source=2338fda5892f8a962e39f2e0fb4667dd)(高级版在"Road-of-Web"里)







利用 DOM 树可以把节点划分为不同的层级关系，常见的是**父子兄层级关系**。

<img src="Web API.assets/image-20221215190728774.png" alt="image-20221215190728774" style="zoom:67%;" />



### 创建元素节点

`document.createElement`方法用来生成元素节点，并返回该节点。

```js
var newDiv = document.createElement('div');
```

createElement方法的参数为`'标签名'`，即元素节点的`tagName`属性，HTML标签名大小写不敏感，即参数为`div`或`DIV`返回的是同一种节点。如果参数里面包含尖括号（即`<`和`>`）会报错。

```js
document.createElement('<div>');
// DOMException: The tag name provided ('<div>') is not a valid name
```

注意，`document.createElement`的参数可以是自定义的标签名。

```js
document.createElement('foo');
```

#### 插入元素子节点

### 插入元素节点

##### ParentNode.insertBefore()

`parentNode.insertBefore(newNode, referenceNode)`方法用于在指定子节点之前插入一个节点,**通过传入不同的第二个参数,可以实现在任意位置插入节点**

###### 在指定子节点之前或之后插入节点

```js
parentNode.insertBefore(newNode, referenceNode);
```

`insertBefore`方法接受两个参数，第一个参数是所要插入的节点`newNode`，第二个参数是父节点`parentNode`内部的一个子节点`referenceNode`。`newNode`将插在`referenceNode`这个子节点的前面。返回值是插入的新节点`newNode`。



由于不存在`insertAfter`方法，如果新节点要插在父节点的某个子节点后面，可以用`insertBefore`方法结合`nextSibling`属性模拟。

```js
parentNode.insertBefore(newNode, referenceNode.nextSibling);
```

如果`referenceNode`是当前节点的最后一个子节点，则`referenceNode.nextSibling`返回`null`，这时`s1`节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在`s2`的后面。

###### 添加元素节点使其成为父节点的第一个元素节点

当传入的第二个参数为*父元素的第一个元素节点*时,可以实现将元素节点插入为父元素的第一个元素节点

```js
if(parentNode.children.length ==0) {
    parentNode.insertBefore(newElementNode, null); //当父节点没有子节点时
}
else {
    parentNode.insertBefore(newElementNode, parentNode.firstElementChild); //当父元素有子节点时
}
```

###### 添加元素节点使其成为父节点的最后一个元素节点

如果`insertBefore`方法的第二个参数为`null`，则元素节点将插在当前节点内部的最后位置，即变成最后一个子元素节点。

```js
var p = document.createElement('p');
document.body.insertBefore(p, null);  //无论父节点有没有子节点,p元素都会插入成为body的最后一个子节点
```



>**注意**
>
>如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。

如果要插入的节点是`DocumentFragment`类型，那么插入的将是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值将是一个空的`DocumentFragment`节点。

综合案例: 发布评论:[19-简单版发布留言案例_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=234&vd_source=2338fda5892f8a962e39f2e0fb4667dd)(高级版在"Road-of-Web"里)



##### ParentNode.append()和ParentNode.prepend()

**ParentNode.append()**

`append()`方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。

该方法不仅可以添加元素子节点（参数为元素节点），还可以添加文本子节点（参数为字符串）。

```js
var parent = document.body;

// 添加元素子节点
var p = document.createElement('p');
parent.append(p);

// 添加文本子节点
parent.append('Hello');

// 添加多个元素子节点
var p1 = document.createElement('p');
var p2 = document.createElement('p');
parent.append(p1, p2);

// 添加元素子节点和文本子节点
var p = document.createElement('p');
parent.append('Hello', p);
```

该方法没有返回值。

>注意，该方法与`Node.prototype.appendChild()`方法有三点不同。
>
>- `append()`允许字符串作为参数，`appendChild()`只允许子节点作为参数。
>- `append()`没有返回值，而`appendChild()`返回添加的子节点。
>- `append()`可以添加多个子节点和字符串（即允许多个参数），`appendChild()`只能添加一个节点（即只允许一个参数）。

**（2）ParentNode.prepend()**

`prepend()`方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与`append()`方法完全一致，也是没有返回值。



##### ChildNode.before()，ChildNode.after()

**（1）ChildNode.before()**

`before()`方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。

注意，该方法不仅可以插入元素节点，还可以插入文本节点。

```js
var p = document.createElement('p');
var p1 = document.createElement('p');

// 插入元素节点
el.before(p);

// 插入文本节点
el.before('Hello');

// 插入多个元素节点
el.before(p, p1);

// 插入元素节点和文本节点
el.before(p, 'Hello');
```

**（2）ChildNode.after()**

`after()`方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与`before`方法完全相同。

### 删除节点

#### ParentNode.removeChild()

`removeChild()`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

```js
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```

上面代码移除了`divA`节点。注意，这个方法是在`divA`的父节点上调用的，不是在`divA`上调用的。

下面是如何移除当前节点的所有子节点。

```js
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

如果参数节点不是当前节点的子节点，`removeChild`方法将报错。

#### ChildNode.remove()

`remove()`方法用于从父节点移除当前节点。

```js
el.remove()
```

上面代码在 DOM 里面移除了`el`节点。



综合案例:

- 删除评论:[02-删除留言案例_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=236)
- 动态生成表格:[04-动态生成表格-创建学生数据_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=238&vd_source=2338fda5892f8a962e39f2e0fb4667dd)



### 替换子节点

#### ParentNode.replaceChild()

`replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。

```js
var replacedNode = parentNode.replaceChild(newChild, oldChild);
```

上面代码中，`replaceChild`方法接受两个参数，第一个参数`newChild`是用来替换的新节点，第二个参数`oldChild`是将要替换走的子节点。返回值是替换走的那个节点`oldChild`。

```js
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```

上面代码是如何将指定节点`divA`替换走。

#### ChildNode.replaceWith()

`replaceWith()`方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。

```js
var span = document.createElement('span');
el.replaceWith(span);
```

上面代码中，`el`节点将被`span`节点替换。

### 复制节点

`cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

```js
var cloneUL = document.querySelector('ul').cloneNode(true);
```

该方法有一些使用注意点。

（1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失`addEventListener`方法和`on-`属性（即`node.onclick = fn`），添加在这个节点上的事件回调函数。

（2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如`Node.appendChild`这样的方法添加到文档之中。

（3）克隆一个节点之后，DOM 有可能出现两个有相同`id`属性（即`id="xxx"`）的网页元素，这时应该修改其中一个元素的`id`属性。如果原节点有`name`属性，可能也需要修改。



### 元素对象的常用方法

#### element.focus()，element.blur()

`element.focus()`方法用于将当前页面的焦点，转移到指定元素上。

```js
document.getElementById('my-span').focus();
```

该方法可以接受一个对象作为参数。参数对象的`preventScroll`属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。

```js
function getFocus() {
  document.getElementById('btn').focus({preventScroll:false});
}
```

上面代码会让`btn`元素获得焦点，并滚动到可见区域。

从`document.activeElement`属性可以得到当前获得焦点的元素。

`element.blur()`方法用于将焦点从当前元素移除。

#### Element.click()

`Element.click`方法用于在当前元素上模拟一次鼠标点击，相当于触发了`click`事件。

## 事件

### 为元素设置监听函数

浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是事件驱动编程模式（event-driven）的主要编程方式。

JavaScript 有三种方法，可以为事件绑定监听函数:

- 通过HTML标签的`on事件名称`属性定义某些事件的监听代码:

```js
<body onload="doSomething()">
<div onclick="console.log('触发事件')">
```

- 通过JS元素的`on事件名称`属性定义某些事件的监听代码:

```js
window.onload = doSomething;

div.onclick = function (event) {
  console.log('触发事件');
};
```

#### 通过节点的`addEventListener()`方法定义某些事件的监听代码:

DOM 节点的事件操作（监听和触发），都定义在`EventTarget`接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

该接口主要提供三个实例方法。

- `addEventListener()`：绑定事件的监听函数
- `removeEventListener()`：移除事件的监听函数
- `dispatchEvent()`：触发事件



`EventTarget.addEventListener()`用于在当前节点或对象上（即部署了 EventTarget 接口的对象），定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

```js
target.addEventListener('type', listener[, useCapture]);
```

该方法接受三个参数。

- `'type'`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，如果设为`true`，表示监听函数将在捕获阶段（capture）触发。该参数可选，默认值为`false`（监听函数只在冒泡阶段被触发）。



下面是一个例子。

```js
function hello() {
  console.log('Hello world');
}

var button = document.getElementById('btn');
button.addEventListener('click', hello, false);
```

上面代码中，`button`节点的`addEventListener()`方法绑定`click`事件的监听函数`hello()`，该函数只在冒泡阶段触发。



`addEventListener()`方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即**先添加先触发**。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用`removeEventListener()`方法手动去除）。

```js
function hello() {
  console.log('Hello world');
}

document.addEventListener('click', hello, false);
document.addEventListener('click', hello, false);
```

执行上面代码，点击文档只会输出一行`Hello world`。



### 三种设置监听函数方法的比较

上面三种方法，第一种“HTML 的 on- 属性”，违反了 HTML 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。

第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次`onclick`属性，后一次定义会覆盖前一次。因此，也不推荐使用。

第三种`EventTarget.addEventListener`是推荐的指定监听函数的方法。它有如下优点：

- 同一个事件可以添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。
- 除了 DOM 节点，其他对象（比如`window`、`XMLHttpRequest`等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。



### 监听函数this的指向

监听函数内部的`this`指向绑定此监听函数的节点对象.

```js
<button id="btn" onclick="console.log(this.id)">点击</button>
```

执行上面代码，点击后会输出`btn`。



### 事件的传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

- **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
- **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。



事件的传播过程也被称为 DOM 事件流,关于事件流有以下几点要注意:

- 一个监听函数只能在捕获或者冒泡其中的一个阶段执行。
- 通过两种`on事件名称`方式设置的监听函数只能在冒泡阶段执行.
- 实际开发中很少使用事件捕获，我们更关注事件冒泡。
- 有些事件是没有冒泡的，比如 onblur、onfocus、onmouseenter、onmouseleave



这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

```HTML
<div>
  <p>点击</p>
</div>
```

上面代码中，`<div>`节点之中有一个`<p>`节点。

如果对这两个节点，都设置`click`事件的监听函数（每个节点的捕获阶段和冒泡阶段，各设置一个监听函数），共计设置四个监听函数。然后，对`<p>`点击，`click`事件会触发四次。

```js
var phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
};

var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', callback, true);
p.addEventListener('click', callback, true);
div.addEventListener('click', callback, false);
p.addEventListener('click', callback, false);

function callback(event) {
  var tag = event.currentTarget.tagName;
  var phase = phases[event.eventPhase];
  console.log("Tag: '" + tag + "'. EventPhase: '" + phase + "'");
}

// 点击以后的结果
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'
```

上面代码表示，`click`事件被触发了四次：`<div>`节点的捕获阶段和冒泡阶段各1次，`<p>`节点的目标阶段触发了2次。

1. 捕获阶段：事件从`<div>`向`<p>`传播时，触发`<div>`的`click`事件；
2. 目标阶段：事件从`<div>`到达`<p>`时，触发`<p>`的`click`事件；
3. 冒泡阶段：事件从`<p>`传回`<div>`时，再次触发`<div>`的`click`事件。

其中，`<p>`节点有两个监听函数（`addEventListener`方法第三个参数的不同，会导致绑定两个监听函数），因此它们都会因为`click`事件触发一次。所以，`<p>`会在`target`阶段有两次输出。

注意，浏览器总是假定`click`事件的目标节点，就是点击位置嵌套最深的那个节点（本例是`<div>`节点里面的`<p>`节点）。所以，`<p>`节点的捕获阶段和冒泡阶段，都会显示为`target`阶段。

事件传播的最上层对象是`window`，接着依次是`document`，`html`（`document.documentElement`）和`body`（`document.body`）。也就是说，上例的事件传播顺序，在捕获阶段依次为`window`、`document`、`html`、`body`、`div`、`p`，在冒泡阶段依次为`p`、`div`、`body`、`html`、`document`、`window`。



### 事件的代理(委托)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。



事件委托的原理:

用子元素触发事件,但是不给其设置事件监听函数,而是给祖先元素设置事件监听函数,事件传播到祖先元素并执行其监听函数时利用`Event.target`找到出发事件的子元素并操作这个子元素,这样可以只定义一个监听函数就可以处理多个子节点的时间,而且以后再添加子节点，监听函数依然有效.

```js
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

上面代码中，`click`事件的监听函数定义在`<ul>`节点，但是实际上，它处理的是子节点`<li>`的`click`事件。





### 事件(Event)对象

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

>要在监听函数中使用事件对象的相关属性和方法,则需要给监听函数设置一个形参,常为`event`

<img src="Web API.assets/image-20221220115006243.png" alt="image-20221220115006243" style="zoom:67%;" />

#### 事件对象的常用属性

##### Event.currentTarget，Event.target

事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。因此，任意事件都有两个与事件相关的节点，一个是事件的原始触发节点（`Event.target`），另一个是事件当前正在通过的节点（`Event.currentTarget`）。前者通常是后者的后代节点。

- `Event.target`属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。
- `Event.currentTarget`属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点,所以`Event.currentTarget`属性的值和监听函数的`this`的值是相同的。随着事件的传播，这个属性的值会变。

事件传播过程中，不同节点的监听函数内部的`Event.target`与`Event.currentTarget`属性的值是不一样的。

#### 事件对象的常用方法

##### Event.preventDefault()

`Event.preventDefault`方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的`cancelable`属性为`true`，如果为`false`，调用该方法没有任何效果。

>注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播和此节点上其它监听函数的执行。如果要阻止传播，可以使用`stopPropagation()`或`stopImmediatePropagation()`方法。

```js
// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);
```

上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框。

利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。

```js
// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input');
input.addEventListener('keypress', checkName, false);

function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}
```

上面代码为文本框的`keypress`事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。



### 阻止事件传播

事件对象还有两个常用的方法,用来阻止事件传播

####  Event.stopPropagation()

`stopPropagation`方法可以使事件到某个节点为止,阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

```js
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

上面代码中，`stopPropagation`方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。

但是，`stopPropagation`方法只会阻止事件的传播，不会阻止该事件触发`<p>`节点的其他`click`事件的监听函数。也就是说，不是彻底取消`click`事件。

```js
p.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 会触发
  console.log(2);
});
```

上面代码中，`p`元素绑定了两个`click`事件的监听函数。`stopPropagation`方法只能阻止这个事件的传播，不能取消这个事件，因此，第二个监听函数会触发。输出结果会先是1，然后是2。

如果想要彻底取消该事件，不再触发后面所有`click`的监听函数，可以使用`stopImmediatePropagation`方法。

#### Event.stopImmediatePropagation()

`Event.stopImmediatePropagation`方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是此方法处于的监听函数执行完毕后就取消事件.

如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了`Event.stopImmediatePropagation`方法，剩余的监听函数就不会再执行了。

```js
p.addEventListener('click', function (event) {
  event.stopImmediatePropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 不会被触发
  console.log(2);
});
```

上面代码中，`stopImmediatePropagation`方法可以彻底取消这个事件，使得后面绑定的所有`click`监听函数都不再触发。所以，只会输出1，不会输出2。



### 事件类型

#### 鼠标事件

##### 鼠标事件种类

鼠标事件主要有下面这些，所有事件都继承了`MouseEvent`接口。

（1）点击事件

鼠标点击相关的有四个事件。

- `click`：按下鼠标（通常是按下主按钮）时触发。
- `dblclick`：在同一个元素上双击鼠标时触发。
- `mousedown`：按下鼠标键时触发。
- `mouseup`：释放按下的鼠标键时触发。

`click`事件可以看成是两个事件组成的：用户在同一个位置先触发`mousedown`，再触发`mouseup`。因此，触发顺序是，`mousedown`首先触发，`mouseup`接着触发，`click`最后触发。

双击时，`dblclick`事件则会在`mousedown`、`mouseup`、`click`之后触发。

 (2)焦点事件(一般在表单元素上触发)

- `focus`: 获得鼠标焦点触发
- `blur`:失去鼠标焦点触发

（3）移动事件

鼠标移动相关的有五个事件。

- `mousemove`：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
- `mouseenter`：鼠标进入一个节点时触发，进入子节点不会触发这个事件。
- `mouseover`：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件。
- `mouseleave`：鼠标离开一个节点时触发，离开父节点不会触发这个事件。
- `mouseout`：鼠标离开一个节点时触发，离开父节点也会触发这个事件。

`mouseover`事件和`mouseenter`事件，都是鼠标进入一个节点时触发。两者的区别是，`mouseenter`事件只触发一次，而只要鼠标在节点内部移动，`mouseover`事件会在子节点上触发多次。[详情](https://wangdoc.com/javascript/events/mouse#:~:text=mouseover%E4%BA%8B%E4%BB%B6%E5%92%8Cmouseenter%E4%BA%8B%E4%BB%B6%EF%BC%8C%E9%83%BD%E6%98%AF%E9%BC%A0%E6%A0%87%E8%BF%9B%E5%85%A5%E4%B8%80%E4%B8%AA%E8%8A%82%E7%82%B9%E6%97%B6%E8%A7%A6%E5%8F%91%E3%80%82%E4%B8%A4%E8%80%85%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%EF%BC%8Cmouseenter%E4%BA%8B%E4%BB%B6%E5%8F%AA%E8%A7%A6%E5%8F%91%E4%B8%80%E6%AC%A1%EF%BC%8C%E8%80%8C%E5%8F%AA%E8%A6%81%E9%BC%A0%E6%A0%87%E5%9C%A8%E8%8A%82%E7%82%B9%E5%86%85%E9%83%A8%E7%A7%BB%E5%8A%A8%EF%BC%8Cmouseover%E4%BA%8B%E4%BB%B6%E4%BC%9A%E5%9C%A8%E5%AD%90%E8%8A%82%E7%82%B9%E4%B8%8A%E8%A7%A6%E5%8F%91%E5%A4%9A%E6%AC%A1%E3%80%82)

(4）其他事件

- `contextmenu`：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文”菜单键时触发。

>可以通过取消鼠标右键点击时的默认行为(弹出上下文菜单)来禁止复制
>
>```js
>document.addEventListener('contextmenu', function(e) {
>e.preventDefault();
>})
>```
>
>禁止复制升级版:禁止选中
>
>```js
>document.addEventListener('selectstart', function(e) {
>    e.preventDefault();
>   })
>
>```

- `wheel`：滚动鼠标的滚轮时触发，该事件继承的是`WheelEvent`接口。



**`MouseEvent`接口**

`MouseEvent`接口代表了鼠标相关的事件，单击（click）、双击（dblclick）、松开鼠标键（mouseup）、按下鼠标键（mousedown）等动作，所产生的事件对象都是`MouseEvent`实例。此外，滚轮事件和拖拉事件也是`MouseEvent`实例(继承了`MouseEvent.prototype`的属性和方法)。

`MouseEvent`接口继承了`Event`接口，所以拥有`Event`的所有属性和方法，并且还提供鼠标独有的属性和方法。

##### 鼠标事件常用属性

<img src="Web API.assets/image-20221220145716237.png" alt="image-20221220145716237" style="zoom:67%;" />

###### MouseEvent.pageX，MouseEvent.pageY

`MouseEvent.pageX`属性返回鼠标位置与文档左侧边缘的距离（单位像素），`MouseEvent.pageY`属性返回与文档上侧边缘的距离（单位像素）。它们的返回值都包括文档不可见的部分。这两个属性都是只读。

```js
/* HTML 代码如下
  <style>
    body {
      height: 2000px;
    }
  </style>
*/
document.body.addEventListener(
  'click',
  function (e) {
    console.log(e.pageX);
    console.log(e.pageY);
  },
  false
);
```

上面代码中，页面高度为2000像素，会产生垂直滚动条。滚动到页面底部，点击鼠标输出的`pageY`值会接近2000。

综合案例:随鼠标移动的天使

###### MouseEvent.clientX，MouseEvent.clientY

`MouseEvent.clientX`属性返回鼠标位置相对于浏览器可视窗口左上角的水平坐标（单位像素），`MouseEvent.clientY`属性返回垂直坐标。这两个属性都是只读属性。

```js
// HTML 代码为
// <body onmousedown="showCoords(event)">
function showCoords(evt){
  console.log(
    'clientX value: ' + evt.clientX + '\n' +
    'clientY value: ' + evt.clientY + '\n'
  );
}
```

这两个属性还分别有一个别名`MouseEvent.x`和`MouseEvent.y`。



#### 键盘事件

##### 键盘事件种类

键盘事件由用户击打键盘触发，主要有`keydown`、`keypress`、`keyup`三个事件，它们都继承了[KeyboardEvent 接口](https://wangdoc.com/javascript/events/keyboard#keyboardevent-接口概述)

- `keydown`：按下键盘时触发。
- `keypress`：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的功能键，这个事件不会触发。对于有值的键，按下时先触发`keydown`事件，再触发`keypress`事件。
- `keyup`：松开键盘时触发该事件,在字符录入之后触发.

>**注意**
>
>在文本框中,事件顺序为:keydown->字符录入文本框->keyup,即字符录入先于keyup事件的触发,在开发中要注意这一点,以免出现bug.

>开发中常用`keydown`和`keyup`

如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下。

1. keydown
2. keypress
3. keydown
4. keypress
5. ...（重复以上过程）
6. keyup



**`KeyboardEvent`接口**

`KeyboardEvent`接口用来描述用户与键盘的互动。这个接口继承了`Event`接口，并且定义了自己的实例属性和实例方法。

##### 键盘事件常用属性

`KeyboardEvent.key`属性返回一个字符串，表示按下的键名。该属性只读。

如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。

如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll 等。

如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下 Ctrl + a，则返回`a`；按下 Shift + a，则返回大写的`A`。

如果无法识别键名，返回字符串`Unidentified`。

综合案例: 提示框显示输入框的输入内容:[04-模拟京东快递单号查询（上）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=264&vd_source=2338fda5892f8a962e39f2e0fb4667dd)



#### 其它常用事件

##### document节点的DOMContentLoaded事件

网页下载并解析完成以后，浏览器就会在`document`对象上触发 DOMContentLoaded 事件。这时，仅仅完成了网页的解析（整张页面的 DOM 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。也就是说，这个事件比`load`事件，发生时间早得多。

**将JS代码写在DOMContentLoaded事件的监听函数中,可以将<script>标签写在文档的任意位置,而不用必须写在<body>所有元素之后**

```js
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM生成');
});
```

注意，网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发`DOMContentLoaded`事件。

```js
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM 生成');
});

// 这段代码会推迟触发 DOMContentLoaded 事件
for(var i = 0; i < 1000000000; i++) {
  // ...
}
```

## BOM

浏览器里面，`window`对象（注意，`w`为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的成员。一个变量如果未声明，那么默认就是`window`对象的属性。

```js
a = 1;
window.a // 1
```

上面代码中，`a`是一个没有声明就直接赋值的变量，它自动成为顶层`window`对象的属性。





### window对象

#### window对象的常用属性

#### window.innerHeight，window.innerWidth

`window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。

这两个属性值包括滚动条的高度和宽度, 所以:

window.innerWidth = document.documentElement.clientWidth + 纵向滚动条的宽度(edge为17px)

window.innerHeight = document.documentElement.clientWidth + 横向滚动条的高度(edge为17px)

>用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因此可见部分（视口）就变小了。





#### window对象的常用事件

#### resize事件

window对象的`resize`事件在网页在当前窗口中可见部分的高度或宽度发生改变时触发.

综合案例:网页'视口'宽度小于一定值时隐藏元素:



### Location对象

`window.location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。

#### 常用属性

- `Location.href`：整个 URL。
- `Location.protocol`：当前 URL 的协议，包括冒号（`:`）。
- `Location.host`：主机和端口号。如果端口是协议默认的`80`和`433`，则省略.
- `Location.pathname`：URL 的路径部分，从根路径`/`开始。
- `Location.search`：参数字符串部分，从问号`?`开始。
- `Location.hash`：片段字符串部分，从`#`开始,常见于链接锚点。

```js
// 当前网址为
// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
```

**注意，如果对`Location.href`写入新的 URL 地址，浏览器会立刻跳转到这个新地址。**

```js
// 跳转到新网址
document.location.href = 'http://www.example.com';
```

这个特性常常用于让网页自动滚动到新的锚点或者网页的自动跳转。

直接改写`location`，相当于写入`href`属性。

```js
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';
```

另外，`Location.href`属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的`Location.href`属性，导致后者的网址跳转。`Location`的其他属性都不允许跨域写入。

综合案例:网页的自动跳转:[23-5秒钟之后跳转页面_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=282)



#### 常用方法

##### Location.assign()

`assign`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

```js
// 跳转到新的网址
document.location.assign('http://www.example.com')
```

##### Location.replace()

`replace`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

它与`assign`方法的差异在于，`replace`会在浏览器的浏览历史`History`里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 URL 替换了老的 URL。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。

```js
// 跳转到新的网址
document.location.replace('http://www.example.com')
```

##### Location.reload()

`reload`方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。

它接受一个布尔值作为参数。如果参数为`true`，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即`scrollTop === 0`）。如果参数是`false`或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。

```js
// 向服务器重新请求当前网址
window.location.reload(true);
```

## 异步操作

### 定时器

#### 间隔定时器setTimeout()

`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

```js
var timerId = setTimeout(func|code, delay);
```

上面代码中，`setTimeout`函数接受两个参数，第一个参数`func|code`是将要推迟执行的函数名或者一段代码，第二个参数`delay`是推迟执行的毫秒数。

```js
console.log(1);
setTimeout('console.log(2)',1000);
console.log(3);
// 1
// 3
// 2
```

上面代码会先输出1和3，然后等待1000毫秒再输出2。

>注意，如果推迟的是某段代码,则必须以字符串的形式，作为`setTimeout`的参数。
>
>如果推迟执行的是函数，就直接将函数名，作为`setTimeout`的参数。

```js
function f() {
  console.log(2);
}

setTimeout(f, 1000);
```

`setTimeout`的第二个参数如果省略，则默认为0。

```js
setTimeout(f)
// 等同于
setTimeout(f, 0)
```

除了前两个参数，`setTimeout`还允许更多的参数。它们将依次传入推迟执行的函数（回调函数）。

```js
setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
```

上面代码中，`setTimeout`共有4个参数。最后那两个参数，将在1000毫秒之后回调函数执行时，作为回调函数的参数。



#### 定时器中回调函数的this指向

还有一个需要注意的地方，如果回调函数是对象的方法，那么`setTimeout`使得方法内部的`this`关键字指向全局环境(因为定时器中的回调函数的调用是由window对象调用的)，而不是定义时所在的那个对象。

```js
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y, 1000) // 1
```

上面代码输出的是1，而不是2。因为当`obj.y`在1000毫秒后运行时，`this`所指向的已经不是`obj`了，而是全局环境。

为了防止出现这个问题，一种解决方法是将`obj.y`放在匿名函数中执行.

```js
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(function () {
  obj.y();
}, 1000);
// 2
```

上面代码中，`obj.y`放在一个匿名函数之中，这使得`obj.y`在`obj`的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值。

另一种解决方法是，使用`bind`方法，将`obj.y`这个方法绑定在`obj`上面。

```js
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y.bind(obj), 1000)
// 2
```

#### 循环定时器setInterval()

`setInterval`函数的用法与`setTimeout`完全一致，区别仅仅在于`setInterval`指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

```js
var i = 1
var timer = setInterval(function() {
  console.log(2);
}, 1000)
```

上面代码中，每隔1000毫秒就输出一个2，会无限运行下去，直到关闭当前窗口。

与`setTimeout`一样，除了前两个参数，`setInterval`方法还可以接受更多的参数，它们会传入回调函数。

下面是一个通过`setInterval`方法实现网页动画的例子。

```js
var div = document.getElementById('someDiv');
var opacity = 1;
var fader = setInterval(function() {
  opacity -= 0.1;
  if (opacity >= 0) {
    div.style.opacity = opacity;
  } else {
    clearInterval(fader);
  }
}, 100);
```

上面代码每隔100毫秒，设置一次`div`元素的透明度，直至其完全透明为止。

`setInterval`的一个常见用途是实现轮询。下面是一个轮询 URL 的 Hash 值是否发生变化的例子。

```js
var hash = window.location.hash;
var hashWatcher = setInterval(function() {
  if (window.location.hash != hash) {
    updatePage();
  }
}, 1000);
```

`setInterval`指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，`setInterval`指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。

为了确保两次执行之间有固定的间隔，可以不用`setInterval`，而是每次执行结束后，使用`setTimeout`指定下一次执行的具体时间。

```js
var i = 1;
var timer = setTimeout(function f() {
  // ...
  timer = setTimeout(f, 2000);
}, 2000);
```

上面代码可以确保，下一次执行总是在本次执行结束之后的2000毫秒开始。



综合案例:网页上的倒计时:[15-倒计时效果_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=274&vd_source=2338fda5892f8a962e39f2e0fb4667dd)

#### 清除定时器clearTimeout()，clearInterval()

`setTimeout`和`setInterval`函数，都返回一个整数值，表示计数器编号。将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。

```js
var id1 = setTimeout(f, 1000);
var id2 = setInterval(f, 1000);

clearTimeout(id1);
clearInterval(id2);
```

上面代码中，回调函数`f`不会再执行了，因为两个定时器都被取消了。

`setTimeout`和`setInterval`返回的整数值是连续的，也就是说，第二个`setTimeout`方法返回的整数值，将比第一个的整数值大1。

```js
function f() {}
setTimeout(f, 1000) // 10
setTimeout(f, 1000) // 11
setTimeout(f, 1000) // 12
```

上面代码中，连续调用三次`setTimeout`，返回值都比上一次大了1。

利用这一点，可以写一个函数，取消当前所有的`setTimeout`定时器。

```js
(function() {
  // 每轮事件循环检查一次
  var gid = setInterval(clearAllTimeouts, 0);

  function clearAllTimeouts() {
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();
```

上面代码中，先调用`setTimeout`，得到一个计算器编号，然后把编号比它小的计数器全部取消。

综合案例: 发送短信需要间隔一定时间:[17-发送短信案例_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=276&vd_source=2338fda5892f8a962e39f2e0fb4667dd)



## 网页特效

元素对象的一些属性和方法对于实现网页特效有很大帮助

### 元素大小

#### offsetWidth、offsetHeight

`Element.offsetWidth/offsetHeight`属性返回一个**整数值**(如果是小数会被四舍五入)，表示元素的 CSS 宽/高度（单位像素），**大小等于"元素内容区宽/高度 + 内边距宽/高度 + 边框宽度"**(无论是否有滚动条）,即元素外边距以内区域的宽/高度.

这两个属性都是只读属性，只比`Element.clientHeight`和`Element.clientWidth`多了边框的高度或宽度。

如果元素的 CSS 设为不可见（比如`display: none;`），则返回`0`。

>在JS中获取一个元素的大小用这两个属性,其它宽高属性不常用.

#### clientWidth、clientHeight

`Element.clientWidth/clientHeight`属性返回一个**整数值**，表示元素的 CSS 宽/高度（单位像素），**大小等于"元素内容区宽/高度 + 内边距宽/高度 - 滚动条宽/高度"**(无滚动条视为滚动条宽/高度为0)

只对块级元素生效，对于行内元素返回`0`。如果块级元素没有设置 CSS 高度，则返回实际高度。

>clientWidth/clientHeight常用来获取网页在浏览器中窗口中的可视区域的大小(不包括滚动条):
>
><HTML>元素的clientWidth/clientHeight即为网页在浏览器中窗口中的可视区域的大小(不包括滚动条):
>
>`document.documentElement.clientWidth/clientHeight`

#### scrollWidth、scrollHeight

`Element.scrollWidth/scrollHeight`属性返回一个**整数值**，表示当前元素的总宽/高度（单位像素），包括溢出容器、当前不可见的部分。它包括`padding`，但是不包括`border`、`margin`以及滚动条的宽/高度（如果有滚动条的话），还包括伪元素（`::before`或`::after`）的宽高度。

>scrollWidth/scrollHeight常用来获取网页总宽/高:
>
>```js
>// 返回网页的总高度
>document.documentElement.scrollHeight
>document.body.scrollHeight
>```



### 元素偏移量

#### Element.offsetParent

`Element.offsetParent`属性返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。

```js
<div style="position: absolute;">
  <p>
    <span>Hello</span>
  </p>
</div>
```

上面代码中，`span`元素的`offsetParent`属性就是`div`元素。

该属性主要用于确定子元素位置偏移的计算基准.

如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。

```js
<div style="position: absolute;">
  <p>
    <span style="display: none;">Hello</span>
  </p>
</div>
```

上面代码中，`span`元素的`offsetParent`属性是`null`。

如果某个元素的所有上层节点的`position`属性都是`static`，则`Element.offsetParent`属性指向`<body>`元素。

#### Element.offsetLeft，Element.offsetTop

`Element.offsetLeft`返回当前元素左上角相对于`Element.offsetParent`节点的水平位移，`Element.offsetTop`返回垂直位移，都是数值,无单位。通常，这两个值是指相对于父节点的位移。

下面的代码可以算出元素左上角相对于整张网页的坐标。

```js
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}
```

<img src="Web API.assets/image-20221223210022938.png" alt="image-20221223210022938" style="zoom: 67%;" />





### 常见网页特效案例

#### 缓动动画函数

```js
//参数说明: obj为要设置缓动动画的元素,target是动画停止的位置,callback是动画完成后调用的函数,在定时器完成后调用
      function animate(obj, target, callback) {
        //清除以前的定时器,防止创建多个定时器
        clearInterval(obj.timer);
        //通过obj.timer给不同的元素指定不同的定时器
        obj.timer = setInterval(() => {
          //停止动画本质是停止定时器
          if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //如果传入了回调函数,则定时器结束后调用
            callback && callback() //短路运算
          }
          //缓动原理: 每单位时间移动距离逐渐减小
          //移动距离要向上/下取整,不然无法准确达到目标位置,导致定时器无法停止
          let step = (target - obj.offsetLeft) / 10;
          //向右移动时step为正值,向上取整,向右移动时step为负值,向下取整
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          //offsetLeft只读,修改元素的left值要使用style.left,值为字符串类型,要拼接"px"
          obj.style.left = obj.offsetLeft + step + "px";
          //定时器的执行间隔一般设置为15ms
        }, 15);
      }
```

[视频讲解]([23-动画原理_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=309&vd_source=2338fda5892f8a962e39f2e0fb4667dd))

可以将缓动动画函数直接放在一个单独的js文件中,使用时需要先将此文件引入.

# 浏览器环境概述

JavaScript 是浏览器的内置脚本语言。也就是说，浏览器内置了 JavaScript 引擎，并且提供各种接口，让 JavaScript 脚本可以控制浏览器的各种功能。一旦网页内嵌了 JavaScript 脚本，浏览器加载网页，就会去执行脚本，从而达到操作浏览器的目的，实现网页的各种动态效果。

本章开始介绍浏览器提供的各种 JavaScript 接口。首先，介绍 JavaScript 代码嵌入网页的方法。

## 代码嵌入网页的方法

网页中嵌入 JavaScript 代码，主要有四种方法。

- `<script>`元素直接嵌入代码。
- `<script>`标签加载外部脚本
- 事件属性
- URL 协议

### script 元素嵌入代码

`<script>`元素内部可以直接写入 JavaScript 代码。

```html
<script>
  var x = 1 + 5;
  console.log(x);
</script>
```

`<script>`标签有一个`type`属性，用来指定脚本类型。对 JavaScript 脚本来说，`type`属性可以设为两种值。

- `text/javascript`：这是默认值，也是历史上一贯设定的值。如果你省略`type`属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
- `application/javascript`：对于较新的浏览器，建议设为这个值。

```html
<script type="application/javascript">
  console.log('Hello World');
</script>
```

由于`<script>`标签默认就是 JavaScript 代码。所以，嵌入 JavaScript 脚本时，`type`属性可以省略。

如果`type`属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在`<script>`标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的`type`属性即可。

```html
<script id="mydata" type="x-custom-data">
  console.log('Hello World');
</script>
```

上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的`type`属性。但是，这个`<script>`节点依然存在于 DOM 之中，可以使用`<script>`节点的`text`属性读出它的内容。

```javascript
document.getElementById('mydata').text
//   console.log('Hello World');
```

### script 元素加载外部脚本

`<script>`标签也可以指定加载外部的脚本文件。

```html
<script src="https://www.example.com/script.js"></script>
```

如果脚本文件使用了非英语字符，还应该注明字符的编码。

```html
<script charset="utf-8" src="https://www.example.com/script.js"></script>
```

所加载的脚本必须是纯的 JavaScript 代码，不能有`HTML`代码和`<script>`标签。

加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的`console.log`语句直接被忽略。

```html
<script charset="utf-8" src="example.js">
  console.log('Hello World!');
</script>
```

为了防止攻击者篡改外部脚本，`script`标签允许设置一个`integrity`属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。

```html
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```

上面代码中，`script`标签有一个`integrity`属性，指定了外部脚本`/assets/application.js`的 SHA256 签名。一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。

### 事件属性

网页元素的事件属性（比如`onclick`和`onmouseover`），可以写入 JavaScript 代码。当指定事件发生时，就会调用这些代码。

```html
<button id="myBtn" onclick="console.log(this.id)">点击</button>
```

上面的事件属性代码只有一个语句。如果有多个语句，使用分号分隔即可。

### URL 协议

URL 支持`javascript:`协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。

```html
<a href="javascript:console.log('Hello')">点击</a>
```

浏览器的地址栏也可以执行`javascript:`协议。将`javascript:console.log('Hello')`放入地址栏，按回车键也会执行这段代码。

如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

```html
<a href="javascript: new Date().toLocaleTimeString();">点击</a>
```

上面代码中，用户点击链接以后，会打开一个新文档，里面有当前时间。

如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。

```javascript
<a href="javascript: console.log(new Date().toLocaleTimeString())">点击</a>
```

上面代码中，用户点击链接后，网页不会跳转，只会在控制台显示当前时间。

`javascript:`协议的常见用途是书签脚本 Bookmarklet。由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上`void`，或者在脚本最后加上`void 0`。

```html
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```

上面这两种写法，点击链接后，执行代码都不会网页跳转。

## script 元素

### 工作原理

浏览器加载 JavaScript 脚本，主要通过`<script>`元素完成。正常的网页加载流程是这样的。

1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2. 解析过程中，浏览器发现`<script>`元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3. 如果`<script>`元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将`<script>`标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。

脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。

```html
<head>
  <script>
    console.log(document.body.innerHTML);
  </script>
</head>
<body>
</body>
```

上面代码执行时会报错，因为此时`document.body`元素还未生成。

一种解决方法是设定`DOMContentLoaded`事件的回调函数。

```html
<head>
  <script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
</head>
```

上面代码中，指定`DOMContentLoaded`事件发生后，才开始执行相关代码。`DOMContentLoaded`事件只有在 DOM 结构生成之后才会触发。

另一种解决方法是，使用`<script>`标签的`onload`属性。当`<script>`标签指定的外部脚本文件下载和解析完成，会触发一个`load`事件，可以把所需执行的代码，放在这个事件的回调函数里面。

```html
<script src="jquery.min.js" onload="console.log(document.body.innerHTML)">
</script>
```

但是，如果将脚本放在页面底部，就可以完全按照正常的方式写，上面两种方式都不需要。

```html
<body>
  <!-- 其他代码  -->
  <script>
    console.log(document.body.innerHTML);
  </script>
</body>
```

如果有多个`script`标签，比如下面这样。

```html
<script src="a.js"></script>
<script src="b.js"></script>
```

浏览器会同时并行下载`a.js`和`b.js`，但是，执行时会保证先执行`a.js`，然后再执行`b.js`，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。

解析和执行 CSS，也会产生阻塞。Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。

此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般有限制，同时最多下载6～20个资源，即最多同时打开的 TCP 连接有限制，这是为了防止对服务器造成太大压力。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

### defer 属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对`<script>`元素加入`defer`属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。

```html
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

上面代码中，只有等到 DOM 加载完成后，才会执行`a.js`和`b.js`。

`defer`属性的运行流程如下。

1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有`defer`属性的`<script>`元素。
3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`元素加载的外部脚本。
4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。

有了`defer`属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的`script`标签，以及动态生成的`script`标签，`defer`属性不起作用。另外，使用`defer`加载的外部脚本不应该使用`document.write`方法。

### async 属性

解决“阻塞效应”的另一个方法是对`<script>`元素加入`async`属性。

```html
<script src="a.js" async></script>
<script src="b.js" async></script>
```

`async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有`async`属性的`script`标签。
3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`标签中的外部脚本。
4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
5. 脚本执行完毕，浏览器恢复解析 HTML 网页。

`async`属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。另外，使用`async`属性的脚本文件里面的代码，不应该使用`document.write`方法。

`defer`属性和`async`属性到底应该使用哪一个？

一般来说，如果脚本之间没有依赖关系，就使用`async`属性，如果脚本之间有依赖关系，就使用`defer`属性。如果同时使用`async`和`defer`属性，后者不起作用，浏览器行为由`async`属性决定。

### 脚本的动态加载

`<script>`元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。

```javascript
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```

这种方法的好处是，动态生成的`script`标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

如果想避免这个问题，可以设置async属性为`false`。

```javascript
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
```

上面的代码不会阻塞页面渲染，而且可以保证`b.js`在`a.js`后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待`b.js`执行完成后再执行。

如果想为动态加载的脚本指定回调函数，可以使用下面的写法。

```javascript
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
```

### 加载使用的协议

如果不指定协议，浏览器默认采用 HTTP 协议下载。

```html
<script src="example.js"></script>
```

上面的`example.js`默认就是采用 HTTP 协议下载，如果要采用 HTTPS 协议下载，必需写明。

```html
<script src="https://example.js"></script>
```

但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。

```html
<script src="//example.js"></script>
```

## 浏览器的组成

浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

### 渲染引擎

渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。

不同的浏览器有不同的渲染引擎。

- Firefox：Gecko 引擎
- Safari：WebKit 引擎
- Chrome：Blink 引擎
- IE: Trident 引擎
- Edge: EdgeHTML 引擎

渲染引擎处理网页，通常分成四个阶段。

1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
3. 布局：计算出渲染树的布局（layout）。
4. 绘制：将渲染树绘制到屏幕。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

### 重流和重绘

渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。

页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。用户的互动也会触发重流和重绘，比如设置了鼠标悬停（`a:hover`）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。

重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。

大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。

作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。

```javascript
var foo = document.getElementById('foobar');

foo.style.color = 'blue';
foo.style.marginTop = '30px';
```

上面的代码只会导致一次重绘，因为浏览器会累积 DOM 变动，然后一次性执行。

下面是一些优化技巧。

- 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
- 缓存 DOM 信息。
- 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
- 使用`documentFragment`操作 DOM
- 动画使用`absolute`定位或`fixed`定位，这样可以减少对其他元素的影响。
- 只在必要时才显示隐藏元素。
- 使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
- 使用虚拟 DOM（virtual DOM）库。

下面是一个`window.requestAnimationFrame()`对比效果的例子。

```javascript
// 重流代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = (currentHeight * 2) + 'px';
}

all_my_elements.forEach(doubleHeight);

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function () {
    element.style.height = (currentHeight * 2) + 'px';
  });
}

all_my_elements.forEach(doubleHeight);
```

上面的第一段代码，每读一次 DOM，就写入新的值，会造成不停的重排和重流。第二段代码把所有的写操作，都累积在一起，从而 DOM 代码变动的代价就最小化了。

### JavaScript 引擎

JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。

JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。

为了提高运行速度，目前的浏览器都将 JavaScript 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。

早期，浏览器内部对 JavaScript 的处理过程如下：

1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。

字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。并非所有的 JavaScript 虚拟机运行时都有字节码，有的 JavaScript 虚拟机基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些 JavaScript 虚拟机：

- [Chakra](https://en.wikipedia.org/wiki/Chakra_(JScript_engine)) (Microsoft Internet Explorer)
- [Nitro/JavaScript Core](http://en.wikipedia.org/wiki/WebKit#JavaScriptCore) (Safari)
- [Carakan](http://dev.opera.com/articles/view/labs-carakan/) (Opera)
- [SpiderMonkey](https://developer.mozilla.org/en-US/docs/SpiderMonkey) (Firefox)
- [V8](https://en.wikipedia.org/wiki/Chrome_V8) (Chrome, Chromium)

## 参考链接

- John Dalziel, [The race for speed part 2: How JavaScript compilers work](http://creativejs.com/2013/06/the-race-for-speed-part-2-how-javascript-compilers-work/)
- Jake Archibald, [Deep dive into the murky waters of script loading](http://www.html5rocks.com/en/tutorials/speed/script-loading/)
- Mozilla Developer Network, [window.setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/window.setTimeout)
- Remy Sharp, [Throttling function calls](http://remysharp.com/2010/07/21/throttling-function-calls/)
- Ayman Farhat, [An alternative to JavaScript's evil setInterval](http://www.thecodeship.com/web-development/alternative-to-javascript-evil-setinterval/)
- Ilya Grigorik, [Script-injected "async scripts" considered harmful](https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/)
- Axel Rauschmayer, [ECMAScript 6 promises (1/2): foundations](http://www.2ality.com/2014/09/es6-promises-foundations.html)
- Daniel Imms, [async vs defer attributes](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
- Craig Buckler, [Load Non-blocking JavaScript with HTML5 Async and Defer](http://www.sitepoint.com/non-blocking-async-defer/)
- Domenico De Felice, [How browsers work](https://domenicodefelice.blogspot.com/2015/08/how-browsers-work.html)
