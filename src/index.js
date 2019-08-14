import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import htmlToReact from 'html-to-react';

import { App } from './App.js';

class ReactElement extends HTMLElement {

  constructor() {
    super();
    this.observer = new MutationObserver(() => this.update());
    this.observer.observe(this, { attributes: true });
  }

  connectedCallback() {
    this._innerHTML = this.innerHTML;
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
    this.observer.disconnect();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    const props = {
      children: this.parseHtmlToReact(this.innerHTML)
    };
    render(<App {...props} />, this);
  }

  unmount() {
    unmountComponentAtNode(this);
  }

  parseHtmlToReact(html) {
    return html && new htmlToReact.Parser().parse(html);
  }

}

customElements.define('react-el', ReactElement);
