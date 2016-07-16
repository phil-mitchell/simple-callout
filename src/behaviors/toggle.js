const ANIMATION = {
  frames: [
    { transform: 'scale(0.95, 0.8)', opacity: 0 },
    { transform: 'scale(1, 1)', opacity: 1 }
  ],
  opts: {
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    fill: 'both',
    duration: 75
  }
};

export default {
  properties: {

    /**
     * State of callout
     * @type {Boolean}
     */
    active: {
      type: Boolean,
      observer: '_activeChanged',
      notify: true
    },

    /**
     * If callout is visible
     * @type {Boolean}
     */
    visible: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * If callout has fully opened
     * @type {Boolean}
     */
    _opened: Boolean,

    /**
     * Disable closing when user clicks outside callout
     * @type {Boolean}
     */
    noOutsideClick: Boolean,

    /**
     * Disable closing when user presses escape key
     * @type {Boolean}
     */
    noEscape: Boolean

  },

  /**
   * Convinience method to close the callout
   * @return {undefined}
   */
  open() {
    this.active = true;
  },

  /**
   * Convinience method to open the callout
   * @return {undefined}
   */
  close() {
    this.active = false;
  },

  /**
   * Convinience method to toggle the callout
   * @return {undefined}
   */
  toggle() {
    this.active = !this._active;
  },

  /**
   * Open and close the callout on active change
   * @param  {Boolean} active state of the active property
   * @return {undefined}
   */
  _activeChanged(active) {
    active ? this._showCallout() : this._hideCallout()
  },

  /**
   * Animate the callout in
   * @return {undefined}
   */
  _showCallout() {
    let animation;

    this.visible = true;
    animation = this.animate(ANIMATION.frames, ANIMATION.opts);
    animation.onfinish = () => this._opened = true
  },

  /**
   * Animate the callout out
   * @return {undefined}
   */
  _hideCallout() {
    let animation;

    this._opened = false;
    animation = this.animate(ANIMATION.frames.slice().reverse(), ANIMATION.opts);
    animation.onfinish = () => this.visible = false;
  },

  /**
   * Close the callout on escape key
   * @return {undefined}
   */
  _closeOnEsc() {
    document.addEventListener('keyup', (e) => {
      if (!this.noEscape && e.keyCode === 27) {
        this.active = false;
      }
    });
  },

  /**
   * Close on outside (and children) click or tap
   * @return {undefined}
   */
  _closeOnClick() {
    let close = (e) => {
      if (!this.noOutsideClick && this._opened && e.target !== this) {
        this.active = false;
      }
    };

    document.addEventListener('click', close);
    document.addEventListener('touchend', close);
  },

  /**
   * Setup listener functions on attach
   * @return {undefined}
   */
  attached() {
    this._closeOnEsc();
    this._closeOnClick();
  }

};
