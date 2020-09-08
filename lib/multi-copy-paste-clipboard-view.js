'use babel';

export default class MyPackageView {


  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('multi-copy-paste2');
    // enable backspace key in input field
    this.element.classList.add('native-key-bindings');
    // const bigDiv = document.createElement('div');
    // this.element.appendChild(bigDiv);
    // bigDiv.classList.add('bigDiv');
    var inputMain = document.createElement("INPUT");
    var inputTwo = document.createElement("INPUT");

    // var form = document.createElement("FORM");
    inputMain.setAttribute("type", "number");
    inputMain.setAttribute("id", "input");

    // enable backspace key in input field with 'native-key-bindings'
    inputMain.setAttribute("class", "input native-key-bindings");




    //Create message element

    const message = document.createElement('div');
    const inputs = document.createElement('div');

    message.textContent = 'These are your saved "copies", you can paste them typing the number of the "copy" in the text input';
    message.classList.add('exampletext');
    this.element.appendChild(message);
    // this.element.appendChild(form);
    this.element.appendChild(inputs);
    inputs.appendChild(inputMain);


    // this.getLocation();
  }


  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getSelectedText() {
    return this.getLastSelection().getText();
  }
  getText() {
    return this.editor.buffer.getTextInRange(this.getBufferRange());
  }

  resetInput() {
    document.getElementById('input').focus();
    document.getElementById('input').value = '';
  }

  addSuccess(message, options) {
    return this.addNotification(new Notification('success', 'message', options));
  }

  setCopy(copy, copyNum, copyArray) {
    for (let i = 0; i < document.getElementsByClassName('myDiv').length; i + 1) {
      console.log('Remove numer ' + i);
      document.getElementsByClassName('myDiv')[i].remove();
    }

    for (let a = 0; a < copyArray.length; a++) {
      console.log('Add numer ' + a);
      const message = document.createElement('div');
      message.textContent = (a + 1) + " - " + copyArray[a];
      message.classList.add('myDiv');
      this.element.appendChild(message);
    }
    console.log(document.getElementsByClassName('myDiv').length);
  }
}
