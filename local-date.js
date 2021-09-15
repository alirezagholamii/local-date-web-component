const template = document.createElement('template');
template.innerHTML = `
<style>
.local-date{
  
}
</style>
<span class="local-date"></span>
`

class LocalDate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        const date = this.getAttribute('date') || (new Date()).valueOf();
        const format = this.getAttribute('format');
        const indicator = this.getAttribute('indicator');
        const numbersLang = this.getAttribute('numbers');
        const options = this.getOptions();

        let localeDate = this.toLocaleDate(date, format, options);

        if (indicator !== null) {
            localeDate = this.replaceIndicator(localeDate, indicator)
        }

        if (numbersLang === 'english') {
            localeDate = this.replaceNumbers(localeDate)
        }

        this.shadowRoot.querySelector('.local-date').innerHTML = localeDate;
    }

    toLocaleDate(value, format = 'en-US', options) {
        const date = new Date(value)
        const localDate = date.toLocaleDateString(format, options)
        return localDate
    }
    replaceIndicator(date, indicator) {
        return date.replace(/\/|\. |\./g, indicator)
    }
    replaceNumbers(date) {
        return date.replace(/[\u0660-\u0669]/g, function (c) {
            return c.charCodeAt(0) - 0x0660;
        }).replace(/[\u06f0-\u06f9]/g, function (c) {
            return c.charCodeAt(0) - 0x06f0;
        });
    }

    getOptions() {
        const items = ['day', 'month', 'year', 'weekday']
        const options = {}
        for (const item of items) {
            const value = this.getAttribute(item);
            if (value) {
                options[item] = value
            }
        }
        return options
    }

}

window.customElements.define('local-date', LocalDate)