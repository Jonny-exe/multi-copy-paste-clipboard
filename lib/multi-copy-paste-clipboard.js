'use babel';


import MyPackageView from './multi-copy-paste-clipboard-view';
import {
  CompositeDisposable
} from 'atom';
var copy;
var copyNum = 0;
var lastCopy = "";
var copyArray = [];
var maxCopies = 10;
var maxItemLength = 60;


export default {

  config: {
    "max-copies": {
      "description": "Set the maximum of copies you want multi-copy-paste-clipboard to save. Maximum is 20.",
      "type": "integer",
      "default": "10",
      "minimum": "1",
      "maximum": "20"
    },
    "max-item-length": {
      "description": "Set the maximum visualized length of the copy items. Longer items will be abbreviated to save screen space. This will not affect the real copy-paste strings. Maximum is 500.",
      "type": "integer",
      "default": "60",
      "minimum": "10",
      "maximum": "500"
    }
  },
  myPackageView: null,
  modalPanel: null,
  subscriptions: null,


  activate(state) {
    this.myPackageView = new MyPackageView(state.myPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageView.getElement(),
      visible: false
    });
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.setMaxValue();
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'multi-copy-paste:copy': () => this.copy(),
      'multi-copy-paste:toggle': () => this.see(),
      'multi-copy-paste:test': () => this.testFunc(),
      'multi-copy-paste:paste': () => this.defaultPaste(0, false),
      'multi-copy-paste:paste-0': () => this.startEnter(0, true),
      'multi-copy-paste:paste-1': () => this.startEnter(1, true),
      'multi-copy-paste:paste-2': () => this.startEnter(2, true),
      'multi-copy-paste:paste-3': () => this.startEnter(3, true),
      'multi-copy-paste:paste-4': () => this.startEnter(4, true),
      'multi-copy-paste:paste-5': () => this.startEnter(5, true),
      'multi-copy-paste:paste-6': () => this.startEnter(6, true),
      'multi-copy-paste:paste-7': () => this.startEnter(7, true),
      'multi-copy-paste:paste-8': () => this.startEnter(8, true),
      'multi-copy-paste:paste-9': () => this.startEnter(9, true),
      'multi-copy-paste:paste-10': () => this.startEnter(10, true),
      'multi-copy-paste:paste-11': () => this.startEnter(11, true),
      'multi-copy-paste:paste-12': () => this.startEnter(12, true),
      'multi-copy-paste:paste-13': () => this.startEnter(13, true),
      'multi-copy-paste:paste-14': () => this.startEnter(14, true),
      'multi-copy-paste:paste-15': () => this.startEnter(15, true),
      'multi-copy-paste:paste-16': () => this.startEnter(16, true),
      'multi-copy-paste:paste-17': () => this.startEnter(17, true),
      'multi-copy-paste:paste-18': () => this.startEnter(18, true),
      'multi-copy-paste:paste-19': () => this.startEnter(19, true),

    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageView.destroy();
  },

  serialize() {
    return {
      myPackageViewState: this.myPackageView.serialize()
    };
  },

  setMaxValue() {

    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      maxCopies = atom.config.get('multi-copy-paste-clipboard.max-copies');
      maxItemLength = atom.config.get('multi-copy-paste-clipboard.max-item-length');
      console.log(maxCopies)
      copy = selection;
      atom.clipboard.write(copy);
    }
  },

  copy() {
    console.log(copyArray);
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      copy = selection;
      atom.clipboard.write(copy);
    }

    if (copy != lastCopy && copy != "") {
      //remove existing replicated items from array and move them to the front

      let findCopyIndex = copyArray.findIndex(element => element == copy);
      if (findCopyIndex != -1) {
        copyArray.splice(findCopyIndex, 1);
      }
      copyArray.reverse();
      copyArray.push(copy);
      copyArray.reverse();
      lastCopy = copy;
      copyNum += 1;

      if (copyArray.length > maxCopies) {
        copyArray = copyArray.slice(0, maxCopies);
      }

      this.myPackageView.setCopy(copy, copyNum, copyArray, maxItemLength);
    }
  },

  testFunc() {
    console.log('test');
  },

  paste(number, toggleModal) {

    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(copyArray[number]);
    }
    if (toggleModal) {
      this.see();
    }
  },

  startEnter(number, toggleModal) {
    // var number = parseInt(document.getElementById('input').value);
    console.log(number);
    this.paste(number, toggleModal);
  },

  defaultPaste() {
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(atom.clipboard.read());
    }
  },

  see(number) {
    console.log('MyPackage was toggled!');

    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
      // this.startEnter(number);
    } else {
      this.modalPanel.show();
      this.myPackageView.focusWindow();
      // this.myPackageView.resetInput();
    }
  },


  // toggle() {
  //   let editor
  //   if (editor = atom.workspace.getActiveTextEditor()) {
  //     let selection = editor.getSelectedText()
  //     let reversed = selection.split('').reverse().join('')
  //     if(selection.includes('toggle') || selection.includes('atom')) {
  //       editor.insertText('yuess');
  //     }
  //     // editor.insertText(reversed)
  //   }
  // }

};
