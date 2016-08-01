# HTTPS-ize

## About

Automatically scan through a directory tree, looking for HTTP links that can be converted into HTTPS.

Conversion is done based upon the [HTTPS Everywhere][1] ruleset.

## Usage

```
// TODO sample code here
```

### `loadRules([dir,] cb)`

Load rulesets into memory.

Parameters:

* `dir` (`String`; optional) directory to load rules from. Defaults to `HTTPSize/repo/src/chrome/content/rules` in the user's (OS-dependent) cache directory (in other words: the ruleset location in the HTTPS Everywhere repository appended to the default directory for `updateRules()`).
* `cb` (`Function`) callback function that will be called upon operation completion. If there was an error, it will be passed to the function as the first argument. If loading was successful, the ruleset will be passed to the function as the second argument.

### `updateRules([dir,] cb)`

Convenience function to download the official HTTPS Everywhere repository, which contains the primary ruleset.

Parameters:

* `dir` (`String`; optional) directory to download repository to. Defaults to `HTTPSize/repo` in the user's (OS-dependent) cache directory.
* `cb` (`Function`) callback function that will be called upon operation completion. If there was an error, it will be passed to the function as the first argument.

_**WARNING:**_ `updateRules()` makes a call to `nodegit`'s `Remote.url()` method which is _synchronous_!

## License

GPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: https://github.com/EFForg/HTTPS-Everywhere
