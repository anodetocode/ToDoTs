export default class View {
  public log = this.query('.log')!;
  public taskList = this.query("#todoList");
  public addbutton = this.query("#addButton");
  public textField = this.query("#taskTextField");
  public allFilterButton = this.query('#allFilterButton');
  public toDoFilterButton = this.query('#toDoFilterButton');
  public doneFilterButton = this.query('#doneFilterButton');

  private query(selector: string) {
    return document.querySelector(selector);
  }

  private queryAll(selector: string) {
    return document.querySelectorAll(selector);
  }
}