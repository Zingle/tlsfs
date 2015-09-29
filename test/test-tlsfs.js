var expect = require("expect.js"),
    mock = require("mock-fs"),
    tlsfs = require("..");

mock({
    "tls/pfx.crt": new Buffer("pfx"),
    "tls/cert.crt": new Buffer("cert"),
    "tls/key.crt": new Buffer("key"),
    "tls/ca1.crt": new Buffer("ca1"),
    "tls/ca2.crt": new Buffer("ca2")
});

describe("readCertsSync", function() {
    it("should read one file as pfx opt", function() {
        var opts = tlsfs.readCertsSync(["tls/pfx.crt"]);
        expect(opts).to.be.an("object");
        expect(String(opts.pfx)).to.be("pfx");
        expect(opts.cert).to.be(undefined);
        expect(opts.key).to.be(undefined);
        expect(opts.ca).to.be(undefined);
    });

    it("should read two files as cert/key opts", function() {
        var opts = tlsfs.readCertsSync(["tls/cert.crt", "tls/key.crt"]);
        expect(opts).to.be.an("object");
        expect(opts.pfx).to.be(undefined);
        expect(String(opts.cert)).to.be("cert");
        expect(String(opts.key)).to.be("key");
        expect(opts.ca).to.be(undefined);        
    });

    it("should read 3+ files as cert/key/ca opts", function() {
        var opts,
            paths = ["tls/cert.crt", "tls/key.crt", "tls/ca1.crt"];

        opts = tlsfs.readCertsSync(paths);
        expect(opts).to.be.an("object");
        expect(opts.pfx).to.be(undefined);
        expect(String(opts.cert)).to.be("cert");
        expect(String(opts.key)).to.be("key");
        expect(opts.ca).to.be.an("array");
        expect(opts.ca.length).to.be(1);
        expect(String(opts.ca[0])).to.be("ca1");

        paths.push("tls/ca2.crt");
        opts = tlsfs.readCertsSync(paths);
        expect(opts).to.be.an("object");
        expect(opts.pfx).to.be(undefined);
        expect(String(opts.cert)).to.be("cert");
        expect(String(opts.key)).to.be("key");
        expect(opts.ca).to.be.an("array");
        expect(opts.ca.length).to.be(2);
        expect(String(opts.ca[0])).to.be("ca1");
        expect(String(opts.ca[1])).to.be("ca2");
    });
});
