# Percent-encoding
- https://en.wikipedia.org/wiki/Percent-encoding

- URL encoding, officially known as percent-encoding
- It is a method to encode arbitrary data in URI using only ASCII char allowed within a URI.

## URI chars
- Allowed chars in URI can be either
  - Reserved
    - has special meaning in URL, e.g.
    - `/` used to separate different path of URL
    - `#` used as fragment
    - `?` used to specify query parameters
    - `:` used after http or https protocols
    - Based on RFC 3986, they are `! # $ & ' ( ) * + , / : ; = ? @ [ ]`
  - Unreserved
    - has no special meaning and allowed in URI
    - Based on RFC 3986, they are `[A-Za-z0-9_]` and `-` `.` `~`

## Percent-encoded
%XX where XX = hexadecimal of char code of the char-to-encode

```js
for (let c of ' "%-.<>\^_`{|}~') {
  let dec = c.charCodeAt(0);
  let hex = dec.toString(16);
  console.log(`${c} => dec=${dec} => hex=${hex}`);
}
// Output
// VM776:1   => dec=32 => hex=20
// VM776:1 " => dec=34 => hex=22
// VM776:1 % => dec=37 => hex=25
// VM776:1 - => dec=45 => hex=2d
// VM776:1 . => dec=46 => hex=2e
// VM776:1 < => dec=60 => hex=3c
// VM776:1 > => dec=62 => hex=3e
// VM776:1 ^ => dec=94 => hex=5e
// VM776:1 _ => dec=95 => hex=5f
// VM776:1 ` => dec=96 => hex=60
// VM776:1 { => dec=123 => hex=7b
// VM776:1 | => dec=124 => hex=7c
// VM776:1 } => dec=125 => hex=7d
// VM776:1 ~ => dec=126 => hex=7e
```

# encodeURIComponent() in JS
http://go/mdn/JavaScript/Reference/Global_Objects/encodeURIComponent
- global method in JS
- do the percent-encoding on all chars except this allowList = `A-Z a-z 0-9 - _ . ! ~ * ' ( )`

# Java equivalent
