// Websocket Normalizer base class

class epibot_websocket_base {

  constructor (stub, account) {
    this.load_modules ();
    this.stub = stub;
    if (account) {
      this.account = this.accounts.ccxtparams (account);
      this.apikey = this.account.parameters.apiKey;
      this.secret = this.account.parameters.secret;
      this.url = this.account.parameters.urls.api;
      this.testnet = String (this.account.parameters.testnet) == 'true'
        ? true
        : false;
    }
  }

  // Create module shortcuts

  load_modules () {
    Objec