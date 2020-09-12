import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SteedosComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.Blaze = window.Blaze;
    this.Template = window.Template;
    this.ReactiveVar = window.ReactiveVar;
  }

  componentDidMount() {
    this.renderBlazeView();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.template != this.props.template) {
      this.Blaze.remove(this._blazeView);
      this.renderBlazeView();
    }
  }

  renderBlazeView() {
    this._blazeData = new this.ReactiveVar(_.omit(this.props, 'template'));

    let template, tArg = this.props.template;
    if (typeof tArg === 'string') {
      template = this.Template[tArg];
      if (!template)
        throw new Error(`No Template["${tArg}"] exists.  If this template `
          + "originates in your app, make sure you have the `templating` "
          + "package installed (and not, for e.g. `static-html`)");
    } else if (tArg instanceof this.Blaze.Template) {
      template = tArg;
    } else {
        throw new Error("Invalid template= argument specified.  Expected "
          + "the string name of an existing Template, or the template "
          + "itself, instead got ''" + typeof tArg + ": "
          + JSON.stringify(tArg));
    }

    this._blazeView = this.Blaze.renderWithData(
      template,
      () => this._blazeData.get(),
      ReactDOM.findDOMNode(this._blazeRef)
    );
  }

  shouldComponentUpdate(nextProps) {
    // this used to be in (the now deprecated) componentWillReceiveProps
    this._blazeData.set(_.omit(nextProps, 'template'));

    // Never call render() for props except template again; Blaze will do what's necessary.
    return nextProps.template !== this.props.template;
  }

  componentWillUnmount() {
    this.Blaze.remove(this._blazeView);
  }

  render() {
    return ( <span className={this.props.className || ''} ref={(c) => this._blazeRef = c} /> );
  }

}

export default SteedosComponent;