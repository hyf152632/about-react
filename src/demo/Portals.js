import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

export default class PortalSample extends PureComponent {
  state = { visible: false };
  renderButton = () => {
    return (
      <button type="primary" onClick={() => this.setState({ visible: true })}>
        打开对话框
      </button>
    );
  };
  renderDialog = () => {
    return (
      <div className="portal-sample">
        <div>这是一个对话框！</div>
        <br />
        <button
          type="primary"
          onClick={() => this.setState({ visible: false })}
        >
          关闭对话框
        </button>
      </div>
    );
  };
  render() {
    if (!this.state.visible) return this.renderButton();
    return ReactDOM.createPortal(
      this.renderDialog(),
      document.getElementById("dialog-container")
    );
  }
}
