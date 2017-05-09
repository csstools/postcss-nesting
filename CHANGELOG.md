# Changes to PostCSS Nesting

### 3.0.0 (May 8, 2017)

- Added: Node 4.x support
- Added: PostCSS 6 support
- Added: Preserved ordering
- Removed: Node 0.12 support

### 2.3.1 (March 16, 2016)

- Updated: Allow any direct nesting that follows the syntactic constraints
- Updated: PostCSS 5.0.6
- Updated: Tests
- Updated: Dependencies
- Updated: Project configuration

### 2.3.0 (February 20, 2016)

- Updated: JavaScript formatting, linting, tests, and documentation
- Updated: Properly concatenate at-rules with or expressions
- Updated: Update internal plugin name to postcss-nesting

### 2.2.0 (January 30, 2016)

- Added: Nesting of all at-rules
- Updated: Direct nesting order maintains order
- Updated: Tests and documentation

### 2.1.1 (January 3, 2016)

- Updated: Project conventions

### 2.1.0 (January 3, 2016)

- Added: Support for valid direct nesting

### 2.0.6 (October 15, 2015)

- Fixed: Issue with new PostCSS rules

### 2.0.5 (October 12, 2015)

- Updated: Nested rules source map to the parent rule
- Updated: PostCSS 5.0.9
- Updated: Tests and documentation
- Updated: Project configuration

### 2.0.4 (September 23, 2015)

- Updated: Map source raws

### 2.0.3 (September 22, 2015)

- Updated: Refactored plugin
- Updated: Tests
- Updated: PostCSS 5.0.6

### 2.0.2 (September 16, 2015)

- Fixed: Issue where the new rule’s children were not mapped to the parent internally

### 2.0.1 (September 16, 2015)

- Fixed: Issue where  a `@nest` rule followed by another bubbling at-rule would not bubble
- Added: CONTRIBUTING.md

### 2.0.0 (September 16, 2015)

- Added: Requirement of `&` per the specification
- Added: New prefix option
- Added: `@document` and `@supports` as bubbles
- Updated: Documentation

### 1.0.0 (September 15, 2015)

- Added: New `@nest` at-rule syntax
- Updated: PostCSS 5
- Removed: Old inner bracket syntax

### 0.1.0 (June 17, 2015)

- Added: Initial release
