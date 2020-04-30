const template = document.createElement('template')

template.innerHTML = /* html */ `
<style>
  #form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 60px;
    width: 100%;
  }

  #form h2 {
    font-size: 18px;
    letter-spacing: 1px;
  }
</style>

<div id="form">
  <h2 id="date"></h1>
  <h2 id="time"></h2>
  <h2 id="event"></h2>
  <h2 id="place"></h2>
  <a href="#" target="_blank" id="link">Link</a>
</div>
<hr>
`

class ConcertEntry extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._date = this.shadowRoot.querySelector('#date')
    this._time = this.shadowRoot.querySelector('#time')
    this._event = this.shadowRoot.querySelector('#event')
    this._place = this.shadowRoot.querySelector('#place')
    //this._link = this.shadowRoot.querySelector8('#link')
  }

  /**
   * Functions called when the element is added to the DOM.
   * @memberof ScorePreview
   */
  connectedCallback () {
    if (this.hasAttribute('date')) this._date.textContent = this.getAttribute('date')
    if (this.hasAttribute('time')) this._time.textContent = this.getAttribute('time')
    if (this.hasAttribute('event')) this._event.textContent = this.getAttribute('event')
    if (this.hasAttribute('place')) this._place.textContent = this.getAttribute('place')
    // if (this.hasAttribute('link')) this._link = this.getAttribute('link')
  }
}

window.customElements.define('concert-entry', ConcertEntry)
