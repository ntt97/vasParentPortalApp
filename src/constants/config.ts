// CONFIG API
const SSL = false;
// const SSL = true;
const PORT: number = 3000;
const PORT_WEB: number = 9999;
// const HOST = `${SSL ? 'https://' : 'http://'}api.demo.helen.edu.vn`;

const HOST = `${SSL ? 'https://' : 'http://'}api.vas.dev.nascorp.vn`;
// const HOST = `${SSL ? 'https://' : 'http://'}ppuapi.vas.edu.vn`;
// const HOST = `${SSL ? 'https://' : 'http://'}ppapi.vas.edu.vn`;

const VERSION = '';
// const BASE_URL: string = HOST + `:${PORT}`;
const BASE_URL: string = HOST;
const DEFAULT_TIMEOUT: number = 15000;

const URL_GOOGLE_TRANSLATE = 'https://translation.googleapis.com/language/translate/v2';
// const API_TRANSLATE_KEY = 'AIzaSyCn5JYQBboGlg61nicL3f4nudEoyFfIhpI';
const API_TRANSLATE_KEY = 'AIzaSyDjPW0d9hCe-sarNeyO6isZYFzK35_OX-4';

export { PORT_WEB, VERSION, BASE_URL, DEFAULT_TIMEOUT, API_TRANSLATE_KEY, URL_GOOGLE_TRANSLATE };
