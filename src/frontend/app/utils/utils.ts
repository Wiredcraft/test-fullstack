const cookies = require('./cookies')
const _ = require('./underscore')

export const regHttp = /^(http|https)/i

export const validJson = (str: string) => {
  try {
    JSON.parse(str);
  }
  catch (e) {
    return false;
  }
  return true;
}

export const deepClone = (obj: object) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isFloat = (n: number) => {
  return Number(n) === n && n % 1 !== 0
}

export const wordsEqual = (wordA: string, wordB: string) => {
  return wordA.toUpperCase() === wordB.toUpperCase()
}

export const getValue = (obj: any, route: any) => {

  if (!Array.isArray(route) || !route.length) return false

  let returnValue = null

  route.forEach((item: any, itemKey: any) => {

    if (_.isObject(obj) && _.has(obj, item)) {
      obj = obj[item]
      returnValue = obj
    }
    else {
      obj = false
      returnValue = false
    }

  })

  return returnValue

}

export const validate = {

  strContent: (params: any) => {
    const {
      val,
      strMin,
      strMax,
      prop,
    } = params
    let errMSg: string = ''
    const nameLen = val.length
    const nameLenMin = strMin
    const nameLenMax = strMax
    const msgRequired = `${prop} is required`
    const msgInvalid = `${prop} should be more than ${nameLenMin} and less than ${nameLenMax} characters`

    if (_.isUndefined(val) || _.isNull(val) || val === '') {
      errMSg = msgRequired
    }

    if (!errMSg && !isNaN(Number(val))) {
      errMSg = `${prop} should contain string character`
    }

    if (!errMSg && !_.isNumber(nameLen)) {
      errMSg = msgInvalid
    }

    if (!errMSg && (nameLen < nameLenMin || nameLen > nameLenMax)) {
      errMSg = msgInvalid
    }

    return errMSg
  },

  password: (password: any) => {
    let errMSg: string = ''
    const passLenMin = 8
    const passLenMax = 16
    const passPattern = /^[a-zA-Z0-9!@#$%&*_+=.]*$/
    const gotAlpha = /[a-z]/i
    const gotNumber = /[0-9]/
    const msgPass = 'Password should be String format, mixed with Alpha and Number'
    const msgPassLen = `Password should be ${passLenMin}-${passLenMax} characters`
    const masPassAllowed = 'Allowed special characters in password: ! @ # $ % & * _ + = .'
    const pw = password
    const hasAlpha = gotAlpha.test(pw)
    const hasNum = gotNumber.test(pw)

    if (!pw || !_.isString(pw) || pw.trim() === '' || !hasAlpha || !hasNum) {
      errMSg = msgPass
    }

    if (!errMSg && (password.length < passLenMin || password.length > passLenMax)) {
      errMSg = msgPassLen
    }

    if (!errMSg && !passPattern.test(password)) {
      errMSg = masPassAllowed
    }

    return errMSg
  },

}

export const compareDate = (tEarlier: any, tLater: any) => {
  if (_.isUndefined(tEarlier) || !tEarlier) return false;
  if (_.isUndefined(tLater) || !tLater) return false;
  const microSecs = 1000;
  const minSecs = 60
  const hourSecs = minSecs * minSecs
  const daySecs = hourSecs * 24

  const tDivides: any = {
    day: {
      min: daySecs,
      max: Infinity,
      per: daySecs,
      label: (days: any) => {
        return `day${days > 1 ? 's' : ''}`
      }
    },
    hour: {
      min: hourSecs,
      max: daySecs,
      per: hourSecs,
      label: (hours: any) => {
        return `hour${hours > 1 ? 's' : ''}`
      }
    },
    min: {
      min: minSecs,
      max: hourSecs,
      per: minSecs,
      label: (mins: any) => {
        return `min${mins > 1 ? 's' : ''}`
      }
    },
    sec: {
      min: 0,
      max: minSecs,
      per: null,
      label: (secs: any) => {
        return `sec${secs > 1 ? 's' : ''}`
      }
    }
  }

  const nextSigns: any = {
    day: {
      divider: daySecs,
      division: hourSecs,
      nextLabel: 'hr',
    },
    hour: {
      divider: hourSecs,
      division: minSecs,
      nextLabel: 'min',
    },
    min: {
      divider: minSecs,
      division: null,
      nextLabel: 'sec',
    }
  }

  const moreCell = (divSign: string, pNumber: number, days: number) => {
    // console.log('more cell: ', divSign, number)
    if (divSign === 'day' && days && days >= 100) return ''
    let tDivide = null
    const hasProp = nextSigns.hasOwnProperty(divSign)
    if (!hasProp) return ''
    if (hasProp) {
      tDivide = nextSigns[divSign]
      let tNumber
      if (pNumber >= tDivide.divider) {
        tNumber = pNumber % tDivide.divider
        if (tDivide.division) {
          tNumber = (tNumber >= tDivide.division) ? Math.floor(tNumber / tDivide.division) : 0
        }
      }
      else {
        tNumber = pNumber
      }
      return `${tNumber} ${tDivide.nextLabel}${tNumber > 1 ? 's' : ''}`
    }
    return ''
  }
  const earlierDate = new Date(tEarlier)
  const laterDate = new Date(tLater)
  const timeDiff = laterDate.getTime() - earlierDate.getTime()
  const timeDiffToSecs = Math.floor(timeDiff / microSecs)
  const labelJust = 'Just now'
  const labelAgo = 'ago'

  let nDivide = null
  let tAmount: any
  let tLabel = null
  let currentKey: any
  let labelComp = null

  Object.keys(tDivides).forEach((objkey) => {
    nDivide = tDivides[objkey]

    if (timeDiffToSecs > nDivide.min && timeDiffToSecs < nDivide.max) {
      tAmount = (objkey === 'sec') ? timeDiffToSecs : Math.floor(timeDiffToSecs / nDivide.per)
      if (tAmount % 1 !== 0) {
        tAmount = Math.floor(tAmount)
      }
      currentKey = objkey
      tLabel = nDivide.label(tAmount)
    }
  })

  labelComp = (tAmount === 0 || !tAmount) ? labelJust : `${tAmount} ${tLabel}`

  const nextTimeSign = moreCell(currentKey, timeDiffToSecs, tAmount)

  if (labelComp !== labelJust && nextTimeSign) {
    labelComp = `${labelComp} ${nextTimeSign}`
  }

  if (labelComp !== labelJust) {
    labelComp += ' ' + labelAgo
  }

  // console.log(tAmount, timeDiffToSecs, tLabel, nextTimeSign, labelComp)
  return labelComp
}

export const handleUserCookies = (action: string, data?: any) => {
  const actions: any = {
    set: cookies.set,
    get: cookies.getJSON,
    remove: cookies.remove,
  };
  const actionsKeys = _.keys(actions);
  action = action.toLowerCase();
  if (!_.includes(actionsKeys, action)) return false;
  const ckAction = actions[action];
  if (action === 'set')  return ckAction('userInfo', data);
  return ckAction('userInfo');
}
