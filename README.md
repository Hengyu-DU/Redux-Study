## redux

###  一、 redux简介
#### 1.redux是什么？
  1. redux是一个专门用于做**状态管理**的JS库（不是react插件库）
  2. 基本与react配合使用
  3. 作用：集中式管理react应用中多个组件**共享的state状态**

#### 2.工作流程

​	![](\原理图\redux原理图.png)


### 四、异步action
引入 applyMiddleware
引入 thunk
* 在store.js中：

```js
import { createStore, applyMiddleware } from 'redux'
import countReducer from './count_reducer'
import thunk from 'redux-thunk' // 引入用于支持异步action的中间件

const store = createStore (countReducer,applyMiddleware(thunk))

export default store
```

* 异步action函数的返回值是一个函数，而不是{type,action}对象，因此store会自动识别出来。同时无需引入store，可直接在返回值函数中使用dispatch。
```js
export const creatIncrementAsyncAction = (value,time) => {
  return (dispatch)=>{ 
    setTimeout(() => {
      dispatch(creatIncrementAction(value))
    }, time);
  }
}
```


### 五、 react-redux的基本使用
（1） 明确两个概念：
  - 1）UI 组件： 不能使用任何redux的API，只负责页面的呈现、交互等

  - 1）容器组件：负责和redux通信，结果交给UI组件

（2）如何创建一个容器组件：靠react-redux的 connect函数

  - 引入：
    ```js
    import {connect} from 'react-redux'
    ```
    
  - 写法：
    ```js
    connect(mapStateToProps, mapDispatchToProps)(UI组件)
    ```
    - mapStateToProps 映射状态，返回值需要是一个对象
    - mapDispatchToProps 映射操作状态的方法，返回值需是一个对象

（3）备注：容器组件中的store是在App.jsx中靠props传进去的，不是在容器组件中直接引入
  ```js
  import store from './redux/store'

  export default class App extends Component {
    render() {
      return (
        <CountContainer store={store}/>
      )
    }
  }
  ```