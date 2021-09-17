# \<local-date>

it's a web compnent which shows date in different  formats.

- 'en-GB' for British English uses day-month-year.order
- 'ko-KR' for Korean uses year-month-day order.
- 'fa-IR' for Persian, convert date to Solar Hijri.
- 'ar-EG' for Arabic uses real Arabic digits.
- 'nl' for Dutch format.
- . . .

## Installation

```bash
npm i local-date-web-component
```

## Usage

```html
<script type="module">
  import 'local-date-web-component';
</script>

<local-date date="9/17/2021"></local-date>
// it shows 9/17/2021

<local-date></local-date>
// it shows current date in 'en-US' format 

<local-date format="en-GB"></local-date>
// it shows current date in 'en-GB' format 

<local-date date="1/1/2020" format="ko-KR"></local-date>
// 2020. 1. 1.

<local-date date="1/1/2020" format="fa-IR"></local-date>
// ۱۳۹۸/۱۰/۱۱

<local-date date="1/1/2020" numbers="english" format="fa-IR"></local-date>
// 1398/10/11



```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
