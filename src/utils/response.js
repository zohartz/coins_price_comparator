class Response {
  constructor(status, description, data) {
    this.status = status;
    this.description = description;
    this.data = data;
  }
  data() {
    return this.data;
  }
  status() {
    return this.status;
  }
  description() {
    return this.description;
  }
}
module.exports = Response;
