'use babel';


import MyPackageView from './my-package-view';
import {
  CompositeDisposable
} from 'atom';
var copy;
var copyNum = 0;
var lastCopy = "";
var copyArray = [];

export default {
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
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package:copy': () => this.copy(),
      'my-package:paste': () => this.paste(),
      'my-package:toggle': () => this.see()
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

  copy() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      copy = selection;
    }
    if (copy !== lastCopy) {
      lastCopy = copy;
      copyNum += +1;
      this.myPackageView.setCopy(copy, copyNum);
    }
  },

  paste() {
    let editor;

    console.log('MyPackage was toggled!');
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(copy)
    }

  },

  see() {
    console.log('MyPackage was toggled!');

    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();
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
