# create-vue

## Project Setup

```sh
npm install
```

### Change config file

src/const/const.js

```sh

const m_config = {
  dev: {
    API_URL: "http://localhost:3000/",
    DOWNLOAD_URL: "http://localhost:3000/downloads/",
  },
  // please your server address
  sever: {
    API_URL: "http://xxx.xxx.xxx.xx:3000/",
    DOWNLOAD_URL: "http://xxx.xxx.xxx.xx:3000/downloads/",
  },
};
export default m_config.dev;
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Change package.json file for default hosting service

```sh
"dev-client": "vite --host xx.xx.xx.xx:3000",
```

Then

```sh
npm run dev-client
```
