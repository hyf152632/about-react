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
