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
      'multi-copy-paste:copy': () => this.copy(),
      'multi-copy-paste:paste': () => this.paste(1),
      'multi-copy-paste:toggle': () => this.see(),
      'multi-copy-paste:paste-1': () => this.paste(1)

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
      copyArray.reverse();
      copyArray.push(copy);
      copyArray.reverse();
      lastCopy = copy;
      copyNum += +1;
      if (10 < copyArray.length) {
        copyArray = copyArray.slice(0, 10);
      }

      this.myPackageView.setCopy(copy, copyNum, copyArray);
    }
  },

  paste(number) {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(copyArray[number - 1]);
    }

  },


  startEnter() {
    var number = parseInt(document.getElementById('input').value);
    console.log(number);
    this.paste(number);
  },

  see() {
    console.log('MyPackage was toggled!');

    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
      this.startEnter();
    } else {
      this.modalPanel.show();
      this.myPackageView.resetInput();
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
