# frida-ps

> This is a command-line tool for listing processes, which is very useful when interacting with a remote system.
> More information: <https://frida.re/docs/frida-ps/>.

- Connect Frida to an iPad over USB and list running processes:

`frida-ps -U`

- List running applications:

`frida-ps -Ua`

- List installed applications:

`frida-ps -Uai`

- Connect Frida to the specific device:

`frida-ps -D {{device_name}}`
