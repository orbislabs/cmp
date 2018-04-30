# Technical Documentation for CMP++
An IAB compliant CMP, with user privacy preserving features.

### Install

You can install simply by running the following commands:
```bash
git clone
cd
npm install
```

And then run for a development setup:

```bash
npm run dev # terminal tab 1
nodemon server.js # terminal tab 2
```

### The Flow Logic

![cmp-flow-logic](../docs/images/control-flow.svg)

### Minimal Required API

```javascript
showConsentTool() // returns bool
getVendorConsents([vendor_array], callback) // returns permissions for vendor list
getConsentData(null, callback) // returns a base64 encoded cookie value
ping(null, callback) // is cmp loaded? is gdpr global?
```

### App Architecture
![app-architecture](../docs/images/cmp-comps.svg)
