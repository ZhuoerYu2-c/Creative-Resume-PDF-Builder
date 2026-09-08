# Sanitized Template Release

This release updates the template from the current bilingual resume and portfolio implementation.

- Personal identity, contact details, education, employment, awards, publications, and project results have been replaced with fictional examples.
- Original photographs, company/university logos, laboratory screenshots, PCB images, and documents are excluded. Only generic SVG assets are included.
- Production IP addresses, domains, filing numbers, SSH aliases, Jupyter paths, deployment scripts, and server configuration are excluded.
- Dependency folders, build output, PDFs, browser captures, notebook checkpoints, historical backups, and environment files are excluded.
- The original private working project and running services are not changed by this release.

Before publishing a customized fork, inspect both languages, HTML fallback content, PDF filenames, image metadata, links, and Git history. Data modules are public browser code; never place credentials in them.

This release does not rewrite pre-existing repository history. Review previous commits separately if sensitive material was published before.

## Release checks

- Fresh dependency installation (`npm ci`) and production build succeeded.
- Both resume routes rendered two pages without vertical page overflow.
- Both portfolio routes rendered three example project cards without broken images.
- Project dialog and theme switch were exercised in a browser.
- Both language versions were exported using the actual PDF button. PDF pages were rendered for visual review.
- Generic SVG assets specify dimensions so that the PDF canvas renderer includes the avatar and logos correctly.
- The dependency lockfile uses the public npm registry, with no internal registry URLs.
