import * as React from "react";

export class Square extends React.Component<
  {
    value: string,
    style: Object,
    className: string,
    onClick(): void,
    disabled: boolean,
  }, 
  {}
>
{
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.className}
        style={this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
      <link href="//db.onlinewebfonts.com/c/6a9c6944fe8451dd397fe9d0763a4c88?family=OCR+A+Std" rel="stylesheet" type="text/css"/>
        {this.props.value}
      </button>
    );
  }
}