const STANDARD_EASING = 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      ANIMATIONS = [
        {
          frames: [
            { transform: 'translateZ(0) scale(0.75, 0.85)' },
            { transform: 'translateZ(0) scale(1, 1)' }
          ],
          opts: {
            easing: STANDARD_EASING,
            fill: 'both',
            duration: 120
          }
        },
        {
          frames: [
            { opacity: 0 },
            { opacity: 1 }
          ],
          opts: {
            easing: 'ease',
            fill: 'both',
            duration: 90
          }
        }
      ];

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
   * @param  {Boolean} active   Current state of the active property
   * @param  {Boolean} previous Previous state of the active property
   * @return {undefined}
   */
  _activeChanged(active, previous) {
    if (active) {
      this._showCallout();
    } else if (previous) {
      this._hideCallout();
    }
  },

  /**
   * Animate the callout in
   * @return {undefined}
   */
  _showCallout() {
    let animations,
        toAnimation = ({ frames, opts }) => this.animate(frames, opts),
        toPromise = (animation) => new Promise((resolve) => animation.onfinish = resolve);

    this.visible = true;

    Promise.all(
      ANIMATIONS
        .map(toAnimation)
        .map(toPromise)
    ).then(() => this._opened = true);
  },

  /**
   * Animate the callout out
   * @return {undefined}
   */
  _hideCallout() {
    let animations,
        toAnimation = ({ frames, opts }) => this.animate(frames.slice().reverse(), opts),
        toPromise = (animation) => new Promise((resolve) => animation.onfinish = resolve);

    this._opened = false;

    Promise.all(
      ANIMATIONS
        .map(toAnimation)
        .map(toPromise)
    ).then(() => this.visible = false);
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
