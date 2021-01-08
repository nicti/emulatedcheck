# EmulatedCheck

## Installation

To use EmulatedCheck on your system, run:

```bash
yarn global add emulatedcheck
```

## Usage

To use EmulatedCheck, you can run the following:

```bash
emualtedcheck check --url <url> --selector <selector> [--count <count>] [--user-agent <user-agent>] [-v|-vv]
```

### Parameters

| Parameter        | Info           | Required  | Default |
| ------------- |:-------------:| -----:|-|
| url      | URL to check | true |
| selector | Javascript selector to search for | true | |
| count | minimal occurence of selector to pass the check | false | 1 |
| user-agent | User-Agent to use for requests | false | Puppeteer default useragent |

### Return values

|Return value|Meaning|
|-|-|
|0|Check passed|
|2|Check did not pass|

These return values are designed to be used for nagios plugins.