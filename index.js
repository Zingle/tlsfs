var fs = require("fs"),
    async = require("async");

/**
 * Read TLS certs from filesystem synchronously.  Return TLS options object
 * with 'pfx' or 'cert', 'key', and 'ca' options, depending on the number of
 * paths provided.
 * @param {string[]} paths
 * @returns {object}
 */
function readCertsSync(paths) {
    var opts = {};

    if (!(paths instanceof Array))
        throw new TypeError("readCertsSync expects Array argument");

    switch (paths.length) {
        case 1:
            opts.pfx = fs.readFileSync(paths[0]);
            break;
        case 2:
            opts.cert = fs.readFileSync(paths[0]);
            opts.key = fs.readFileSync(paths[1]);
            break;
        default:
            opts.cert = fs.readFileSync(paths[0]);
            opts.key = fs.readFileSync(paths[1]);
            opts.ca = [];
            paths.slice(2).forEach(function(path) {
                opts.ca.push(fs.readFileSync(path));
            });
    }

    return opts;
}

/**
 * Read TLS certs from filesystem.  Pass TLS options object to callback with
 * 'pfx' or 'cert', 'key', and 'ca' options, depending on the number of paths
 * provided.
 * @param {string[]} paths
 * @param {function} done
 */
function readCerts(paths, done) {
    if (!(paths instanceof Array))
        throw new TypeError("readCertsSync expects Array argument");

    async.map(paths, fs.readFile, function(err, files) {
        var opts = {};

        if (err) done(err);
        else switch (files.length) {
            case 1:
                opts.pfx = files[0];
                break;
            case 2:
                opts.cert = files[0];
                opts.key = files[1];
                break;
            default:
                opts.cert = files[0];
                opts.key = files[1];
                opts.ca = files.slice(2);
        }

        done(null, opts);
    });
}

/** export functions */
module.exports = {
    readCerts: readCerts,
    readCertsSync: readCertsSync
}
