# multi-copy-paste-clipboard package

A package for the `atom` editor to enable a clipboard for multiple copy-paste operations. It provides a list of the last 10 to 20 copies and you select one element from the copy-list for pasting.

# Keybindings
```
  Keystroke     | Command	Selector          | Source
---------------------------------------------------------------------------
  ctrl-alt-y    | multi-copy-paste:toggle   | Toggle your modal window
  ctrl-c        | multi-copy-paste:copy     | Copy
  ctrl-v        | multi-copy-paste:paste    | Auto-paste your last item
  escape, enter | multi-copy-paste:toggle   | Close your modal window without pasting
  0 to 9        | multi-copy-paste:paste    | Paste the corresponding item (0-9)
                |                           | from the buffer and close modal window
  ctrl-0 to 9   | multi-copy-paste:paste    | Paste the corresponding item (10-19)
                |                           | from the buffer and close modal window
```

# Screenshot

![A screenshot of your package](https://raw.githubusercontent.com/Jonny-exe/multi-copy-paste-clipboard/master/screenshot.gif)

# How to install

- Via the atom package manager (`apm`):
  - `apm install multi-copy-paste-clipboard`
- Or inside the `atom` editor, on the Settings page (Control-,), on the install tab.
- Or from `atom.io` website
  - https://atom.io/packages/multi-copy-paste-clipboard

# Settings
- You can customize the amount of copies you want to manage in your clipboard.
- You can customize the length of the copies displayed in your clipboard.

# Package for `atom`

![A screenshot of your package](https://raw.githubusercontent.com/zeke/atom-icon/master/old-icon/2.png)

- Go `atom`, go!
