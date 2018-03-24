## Web Share API

Adding something like this to a Web Manifest should enable Webmarks to receive
shares on Android (currently Chrome Canary/Dev):

```json
{
  "share_target": "/bookmarks/new/?url={url}&title={title}&description={description}"
}
