export class BrowserService {
  get scrollBarWidth() {
    return window.innerWidth - document.body.clientWidth ?? 0;
  }
}
