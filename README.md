<div align="center">

![PosixParser](https://github.com/Exponential-Workload/posixparser/blob/master/social.png?raw=true)

  [![📝 Documentation](https://img.shields.io/badge/📝-Documentation-blue)](https://gh.expo.moe/posixparser)
  [![📦 NPM](https://img.shields.io/npm/v/posixparser?label=📦%20NPM)](https://npmjs.com/package/posixparser)
  [![🧪 Tests](https://img.shields.io/github/actions/workflow/status/Exponential-Workload/posixparser/test.yml?branch=master&label=🧪%20Tests)](https://github.com/Exponential-Workload/posixparser/actions/workflows/test.yml)

Parse Posix-Style Arguments in JS - Rewrite of [this old gist of mine](https://gist.github.com/Exponential-Workload/abd1a5f81970cdb2bdd88f81e04e2409)

</div>

# 📦 Table of Contents
- [📦 Table of Contents](#-table-of-contents)
- [🚀 Setup](#-setup)
- [🛠️ Usage](#️-usage)
- [📜 License](#-license)

# 🚀 Setup

```sh
pnpm i posixparser
```

# 🛠️ Usage

```ts
import PosixParser, {Options as PosixOptions} from 'posixparser'

const options = new Options({
  pushQuotes: false,
  pushEscapes: false,
  pushBlankWhitespace: false,
});

const parser = new PosixParser(options); // options can also be passed as a 2nd arg to parse()

const input = `"hello world" hello hi 'hello there'`

const output = parser.parse(input);

console.log(output); // ["hello world", "hello", "hi", "hello there"]
```

# 📜 License

This project is licensed under the [📄 MIT License](./LICENSE)
