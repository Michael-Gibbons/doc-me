# doc-me
A simple CLI tool to open documentation links defined in a json file.

#USAGE

`npm i @michael.gibbons/doc-me`

In your package.json, create a `doc` property as an array of key value pairs of the URLs you would like to reference. Like so.

```js

  ...
  "doc": [
    {
      "name":"google",
      "value": "https://google.com"
    },
    {
      "name": "youtube",
      "value": "https://youtube.com"
    }
  ]

```

Then run `npx doc` when you would like to reference your urls.