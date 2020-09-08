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
      'my-package:paste': () => this.paste(1),
      'my-package:toggle': () => this.see(),
      'my-package:paste-1': () => this.paste(1),
      'my-package:paste-2': () => this.paste(2),
      'my-package:paste-3': () => this.paste(3),
      'my-package:paste-4': () => this.paste(4),
      'my-package:paste-5': () => this.paste(5),
      'my-package:paste-6': () => this.paste(6),
      'my-package:paste-7': () => this.paste(7),
      'my-package:paste-8': () => this.paste(8),
      'my-package:paste-9': () => this.paste(9),
      'my-package:paste-10': () => this.paste(10)
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
