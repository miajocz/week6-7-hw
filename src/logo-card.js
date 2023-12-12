import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/meme-maker/meme-maker.js';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

export class LogoCard extends LitElement {
  static properties = {
    image: { type: String },
    topText: { type: String },
    bottomText: { type: String },
    accentColor: {
      type: String,
      reflect: true,
      attribute: 'accent-color'
    },
    title: { type: String, reflect: true },
    subtitle: { type: String },
    opened: { type: Boolean, reflect: true }
  }

  static get styles() {
    return css`
    .card-container {
      padding-top: 10px;
      justify-content: center;
      display: flex;
      align-items: center;
      height: 90vh;
      float: left;
      display: block;
    }
    
    .card {
      width: 300px;
      background-color: var(--card-bg-color);
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      padding: 20px;
      text-align: center;
      display: block;
    }
    
    .card img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .card h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .card p {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    
    .card a {
      display: inline-block;
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
    }
    :root {
      --bg-color: #f8f8f8;
      --card-bg-color: #fff;
    }
    :host([accent-color="blue" ]) .card {
      background-color: var(--logo-card-accent-color, blue);
      color: white; 
    }
    :host([accent-color="gray" ]) .card {
      background-color: var(--logo-card-accent-color, gray);
      color: white; 
    }
    :host([accent-color="white" ]) .card {
      background-color: var(--logo-card-accent-color, white);
      color: black; 
    }
    @media (min-width: 500px) and (max-width: 800px) {
      button {
        opacity: 0;
        display: none;
      }
    }
    @media (max-width: 500px) {
      div {
        font-size: 10px;
        image-resolution: auto;
      }
    }
  `;
  }

  constructor() {
    super();
    this.image = 'https://logos-world.net/wp-content/uploads/2020/05/Washington-Nationals-Emblem.png';
    this.title = 'The Washington Nationals Logo';
    this.subtitle = 'Description';
    this.opened = false;
  }
  toggleEvent(e) {
    var state = this.shadowRoot.querySelector('details').getAttribute('open') === '' ? true : false;
    this.opened = state;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'opened') {
        this.dispatchEvent(new CustomEvent('opened-changed',
          {
            composed: true,
            bubbles: true,
            cancelable: false,
            detail: {
              value: this[propName]
            }
          }
        ));
        console.log(`${propName} changed. oldValue: ${oldValue}`);
      }
    });
  }

  render() {
    return html`
    <div class="card-container">
      <div class="card">
        <h1>${this.title}</h1>
        <meme-maker class="meme" image-url=${this.image} top-text=${this.topText} bottom-text=${this.bottomText}>
        </meme-maker>
        <h2>${this.subtitle}</h2>
        <details .open="${this.opened}" @toggle="${this.toggleEvent}" @click="${this.clickEvent}">
          <summary>Click here for more details</summary>
          <ul>
            <slot></slot>
          </ul>
        </details>
      </div>
    </div>
    `;
  }
}

customElements.define('logo-card', LogoCard);