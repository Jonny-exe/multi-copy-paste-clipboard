'use babel';


import MyPackageView from './my-package-view';
import {
  CompositeDisposable
} from 'atom';
var copy;

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
      'my-package:toggle': () => this.cange(),
      'my-package:paste': () => this.paste(),
      'my-package:see': () => this.see()
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

  getLocation() {
    this.element = document.createElement('div');
    this.element.classList.add('my-package2');
    const message = document.createElement('div');
    message.textContent = 'Heyyyy';

    message.classList.add('message');
    this.element.appendChild(message);
  },

  copy() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      copy = selection;
    }
  },

  paste() {
    let editor;

    console.log('MyPackage was toggled!');
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      // const message = document.createElement('div');
      // message.textContent = copy;
      // message.classList.add('message');
      // this.element.appendChild(message);
      // editor.insertText(reversed);
      editor.insertText(copy)
    }

  },

  see() {
    console.log('MyPackage was toggled!');
    this.myPackageView.getLocation(copy);

    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();
      this.element = document.createElement('div');
      if (editor = atom.workspace.getActiveTextEditor()) {

        this.MyPackageView.getLocation(copy);

      }
    }
  },

  cange() {
    const message = document.createElement('div');
    this.element = document.createElement('div');
    this.element.classList.add('my-package2');
    message.textContent = copy;
    message.classList.add('message');
    this.element.appendChild(message);
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();
    }
  }

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
