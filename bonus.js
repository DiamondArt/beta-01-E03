const lodash = require('lodash')

const testLoop = ($, test, name, stmt) => test(`${name} is not used`)
  .value($(stmt).length)
  .equal(0, `Use recursion instead of ${name}`)

const jadenTweets = [
  'three men, six options, don\'t choose.',
  'fixed habits to respond to authority takes 12 years. have fun',
  'people tell me to smile i tell them the lack of emotion in my face doesn\'t mean i\'m unhappy',
  'young jaden: here\'s the deal for every time out you give me, you\'ll give me 15 dollars for therapy when i get older.',
  'most trees are blue',
  'i watch twilight every night',
  'the moment that truth is organized it becomes a lie.',
  'dying is mainstream',
  'trees are never sad look at them every once in awhile they\'re quite beautiful.',
  'if there is bread winners, there is bread losers. but you can\'t toast what isn\'t real.',
  'jonah hill is a genius',
  'when i die. then you will realize',
  'school is the tool to brainwash the youth.',
  'we need to stop teaching the youth about the past and encourage them to change the future.',
  'you can discover everything you need to know about everything by looking at your hands',
  'all the rules in this world were made by someone no smarter than you. so make your own.',
  'when you live your whole life in a prison freedom can be so dull.',
  'how can mirrors be real if our eyes aren\'t real',
  'pay attention to the numbers in your life they are vastly important.',
  'if newborn babies could speak they would be the most intelligent beings on planet earth.',
  'i should just stop tweeting, the human conciousness must raise before i speak my juvenile philosophy.',
  'if a book store never runs out of a certain book, dose that mean that nobody reads it, or everybody reads it',
  'if everybody in the world dropped out of school we would have a much more intelligent society.',
  'water in the eyes and alcohol in the eyes are pretty much the same i know this from first hand experience.',
].map(n => [n])

module.exports = ({ describe, test, $ }) => [
  describe('BONUS', [
    test.against(`jaydenSmithCase`, str => str
      .split(' ')
      .map(lodash.capitalize)
      .join(' '), jadenTweets),
    test.against('camelCase', lodash.camelCase, jadenTweets),
    test.against('kebabCase', lodash.kebabCase, jadenTweets),
    test.against('snakeCase', lodash.snakeCase, jadenTweets),
    testLoop($, test, 'for', 'ForStatement'),
    testLoop($, test, 'for..of', 'ForOfStatement'),
    testLoop($, test, 'for..in', 'ForinStatement'),
    testLoop($, test, 'while', 'WhileStatement'),
  ]),
]
