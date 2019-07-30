import {
  regHttp,
  validJson,
  deepClone,
  isFloat,
  wordsEqual,
  getValue,
  validate,
  compareDate,
} from '../app/utils/utils'

test('regHttp function', () => {
  expect(regHttp.test('http://www.example.com')).toBe(true)
  expect(regHttp.test('htp://www.example.com')).toBe(false)
})

test('validJson function', () => {
  expect(validJson('some string')).toBe(false)
  expect(validJson('{ "prop": "value" }')).toBe(true)
})

test('deepClone function', () => {
  expect(deepClone({ prop: 'value' })).toStrictEqual({ prop: 'value' })
})

test('isFloat function', () => {
  expect(isFloat(0)).toBe(false)
  expect(isFloat(0.1)).toBe(true)
})

test('wordsEqual function', () => {
  expect(wordsEqual('str', 'STR')).toBe(true)
  expect(wordsEqual('strs', 'STR')).toBe(false)
})

test('wordsEqual function', () => {
  const objA = {
    foo: 'bar'
  }
  const objB = {
    foo: {
      bar: true,
    }
  }
  expect(getValue(objA, ['foo', 'bar'])).toBe(false)
  expect(getValue(objB, ['foo', 'bar'])).toBe(true)
})

test('validation methods', () => {
  const {
    strContent,
    password,
  } = validate
  const strArgusA = {
    val: '',
    strMin: 5,
    strMax: 10,
    prop: 'prop',
  }
  const strArgusB = deepClone(strArgusA)
  strArgusB.val = 'str'
  const strArgusC = deepClone(strArgusA)
  strArgusC.val = 'ThisIsOk'
  expect(strContent(strArgusA)).toBe('prop is required')
  expect(strContent(strArgusB))
    .toBe(`prop should be more than ${strArgusB.strMin} and less than ${strArgusB.strMax} characters`)
  expect(strContent(strArgusC)).toBe('')

  const pwA = ''
  const pwB = 'no number'
  const pwC = 100000
  const pwTipEmpty = 'Password should be String format, mixed with Alpha and Number'
  const pwTipLen = `Password should be 8-16 characters`
  expect(password(pwA)).toBe(pwTipEmpty)
  expect(password(pwB)).toBe(pwTipEmpty)
  expect(password(pwC)).toBe(pwTipEmpty)
  expect(password(null)).toBe(pwTipEmpty)
  expect(password('string0')).toBe(pwTipLen)
  expect(password('string0with')).toBe('')
})

test('compareDate function', () => {
  const dateA = '2019-07-30T06:00:00'
  const dateB = '2019-07-30T06:00:30'
  expect(compareDate(dateA, dateB)).toBe('30 secs ago')
})
