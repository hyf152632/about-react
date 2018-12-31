# title

## React Router

React Router 4 是对 React Router 的一次彻底重构，采用动态路由，遵循 React 中一切
皆组件的实现，每一个 Router 都是一个普通的 React 组件。V4 版本并不兼容之前的 React Router
版本。

Route 渲染组件的方式：

1. component
2. render
   一个函数，返回一个 React 元素。这种方式可以方便地为待渲染的组件传递额外的属性：

```js
<Route path='/foo' render={(props) => (
  <Foo {...props} data={extraProps} />
)}
```

3. children
   无论是否匹配成功，children 返回的组件都会被渲染。但是，当匹配不成功时，match 属性为 null:

```js
<Route path='/foo' children={(props) => (
  <div className={props.match ? 'active' : ''}>
  <Foo />
  </div>
)}
```

Switch 和 exact

嵌套路由：
嵌套路由是指在 Route 渲染的组件内部定义新的 Route,
match.url = 父层的 url

Link
history.push 和 history.replace

APICloud

## Redux

唯一数据源；
保持应用状态只读；
应用状态的改变通过纯函数完成；

action 是 Redux 中的信息载体，是 store 唯一的信息来源。把 action 发送给 store 必须通过 store 的 dispatch 方法。

```js
function mapStateToProps(state, ownProps) {
  //...
}
```

Provider 组件

redux-thunk
使得 dispatch 可是接收一个函数，而不是只能接收 action 对象
异步 action 会先经过 redux-thunk 处理，然后再次发送一个 action，这次的 action 就是一个普通的 JS 对象了。

```js
//异步 action
function getData(url) {
  return dispatch => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    return fetch(url)
      .then(
        response => response.json(),
        error => {
          dispatch({ type: "FETCH_DATA_FAILURE", error });
        }
      )
      .then(json => dispatch({ type: "FETCH_DATA_SUCCESS", data: json }));
  };
}
```

除了 redux-thunk, 常用于处理异步操作的中间件还有 redux-promise,redux-saga, redux-observable
