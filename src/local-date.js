const template = document.createElement('template');
template.innerHTML = `
<style>
.local-date{
  
}
</style>
<span class="local-date"></span>
`

export class LocalDate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.localeDate = '';
        this.date = this.getAttribute('date') || (new Date()).valueOf();
        this.format = this.getAttribute('format') || 'en-US';
        this.indicator = this.getAttribute('indicator');
        this.numbersLang = this.getAttribute('numbers');
        this.options = this.getOptions();

        this.toLocaleDate();
        console.log(this.localeDate);
        if (this.indicator !== null) {
            this.replaceIndicator()
        }

        if (this.numbersLang === 'english') {
            this.replaceNumbers()
        }

        this.shadowRoot.querySelector('.local-date').innerHTML = this.localeDate;

    }

    toLocaleDate() {
        this.date = new Date(this.date)
        this.localeDate = this.date.toLocaleDateString(this.format, this.options)
    }
    replaceIndicator() {
        this.localeDate = this.localeDate.replace(/\/|\. |\./g, this.indicator)
    }
    replaceNumbers() {
        this.localeDate = this.localeDate.replace(/[\u0660-\u0669]/g, function (c) {
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

    render() {
        this.shadowRoot.querySelector('.local-date').innerHTML = this.localeDate;
    }

}
