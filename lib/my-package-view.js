'use babel';

export default class MyPackageView {


  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('my-package2');

    //Create message element
    const message = document.createElement('div');
    message.textContent = 'The MyPackage2 package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
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

  setCopy(copy, copyNum) {

    //Create message element
    const message = document.createElement('div');
    message.textContent = copyNum +  " - " + copy;
    message.classList.add('message');
    this.element.appendChild(message);
  }
}
