export default function ValidateString(string) {
    let result = "";
    if (string.match(/&quot/)) {
        result = string.replaceAll(/&quot;/g, '"');
    }
    if (string.match(/&#039/)) {
        result = string.replaceAll(/&#039;/g, "'");
    }
    if (string.match(/&oacute/)) {
        result = string.replaceAll(/&oacute;/g, "ó");
    }
    if (string.match(/&lrm/)) {
        result = string.replaceAll(/&lrm/g, "-");
    }
    if (string.match(/&rsquo/)) {
        result = string.replaceAll(/&rsquo;/g, "'");
    }
    return result ? result : string;
}