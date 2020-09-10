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
    // var inputTwo = document.createElement("INPUT");


    // var form = document.createElement("FORM");
    inputMain.setAttribute("type", "number");
    inputMain.setAttribute("id", "input");
    inputMain.max = "1";
    // enable backspace key in input field with 'native-key-bindings'
    inputMain.setAttribute("class", "input native-key-bindings");


    //Create message element

    const message = document.createElement('div');
    const inputs = document.createElement('div');

    message.textContent = 'These are your saved "copies", you can paste them typing the number of the "copy"';
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


  focusWindow() {
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
  }

  addSuccess(message, options) {
    return this.addNotification(new Notification('success', 'message', options));
  }

  //TODO: esc not working
  setCopy(copy, copyNum, copyArray, maxItemLength) {
    var copyArrayEdited;
    const myDivLength = document.getElementsByClassName('myDiv').length;
    for (let i = 0; i < myDivLength; i++) {
      console.log('Remove number ' + i + 'length ' + document.getElementsByClassName('myDiv').length);
      document.getElementsByClassName('myDiv')[0].remove();
    }
    for (let a = 0; a < copyArray.length; a++) {
      const message = document.createElement('div');
      copyArrayEdited = copyArray[a];
      console.log('Add number ' + a + 'length ' + copyArray.length);
      if (copyArrayEdited.length > maxItemLength) {
        copyArrayEdited = copyArray[a].slice(0, maxItemLength);
        message.textContent = (a) + " - " + copyArrayEdited + " ...";
      } else {
        message.textContent = (a) + " - " + copyArrayEdited;
      }
      message.classList.add('myDiv');
      this.element.appendChild(message);
    }
    console.log(document.getElementsByClassName('myDiv').length);
  }
}
