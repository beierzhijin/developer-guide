# JSX

## 什么是JSX
JSX 是 JavaScript 的扩展语法，这种 <></> 标签的写法就是 JSX。JSX 语法在 React 中被广泛使用，它可以让我们在 JavaScript 中书写 HTML 代码，让代码更加简洁。


## syntax

```jsx
// jsx声明变量
const element = <h1>Hello, world!</h1>;

// jsx中设置属性
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
const element = <img src={user.avatarUrl} />;

// jsx中可以包含多个子元素
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);

// jsx作为表达式，用在return返回
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}    
```

## 在{}中使用JS

`{}`中可以放置任何合法的 JavaScript 表达式

```jsx
// JSX 中调用 js 函数：
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

// 渲染element元素并加载到父容器root下
ReactDOM.render(
    element,
    document.getElementById('root')
);

// JSX 嵌入 复杂表达式
function NumberList(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()}
                    value={number} />
            )}
        </ul>
    );
}
```
