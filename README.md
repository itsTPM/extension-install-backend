# extension-install-backend

### Description
This is an extension installation server for Chrome browsers that allows you to install extensions **bypassing the Chrome Web Store**

You can check out [Vue.js frontend](https://github.com/itsTPM/extension-install-frontend) for this server

This server is used for [Foxford Tools](https://github.com/itsTPM/foxford-tools) extension

### Installation steps:
1. Clone this repository
2. Copy **build.zip** to the root of the project. This zip should contain the **manifest.json**  at least
3. (Optional) Copy your private key into the project root as **key.pem**; it will create itself if you don't copy it
4. (Optional) Rename .env.example to **.env**, and then customize the settings. Otherwise, the default settings as in .env.example will be used
5. Run `npm install`
6. Run `npm run start`
