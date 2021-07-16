export default function ValidateString(string) {
    let result = "";
    if (string.match(/&quot;/)) {
        result = string.replaceAll(/&quot;/g, '"');
    }
    if (string.match(/&quote;/)) {
        result = string.replaceAll(/&quote;/g, '"');
    }
    if (string.match(/&#039/)) {
        result = string.replaceAll(/&#039;/g, "'");
    }
    if (string.match(/&oacute/)) {
        result = string.replaceAll(/&oacute;/g, "ó");
    }
    if (string.match(/&lrm;/)) {
        result = string.replaceAll(/&lrm;/g, "-");
    }
    if (string.match(/&rsquo;/)) {
        result = string.replaceAll(/&rsquo;/g, "'");
    }
    if (string.match(/&amp;/)) {
        result = string.replaceAll(/&amp;/g, "&");
    }
    if (string.match(/&shy;/)) {
        result = string.replaceAll(/&shy;/g, "-");
    }
    if (string.match(/&Eacute;/)) {
        result = string.replaceAll(/&Eacute;/g, "É");
    }
    if (string.match(/&ldquo;/)) {
        result = string.replaceAll(/&ldquo;/g, '"');
    }
    if (string.match(/&rdquo;/)) {
        result = string.replaceAll(/&rdquo;/g, '"');
    }
    if (string.match(/&#039;/)) {
        result = string.replaceAll(/&#039;/g, "'");
    }
    if (string.match(/&hellip;/)) {
        result = string.replaceAll(/&hellip;/g, "___");
    }
    return result ? result : string;
}