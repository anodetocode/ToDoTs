export default class View {
  public log = this.query('.log')!;
  public listElement = this.query("#todoList");
  public addbutton = this.query("#addButton");
  public textField = this.query("#taskTextField");

  private query(selector: string) {
    return document.querySelector(selector);
  }

  private queryAll(selector: string) {
    return document.querySelectorAll(selector);
  }
}