module.exports = ({ test, describe, exports, code, $ }) => {
  const testMethod = (name, values) => test.against(name,
    (...args) => String.prototype[name].call(...args), values)

  const testStrings = [
    '',
    's',
    'a',
    'l',
    'u',
    't',
    'x',
    'saalutsaluut',
    'alut',
    'lut',
    'luu',
    'ut',
    'saalu',
    'saal',
    'saa',
    'aalu',
    'lu',
    'aal',
  ]

  const replaceStrings = [
    [ '', 'a', '0' ],
    [ 'abcdef', 'a', '0' ],
    [ 'efgabc', 'a', '0' ],
    [ 'abcabc', 'a', '0' ],
    [ 'abcabc', 'abc', 'xzf' ],
    [ 'efgabcabc', 'abc', 'xzf' ],
    [ 'efgabefgcabc', 'abc', 'xzf' ],
    [ 'efgabefgcabcefg', 'abc', 'xzf' ],
    [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'o', '0' ],
    [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'o', '00' ],
    [ 'Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.', 'lo', '10' ],
    [ 'Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.', 'lo', '_' ],
  ]

  const types = [
    [ '' ],
    [ 'salut' ],
    [ 0 ],
    [ null ],
    [ undefined ],
    [ NaN ],
    [ {} ],
    [ [] ],
  ]

  const padStrings = [
    [ '', 1 ],
    [ 'a', 1 ],
    [ 'abc', 1 ],
    [ '', 10 ],
    [ 'a', 10 ],
    [ 'ab', 10 ],
    [ 'abc', 10 ],
    [ '', 100 ],
    [ 'a', 100 ],
    [ 'ab', 100 ],
    [ 'abc', 100 ],
    [ '', 1, '.' ],
    [ 'a', 1, '.' ],
    [ 'ab', 1, '.' ],
    [ 'abc', 1, '.' ],
    [ '', 10, '0' ],
    [ 'a', 10, '0' ],
    [ 'ab', 10, '0' ],
    [ 'abc', 10, '0' ],
    [ '', 100, '_' ],
    [ 'a', 100, '_' ],
    [ 'ab', 100, '_' ],
    [ 'abc', 100, '_' ],
  ]

  const stringParts = testStrings.map(str => [ 'saalutsaluut', str ])

  return [
    describe('cheating', [
        'require',
      ].map(key => test(`${key} should not be used`)
        .value($(`#${key}`).length).equal(0))
      .concat([
        'includes',
        'indexOf',
        'lastIndexOf',
        'padEnd',
        'padStart',
        'repeat',
        'replaceAll',
        'slice',
        'trim',
        'substr',
        'substring',
        'split',
      ].map(key => test(`method ${key} should not be used, code your own !`)
        .value($(`CallExpression > MemberExpression > #${key}`).length)
        .equal(0)))
      .concat([
        'length'
      ].map(key => test(`property ${key} should not be used, code your own`)
        .value($(`MemberExpression > #${key}`).length)
        .equal(0)))),

    describe('hello world', [
      test.defined('hw'),
      test.type('hw', Function),
      test('should take 0 argument')
        .value(exports.hw)
        .map('length')
        .equal(0),

      test("should return the string 'Hello, World!'")
        .value(exports.hw)
        .map(fn => fn())
        .equal('Hello, World!'),
    ]),

    test.against('isNumber',
      n => (+[]).constructor === (n == null || n.constructor), types),

    test.against('isString',
      str => (![]+[]).constructor === (str == null || str.constructor), types),

    testMethod('repeat', stringParts.map((str, i) => [ str[0], i ])),
    test.against('length', a => a.length, testStrings.map(str => [ str ])),
    testMethod('indexOf', stringParts),
    testMethod('lastIndexOf', stringParts),
    testMethod('includes', stringParts),
    test.against('isWhiteSpace', c => /\s/.test(c), [
      [ ' ' ],
      [ '\t' ],
      [ '\r' ],
      [ '\n' ],
      [ '\f' ],
    ]),
    testMethod('padEnd', padStrings),
    testMethod('padStart', padStrings),
    testMethod('replace', replaceStrings),
    test.limit(990000),
    test.against('replaceAll',
      (str, a, b) => str.split(a).join(b), replaceStrings),

    testMethod('slice', [
      [ 0 ],
      [ 1 ],
      [ 2 ],
      [ 3 ],
      [ 100 ],
      [ 0, 1 ],
      [ 0, 4 ],
      [ 0, 10 ],
      [ 0, 100 ],
      [ -2, 5 ],
      [ 2, -5 ],
      [ 2, 5 ],
      [ -2, -5 ],
      [ -2 ],
    ].map(arr => [ 'saalutsaluut' ].concat(arr))),

    testMethod('trim', [
      [ 'salut' ],
      [ 'sa  lut' ],
      [ 'salut  ' ],
      [ 'sa  lut  ' ],
      [ '  salut' ],
      [ '  sa  lut' ],
      [ '  sa  lut  ' ],
    ]),

    test.against('before', (a, b) => {
      const index = a.indexOf(b)
      return index === -1 ? '' : a.slice(0, index)
    }, stringParts),

    test.against('after', (a, b) => {
      const index = a.indexOf(b)
      return index === -1 ? '' : a.slice(index)
    }, stringParts),

    test.against('capitalize', str => str
      ? str[0].toUpperCase() + str.slice(1)
      : '', [
      [ 'wow' ],
      [ 'woW' ],
      [ 'WOW' ],
      [ '1wow' ],
      [ '' ],
    ])
    //*/
  ]
}
