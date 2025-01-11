# frida-trace

> Frida-trace is a tool for dynamically tracing function calls.
> More information: <https://frida.re/docs/frida-trace/>.

- Trace recv* and send* APIs in Safari, insert library names:

`frida-trace --decorate -i "recv*" -i "send*" {{library_name}}`

- Launch SnapChat on your iPhone and trace crypto API calls:

`frida-trace -U -f {{spawn_file}} -I "libcommonCrypto*"`

- Trace all JNI functions in Samsung FaceService app on Android:

`frida-trace -U -i "Java_*" com.samsung.faceservice`

- Trace a Windows process's calls to "mem*" functions in msvcrt.dll:

`frida-trace -p 1372 -i "msvcrt.dll!*mem*"`

- Trace all functions matching "*open*" in the process except in msvcrt.dll:

`frida-trace -p 1372 -i "*open*" -x "msvcrt.dll!*open*"`
