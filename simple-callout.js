import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
const SCALE_FROM = 0.85;

class SimpleCallout extends PolymerElement {
  static get template() {
    return html`
    <style>
      /**
       * Callout box
       */
      :host, *, *::before, *::after {
        box-sizing: border-box;
      }

      :host {
        position: relative;
        display: inline-block;
        will-change: transform;
        background: white;
        border-radius: 3px;
        outline: none;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        -moz-osx-font-smoothing: grayscale;
         -webkit-font-smoothing: antialiased;
                 font-smoothing: antialiased;
      }

      :host([hidden]) {
        display: none;
      }

      :host(:not([visible])) {
        opacity: 0;
        transition: transform 125ms cubic-bezier(0.4, 0.0, 1, 1),
                    opacity 90ms ease;
      }

      :host([visible]) {
        opacity: 1;
        transition: transform 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
                    opacity 100ms ease;
      }

      /**
       * Arrow
       */
      :host([arrow])::before {
        content: '';
        position: absolute;
        height: var(--simple-callout-arrow-size, 8px);
        width: var(--simple-callout-arrow-size, 8px);
        transform: rotate(45deg);
        background: inherit;
      }

      /* Make sure content is on top of arrow */
      :host([arrow]) ::content * {
        position: relative;
        z-index: 1;
      }

      /**
       * Arrow positioning
       */
      /* Top */
      :host([arrow][origin*="top"])::before {
        top: calc(0px - var(--simple-callout-arrow-size, 8px) / 2);
        box-shadow: -1px -1px rgba(0,0,0, 0.075);
        border-top-left-radius: 2px;
      }

      /* Bottom */
      :host([arrow][origin*="bottom"])::before {
        bottom: calc(0px - var(--simple-callout-arrow-size, 8px) / 2);
        box-shadow: 1px 1px 1px rgba(0,0,0, 0.2);
        border-bottom-right-radius: 2px;
      }

       /* Top/bottom Left */
      :host([arrow][origin*="left"])::before {
        left: var(--simple-callout-arrow-size, 8px);
      }

      :host([arrow][origin*="center"])::before {
        left: calc(50% - var(--simple-callout-arrow-size, 8px) / 2);
      }

      :host([arrow][origin*="right"])::before {
        right: var(--simple-callout-arrow-size, 8px);
      }

      /* Left side */
      :host([arrow][origin="left"])::before {
        top: calc(50% - var(--simple-callout-arrow-size, 8px) / 2);
        left: calc(0px - var(--simple-callout-arrow-size, 8px) / 2);
        box-shadow: -1px 1px 1px rgba(0,0,0, 0.075);
        border-bottom-left-radius: 2px;
      }

      /* Right side */
      :host([arrow][origin="right"])::before {
        top: calc(50% - var(--simple-callout-arrow-size, 8px) / 2);
        right: calc(0px - var(--simple-callout-arrow-size, 8px) / 2);
        box-shadow: 1px -1px 0 rgba(0,0,0, 0.075);
        border-top-right-radius: 2px;
      }
    </style>

    <slot></slot>
`;
  }

  static get is() {
    return 'simple-callout';
  }

  static get properties() {
    return {
      /**
       * State of callout
       * @type {Boolean}
       */
      active: {
        type: Boolean,
        value: false,
        notify: true
      },

      /**
       * If callout is visible
       * Used for transitions
       * @type {Boolean}
       */
      visible: {
        type: Boolean,
        reflectToAttribute: true,
        readonly: true
      },

      /**
       * If callout is hidden
       * Used for transitions
       * @type {Boolean}
       */
      hidden: {
        type: Boolean,
        reflectToAttribute: true,
        value: true,
        readonly: true
      },

      /**
       * Disable closing when focus lost
       * @type {Boolean}
       */
      noBlur: Boolean,

      /**
       * Disable closing when user presses escape key
       * @type {Boolean}
       */
      noEscape: Boolean,

      /**
      * Where the callout expands from, space-separated list
      * (top/bottom) (left/center|right) || left/right
      * @type {String}
      */
      origin: {
        type: String,
        reflectToAttribute: true,
        observer: '_setTransformOrigin'
      },

      /**
       * Whether the callout should have an arrow
       * @type {Object}
       */
      arrow: {
        type: Boolean,
        reflectToAttribute: true
      },

      /**
       * Make callout focuseable
       * @type {Number}
       */
      tabindex: {
        type: Number,
        reflectToAttribute: true,
        readonly: true,
        value: 0
      }
    };
  }

  static get observers() {
    return [
      '_applyScale(visible)',
      '_focusOnActive(active)',
      '_toggleVisibility(active)',
      '_closeOnEscape(active)'
    ];
  }

  ready() {
    super.ready();
    this.addEventListener('blur', () => this._closeOnBlur());
    this.addEventListener('transitionend', () => this._hideAfterInactiveTransition());
  }

  /**
   * Auto focus the callout on active
   * @param  {Boolean} active Value of the active property
   * @return {undefined}
   */
  _focusOnActive(active) {
    if (active) {
      this.focus();
    }
  }

  /**
   * Toggle visibility of callout based on active state
   * @param  {Boolean} active Value of the active property
   * @return {undefined}
   */
  _toggleVisibility(active) {
    if (active) {
      this.hidden = false;

      afterNextRender(this, () => this.visible = true);
    } else {
      this.visible = false;
    }
  }

  /**
   * Set hidden if visible false at end of transitions
   * @param  {Event} e Transitionend event
   * @return {undefined}
   */
  _hideAfterInactiveTransition() {
    if (!this.visible) {
      this.hidden = true;
    }
  }

  /**
   * Close the callout when it loses focus
   * @param  {Event} e Blur event
   * @return {undefined}
   */
  _closeOnBlur() {
    if (!this.noBlur) {
      this.active = false;
    }
  }

  /**
   * Close the callout on escape keypress
   * @param  {Boolean} active Value of the active property
   * @return {undefined}
   */
  _closeOnEscape(active) {
    let closeIfEscape = (e) => {
      if (!this.noEscape && e.keyCode === 27) {
        this.active = false;
      }
    };

    if (active) {
      document.addEventListener('keydown', closeIfEscape);
    } else {
      document.removeEventListener('keydown', closeIfEscape);
    }
  }

  _applyScale(visible) {
    const { transform } = getComputedStyle(this),
        values = /matrix/.test(transform) && transform.split('(')[1].split(')')[0].split(','),
        scaleMatrix = scale => `matrix(${scale},${values[1]},${values[2]},${scale},${values[4]},${values[5]})`;

    this.style.transform = visible ? scaleMatrix(1) : scaleMatrix(SCALE_FROM);
  }

  /**
   * Set transform origin based on origin
   * @param {String} origin Current value of arrow property
   * @returns {undefined}
   */
  _setTransformOrigin(origin) {
    if (!origin) {
      return;
    }

    this.style['transform-origin'] = origin;
  }
}

customElements.define(SimpleCallout.is, SimpleCallout);
