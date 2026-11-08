# ZIP dependency review

Creative Filing bundles **fflate 0.8.3** (`esm/browser.js`, unmodified, MIT).
Source: https://registry.npmjs.org/fflate/-/fflate-0.8.3.tgz
Upstream: https://github.com/101arrowz/fflate

- npm tarball integrity: `sha512-tbZNuJrLwGUp3zshBtdy4W+ORxZuIh8a5ilyIEQDC5rY1f3U20JMry0Ll3WBzU58EZKsEuJFXhb5gwv8CsPvgA==`
- Vendored module SHA-256: `b7ca4450b19559a1d50eb381adcee94b82449674be4cd17789d9beba7e6122a1`
- License retained in `LICENSE.fflate`.
- Review: 2026-11-08 UTC. An isolated installation of this exact version and `npm audit --audit-level=low` reported zero known advisories. That is an advisory check, not a security certification.

No compatible ZIP implementation existed in Training. The selected dependency supplies synchronous streaming **Inflate** only in production. It avoids a new build pipeline, CDN, worker, native filesystem API or service. The complete upstream ESM file is retained for reproducible provenance; other exports are not used by production code. Tests use its independent ZIP writer to exercise deflate interoperability.

`archive.mjs` owns the strict ZIP framing/central-directory checks, path/member allowlist, CRC and SHA-256 checks, declared-size limits and actual output bounds. It rejects encrypted, symlink, multivolume, ZIP64, overlapping, unlisted, duplicate and unsupported members before reading payloads. Deflate input is fed in 1 KiB chunks; output callbacks enforce the declared per-member and total bounds. No extraction, HTML rendering, fetch or arbitrary imports occur. The writer uses STORE for predictably bounded output. Keep this wrapper and adversarial tests when updating the dependency; do not replace it with an unbounded `unzipSync` call.

This is an explicitly reviewed vendored runtime dependency, not a package-manager dependency; the Training lockfile is unchanged. Review parser/dependency behavior again before a production release or upgrade.
