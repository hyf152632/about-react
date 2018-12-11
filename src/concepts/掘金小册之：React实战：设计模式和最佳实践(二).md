# title

React 中的模式：

## 聪明组件和傻瓜组件

其他名字：

1. 容器组件和展示组件(Container and Presentational Components);
2. 胖组件和瘦组件；
3. 有状态组件和无状态组件；

这种模式的本质就是把一个功能分配到两个组件中，形成父子关系，外层的父组件负责数据状态，内层的子组件只负责展示。

### 为什么要分割组件

软件设计中有一个原则，叫做“责任分离”（Separation of Responsibility），
简单说就是让一个模块的责任尽量少，如果发现一个模块功能过多，就应该拆分为多个模块，
让一个模块都专注于一个功能，这样更利于代码的维护。

使用 React 来做界面，无外乎就是获得驱动界面的数据，然后利用这些数据来渲染界面。

傻瓜组件：

```js
import SmileFace from "./yaoming_smile.png";

const Joke = ({ value }) => {
  return (
    <div>
      <img src={SmileFace} />
      {value || "loading..."}
    </div>
  );
};
```

聪明组件：

```js
export default class RandomJoke extends React.Component {
  state = {
    joke: null
  };

  componentDidMount() {
    fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
      });
  }

  render() {
    const { joke } = this.state;
    return <Joke value={joke} />;
  }
}
```

聪明组件的 render 函数一般都这样简单，因为渲染不是他们操心的业务，他们的主业是获取数据。

### PureComponent

因为傻瓜组件一般没有自己的状态，所以，可以像上面的 Joke 一样实现为函数形式，其实，我们可以进一步改进，利用 PureComponent 来提高傻瓜组件的性能。

函数式组件因为没有`shouldComponentUpdate`钩子， 所以即使是相同的 props 也会再次执行一遍渲染。

改进后的 Joke 组件：

```js
class Joke extends React.PureComponent {
  render() {
    return (
      <div>
        <img src={SmileFace} />
        {this.props.value || "loading..."}
      </div>
    );
  }
}
```

值得一提的是，PureComponent 中 shouldComponentUpdate 对 props 做得只是浅层比较，不是深层比较，如果 props 是一个深层对象，就容易产生问题。

比如，两次渲染传入的某个 props 都是同一个对象，但是对象中某个属性的值不同，这在 PureComponent 眼里，props 没有变化，不会重新渲染，但是这明显不是我们想要的结果。

### React.memo

虽然 PureComponent 可以提高组件渲染性能，但是它也不是没有代价的，它逼迫我们必须把组件实现为 class，不能用纯函数来实现组件。

如果你使用 React v16.6.0 之后的版本，可以使用一个新功能 React.memo 来完美实现 React 组件，上面的 Joke 组件可以这么写：

```js
const Joke = React.memo(() => (
  <div>
    <img src={SmileFace} />
    {this.props.value || "loading..."}
  </div>
));
```

React.memo 即利用了 shouldComponentUpdate, 又不要求我们写一个 class, 这也体现出 React 逐步向完全函数式编程前进。

## 高阶组件

