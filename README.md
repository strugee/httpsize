# HTTPS-ize

## About

Automatically scan through a directory tree, looking for HTTP links that can be converted into HTTPS.

Conversion is done based upon the [HTTPS Everywhere][1] ruleset.

## Usage

_**WARNING:**_ `loadRules()` makes a call to `nodegit`'s `Remote.url()` method which is _synchronous_!

## License

GPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: https://github.com/EFForg/HTTPS-Everywhere
