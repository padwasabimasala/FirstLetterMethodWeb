# First Letter Method Web

Practice Bible memorization with the first letter method

Try it at [https://first-letter-swiper.bible-memory-club.workers.dev/flm/matthew/5/1]

## Collecting the Bible text

https://biblenow.net/en/bible/new-living-translation/new-testament/matthew/7

Remove blank lines, fancy quote, ex
:g/^\s*$/d
:%s/“//g
Quote numbers and end of lines and remove leading space
:%s/\([0-9]\+\)/"\1":"/g
:%s/$/",/g
:%s/" /"/g

## Built with Redwood SDK and hosted on Cloudflare

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
