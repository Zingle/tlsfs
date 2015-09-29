tlsfs
=====
Small utility functions for loading TLS certs from the filesystem.  Output is
compatible with tls/https server options.

Example
-------
```js
var https = require("https"),
    tlsfs = require("tlsfs"),
    tlsopts = tlsfs.readCertsSync([
        "/etc/ssl/private/example.com.crt",
        "/etc/ssl/private/example.com.key",
        "/etc/ssl/private/example.com.ca"
    ]);

https.createServer(tlsopts, function() {}).listen(443, "example.com");
```

API
---
### readCertsSync(array)
Return a TLS options object based on the number of paths provided.  If one path
is provided, the 'pfx' option will be set.  Two paths will set the 'cert' and
'key' options.  Additional paths will be added to the 'ca' array.

### readCerts(array, function)
Read paths and pass TLS options object to callback based on the number of paths
provided.  If one path is provided, the 'pfx' option will be set.  Two paths
will set the 'cert' and 'key' options.  Additional paths will be added to the
'ca' array.
