# tslint-checkstyle-reporter
A checkstyle reporter for TSLint

## Usage

`npm install tslint-checkstyle-reporter --save-dev`

Note that due to limitations in TSLint this reporter is unable to produce valid checkstyle XML on it's own.
You will need to post-process the output to add the following lines at the beginning and end:

```xml
<?xml version='1.0' encoding='utf-8'?>
<checkstyle version='5.7'>
<!-- Output the contents of the reporter here. -->
</checkstyle>
```

The [tslint-loader](https://github.com/wbuchwalter/tslint-loader/) for Webpack provides the ability to handle this issue.