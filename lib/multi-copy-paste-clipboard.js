'use babel';


import MyPackageView from './multi-copy-paste-clipboard-view';
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
      'multi-copy-paste:toggle': () => this.see(),
      'multi-copy-paste:paste-0': () => this.startEnter(0),
      'multi-copy-paste:paste-1': () => this.startEnter(1),
      'multi-copy-paste:paste-2': () => this.startEnter(2),
      'multi-copy-paste:paste-3': () => this.startEnter(3),
      'multi-copy-paste:paste-4': () => this.startEnter(4),
      'multi-copy-paste:paste-5': () => this.startEnter(5),
      'multi-copy-paste:paste-6': () => this.startEnter(6),
      'multi-copy-paste:paste-7': () => this.startEnter(7),
      'multi-copy-paste:paste-8': () => this.startEnter(8),
      'multi-copy-paste:paste-9': () => this.startEnter(9)
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
      editor.insertText(copyArray[number]);
    }

  },


  startEnter(number) {
    // var number = parseInt(document.getElementById('input').value);
    console.log(number);
    this.paste(number);
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
