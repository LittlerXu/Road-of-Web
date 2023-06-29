## 运算符扩展

### 指数运算符

ES2016 新增了一个指数运算符（`**`）。

```js
2 ** 2 // 4
2 ** 3 // 8
```

这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。

```js
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

上面代码中，首先计算的是第二个指数运算符，而不是第一个。

指数运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```js
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

### 链判断运算符和Null判断运算符

[详情](https://wangdoc.com/es6/operator#%E9%93%BE%E5%88%A4%E6%96%AD%E8%BF%90%E7%AE%97%E7%AC%A6)

编程实务中，经常会判断一个对象的属性是否存在(值是`null`或`undefined`), 若不存在则指定默认值, 通常的错误写法是:

```js
// 错误的写法
const  firstName = message.body.user.firstName || 'default';
```

这样的写法是错误的,

||左边: 只能用于判断最底层属性(`firstName`)是否存在,任一个底层属性的上层属性不存在都会报错;

||右边: 属性的值如果为空字符串或`false`或`0`，默认值也会生效。

**链判断运算符`?.`可以解决第一个问题:**

```js
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
```

上面代码使用了`?.`运算符，直接在链式调用的时候判断，左侧的对象是否为`null`或`undefined`。如果是的，就不再往下运算，而是返回`undefined`。

**Null判断运算符`??`可以解决第二个问题:**

只有Null判断运算符左侧的值为`null`或`undefined`时，才会返回右侧的值。

```js
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
```

上面代码中，默认值只有在左侧属性值为`null`或`undefined`时，才会生效。

**两个运算符配合使用**

这两个运算符配合使用就可以为值为`null`或`undefined`的属性设置默认值。

```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

上面代码中，如果`response.settings`是`null`或`undefined`，或者`response.settings.animationDuration`是`null`或`undefined`，就会返回默认值300。也就是说，这一行代码包括了两级属性的判断。

**判断函数参数是否赋值**

`??`运算符很适合判断函数参数是否赋值。

```js
function Component(props) {
  const enable = props.enabled ?? true;
  // …
}
```



### 逻辑赋值运算符

ES2021 引入了三个新的[逻辑赋值运算符](https://github.com/tc39/proposal-logical-assignment)（logical assignment operators），将逻辑运算符与赋值运算符进行结合。

```
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```

这三个运算符`||=`、`&&=`、`??=`相当于先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。

它们的一个用途是，为变量或属性设置默认值。

```
// 老的写法
user.id = user.id || 1;

// 新的写法
user.id ||= 1;
```

上面示例中，`user.id`属性如果不存在，则设为`1`，新的写法比老的写法更紧凑一些。

下面是另一个例子。

```
function example(opts) {
  opts.foo = opts.foo ?? 'bar';
  opts.baz ?? (opts.baz = 'qux');
}
```

上面示例中，参数对象`opts`如果不存在属性`foo`和属性`baz`，则为这两个属性设置默认值。有了“Null 赋值运算符”以后，就可以统一写成下面这样。

```
function example(opts) {
  opts.foo ??= 'bar';
  opts.baz ??= 'qux';
}
```

### `#!`命令

Unix 的命令行脚本都支持`#!`命令，又称为 Shebang 或 Hashbang。这个命令放在脚本的第一行，用来指定脚本的执行器。

比如 Bash 脚本的第一行。

```
#!/bin/sh
```

Python 脚本的第一行。

```
#!/usr/bin/env python
```

[ES2023](https://github.com/tc39/proposal-hashbang) 为 JavaScript 脚本引入了`#!`命令，写在脚本文件或者模块文件的第一行。

```
// 写在脚本文件第一行
#!/usr/bin/env node
'use strict';
console.log(1);

// 写在模块文件第一行
#!/usr/bin/env node
export {};
console.log(1);
```

有了这一行以后，Unix 命令行就可以直接执行脚本。

```
# 以前执行脚本的方式
$ node hello.js

# hashbang 的方式
$ ./hello.js
```

对于 JavaScript 引擎来说，会把`#!`理解成注释，忽略掉这一行。

## 数组扩展





## lterator和for...of循环

### 定义

lterator是一种接口,为各种不同的数据结构提供统一的访问机制,即`for...of`循环。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

原生具备 Iterator 接口的数据结构如下,这些数据结构不用任何处理，就可以被`for...of`循环遍历.

- Array
- Map
- Set
- TypedArray
- 内置的类数组对象
  - Array字符串
  - DOM方法返回的类数组对象
  - 函数的 arguments 对象

>注意
>对象默认没有部署lterator接口.

### 自动调用lterator接口的场合

有一些场合会默认调用 Iterator 接口:

#### （1）解构赋值

对数组和 Set 结构进行解构赋值时，会默认调用Iterator 接口。

```js
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

#### （2）扩展运算符

扩展运算符（...）也会调用默认的 Iterator 接口。

```js
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

上面代码的扩展运算符内部就调用 Iterator 接口。

**将类数组对象转化为数组**

实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组, 常用于将有Iterator接口的类数组对象转化为数组

```js
let arr = [...iterable];
```

但并不是所有类数组对象都具有 Iterator 接口，一般内置的类数组对象都有Iterator接口, 而自定义的类数组对象是没有的.

无论有没有Iterator接口，只要是类数组对象,都可以使用`Array.from`方法将其转为数组。

```js
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}
```

#### （3）yield\*

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

#### （4）其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()

### for...of循环

一个数据结构只要部署了literator接口,就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的literator接口.

#### 数组

`for...of`与其它数组遍历方法的比较

遍历数组最常用的是`forEach()`,但是它有一个缺点是无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效。

而`for...of`可以与`break`、`continue`和`return`配合使用, 并且比`for`循环语法简洁.

`for...of`的缺点是只能遍历键值,无法遍历索引, 想要在遍历的时候使用索引,可以使用`Array.index([数组元素值])`方法来获取元素对应的索引.

遍历方法选取原则: 在不需要用到`break`、`continue`和`return`命令的情况下`forEach()`是最好的选择,当需要用到时选择`for...of`.

```js
var arr = ['a', 'b', 'c', 'd'];

for (let a of arr) {
  console.log(a); // a b c d
}
```

#### Set和Map结构

Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用`for...of`循环。

```js
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个:

首先，遍历的顺序是按照各个成员被添加进数据结构的顺序;

其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

```js
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
```

#### 类似数组的对象

类似数组的对象包括好几类。下面是`for...of`循环用于字符串、DOM NodeList 对象、`arguments`对象的例子。

```js
// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'
```

## Module模块化

ES6 模块不是对象，而是一个个独立的文件,该文件内部的所有变量，外部无法获取, 需要通过`export`命令规定模块的对外接口，通过`import`命令输入其他模块提供的功能。

### export

可以暴露的接口种类:

- 函数（Functions）

- 类（Classes）

- var、let、const 声明的变量（Variables）。

分类:分别暴露、统一暴露、默认暴露

#### 分别暴露

在定义时暴露:

```js
//暴露变量
export var firstName = 'Michael';
//暴露函数
export function f() {};
//暴露类
export class Point {};
```

>**注意**
>
>分别暴露只能在"变量"定义时暴露, 不能在定义之后暴露, 因为定义之后"变量"就只是一个值,而不是接口,下面的写法是错误的:
>
>```js
>// 报错
>var m = 1;
>export m;
>
>// 报错
>function f() {}
>export f;
>
>// 报错
>Class Point {};
>export Point;
>```



#### 统一暴露

将要暴露的"变量"作为一个对象的成员,然后暴露这个对象

```js
var firstName = 'Michael';
function f() {};
class Point {};

//统一暴露
export {firstName,f,Point}
```

**as关键字**

统一暴露可以利用as关键字重命名其中的"变量"

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

上面代码使用`as`关键字，重命名了函数`v1`和`v2`的对外接口。重命名后，`v2`可以用不同的名字输出两次。

在引入时,既可以使用"变量"原本的名称,也可以使用重命名后的名称.

**统一暴露和分别暴露本质上是一样的**

#### 注意点

##### 动态绑定

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量`foo`，值为`bar`，500 毫秒之后变成`baz`。

这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新

##### 必须处于模块顶层

`import`和`export`命令只能在模块的顶层，不能在代码块之中（比如，在`if`代码块之中，或在函数之中）,如果处于块级作用域内，就会报错，import`命令也是如此。

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

### import

#### 基本使用

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

上面代码的`import`命令，用于加载`profile.js`文件，并从中输入变量。`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。

**as关键字**

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```js
import { lastName as surname } from './profile.js';
```

**模块路径**

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```js
import { myMethod } from 'util';
```

上面代码中，`util`是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。

###### 模块整体引入

可以直接引入整个模块,相当于将模块(文件)里的内容全部引入, 此时模块内不用暴露任何接口.

```js
import 'lodash';
```

上面代码仅仅执行`lodash`模块，但是不输入任何值。

css文件、json文件和图片文件的全局引入就可以利用这种方法:

```js
//main.js
import 'swiper/css/swiper.css'
```

也可以将内容很多的文件做拆分,然后将拆分出去的模块整体引入到总文件中.

**Singleton 模式**

如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

```js
import 'lodash';
import 'lodash';
```

上面代码加载了两次`lodash`，但是只会执行一次。

```js
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

上面代码中，虽然`foo`和`bar`在两个语句中加载，但是它们对应的是同一个`my_module`模块。也就是说，`import`语句是 Singleton 模式。

#### 统一引入

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

下面是一个`circle.js`文件，它输出两个方法`area`和`circumference`。

```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

现在，加载这个模块。

```js
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下。

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象（上例是`circle`），应该是可以静态分析的，所以**不允许运行时改变**。下面的写法都是不允许的。

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

#### 注意点

##### 接口只读

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

上面代码中，脚本加载了变量`a`，对其重新赋值就会报错，因为`a`是一个只读的接口。但是，如果`a`是一个对象，改写`a`的属性是允许的。

```js
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中，`a`的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。



##### `import`命令有提升效果

`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为`import`的执行早于`foo`的调用。这种行为的本质是，`import`命令是编译阶段执行的，在代码运行之前。

##### import静态执行

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

上面三种写法都会报错，因为它们用到了表达式、变量和`if`结构。在静态分析阶段，这些语法都是没法得到值的。



### export default

`export default`命令用于为模块指定默认输出。

```js
// export-default.js
export default {}

export default function () {
  console.log('foo');
}

export default class Point { ... }
//等价于
export default class { ... }
```

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的`import`命令，可以用任意名称指向`export-default.js`输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时`import`命令后面，不使用大括号。

**默认输出是唯一的**

一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

**默认暴露的本质**

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是等效的。

```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

**不能在定义普通"变量"时默认暴露**

正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟普通变量声明语句。

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

但对于函数和类来说, 既可以接匿名的,也可以接完整的声明语句,但此时的函数名和类名在模块外部是无效的,视为匿名函数和匿名类加载.

```js
export default function foo() {
  console.log('foo');
}
//等价于:
export default function () {
  console.log('foo');
}

export default class { ... }
```





**可以直接暴露一个字面量**

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。

```js
// 正确
export default 42;

// 报错
export 42;
```

**默认暴露和普通暴露一起使用**

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, { each, forEach } from 'lodash';
```

对应上面代码的`export`语句如下。

```js
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

上面代码的最后一行的意思是，暴露出`forEach`接口，默认指向`each`接口，即`forEach`和`each`指向同一个方法。



### 动态加载模块

#### 简介

`import`命令会被 JavaScript 引擎静态分析，只能位于模块的顶层, 而不能位于块级作用域中。这样的设计，固然有利于编译器提高效率，但也导致无法实模块的动态加载和条件加载.

[ES2020提案](https://github.com/tc39/proposal-dynamic-import) 引入`import()`函数，支持动态加载模块。

```js
import(specifier)
```

上面代码中，`import`函数的参数`specifier`，指定所要加载的模块的位置。`import`命令能够接受什么参数，`import()`函数就能接受什么参数.

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。

>import和import()的区别:
>
>import()为动态加载,与所加载的模块没有静态连接关系.它是运行时执行,什么时候运行到这一句，就会加载指定的模块.
>
>import()与require()的区别:
>
>import()是异步加载,require()是同步加载

`import()`返回一个 Promise 对象, 这个模块会作为一个对象，当作`then`方法的参数

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

所以需要使用`then()`方法指定处理函数。考虑到代码的清晰，使用`await`命令是更好的选择.

```js
async function renderWidget() {
  const container = document.getElementById('widget');
  if (container !== null) {
    // 等同于
    // import("./widget").then(widget => {
    //   widget.render(container);
    // });
    const widget = await import('./widget.js');
    widget.render(container);
  }
}

renderWidget();
```

#### 适用场合

下面是`import()`的一些适用场合。

（1）按需加载。

`import()`可以在需要的时候，再加载某个模块。

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

上面代码中，`import()`方法放在`click`事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

（2）条件加载

`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。

（3）动态的模块路径

`import()`允许模块路径动态生成。

```js
import(f())
.then(...);
```

上面代码中，根据函数`f`的返回结果，加载不同的模块。

#### 注意点

`import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```

上面代码中，`export1`和`export2`都是`myModule.js`的输出接口，可以解构获得。

如果模块有`default`输出接口，可以用参数直接获得。

```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```

上面的代码也可以使用具名输入的形式。

```js
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```

如果想同时加载多个模块，可以采用下面的写法。

```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()`也可以用在 async 函数之中。

```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```

#### import.meta

开发者使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。[ES2020](https://github.com/tc39/proposal-import-meta) 为 import 命令添加了一个元属性`import.meta`，返回当前模块的元信息。

`import.meta`只能在模块内部使用，如果在模块外部使用会报错。

这个属性返回一个对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。一般来说，`import.meta`至少会有下面两个属性。

**（1）import.meta.url**

`import.meta.url`返回当前模块的 URL 路径。举例来说，当前模块主文件的路径是`https://foo.com/main.js`，`import.meta.url`就返回这个路径。如果模块里面还有一个数据文件`data.txt`，那么就可以用下面的代码，获取这个数据文件的路径。

```js
new URL('data.txt', import.meta.url)
```

注意，Node.js 环境中，`import.meta.url`返回的总是本地路径，即`file:URL`协议的字符串，比如`file:///home/user/foo.js`。

**（2）import.meta.scriptElement**

`import.meta.scriptElement`是浏览器特有的元属性，返回加载模块的那个`<script>`元素，相当于`document.currentScript`属性。

```js
// HTML 代码为
// <script type="module" src="my-module.js" data-foo="abc"></script>

// my-module.js 内部执行下面的代码
import.meta.scriptElement.dataset.foo
// "abc"
```



### 转发接口

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

两种写法的区别是: 两个语句合写时,`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

模块的接口改名和整体输出，也可以采用这种写法。

>注意:
>
>整体输出`export *`命令会忽略模块的`default`方法

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

默认接口的写法如下。

```js
export { default } from 'foo';
```

具名接口改为默认接口的写法如下。

```js
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

同样地，默认接口也可以改名为具名接口。

```js
export { default as es6 } from './someModule';
```

ES2020 之前，有一种`import`语句，没有对应的复合写法。

```js
import * as someIdentifier from "someModule";
```

[ES2020](https://github.com/tc39/proposal-export-ns-from)补上了这个写法。

```js
export * as ns from "mod";

// 等同于
import * as ns from "mod";
export {ns};
```

### 模块继承

转发接口后再输出自己的接口即可实现模块继承

假设有一个`circleplus`模块，继承了`circle`模块。

```js
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

上面代码中的`export *`，表示再输出`circle`模块的所有属性和方法。

注意，`export *`命令会忽略`circle`模块的`default`方法。然后，上面代码又输出了自定义的`e`变量和默认方法。

这时，也可以将`circle`的属性或方法，改名后再输出。

```js
// circleplus.js

export { area as circleArea } from 'circle';
```

上面代码表示，只输出`circle`模块的`area`方法，且将其改名为`circleArea`。

加载上面模块的写法如下。

```js
// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

上面代码中的`import exp`表示，将`circleplus`模块的默认方法加载为`exp`方法。

### 跨模块常量

`const`声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

如果要使用的常量非常多，可以建一个专门的`constants`目录，将各种常量写在不同的文件里面，保存在该目录下。

```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```

然后，将这些文件输出的常量，合并在`index.js`里面。

```js
// constants/index.js
export {db} from './db';
export {users} from './users';
```

使用的时候，直接加载`index.js`就可以了。

```js
// script.js
import {db, users} from './constants/index';
```

### 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

其中，尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。





