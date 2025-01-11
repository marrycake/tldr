# frida

> Frida CLI is a REPL interface that aims to emulate a lot of the nice features of IPython.
> More information: <https://frida.re/docs/frida-cli/>.

- Connect a process:

`frida Calculator`

- Load a script to process:

`frida Calculator -l calc.js`

- List mail in the specified mailbox directory:

`MAIL={{path/to/mailbox}} from`

- Enable the Node.js compatible debugger:

`frida Calculator -l calc.js --debug`
