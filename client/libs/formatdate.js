import moment from 'moment'


moment.updateLocale('en', {
  relativeTime : {
    future: "%s later",
    past:   "%s ago",
    s  : 'a few seconds',
    ss : '%d seconds',
    m:  "a minute",
    mm: "%d minutes",
    h:  "an hour",
    hh: "%d hours",
    d:  "a day",
    dd: "%d days",
    M:  "a month",
    MM: "%d months",
    y:  "a year",
    yy: "%d years"
  }
})

export const formatdate = function (value) {
  let type = typeof value

  if (Array.isArray(value)) {
    if (value.length) {
      // format value as YYYYMMDD
      let date = value.join('')
      return getDateString(date)
    } else {
      return "No due date"
    }
  } else {
    if (type === 'string') {
      return getDateString(value)
    } else if (type === 'object') {
      return "No due date"
    }
  }
}

const getDateString = function (date) {
  let now = moment().startOf('date')
  let diff = moment(date).diff(now, 'days')

  let md = moment(date).format('MMM D') // month + day, eg., Feb 2

  if ( diff > 7 || diff < -1 ) {
    return moment(date).startOf('day').fromNow() + ', ' + md
  } else if (diff === 0) {
    return 'Today, ' + md
  } else if (diff === -1) {
    return 'Yesterday, ' + md
  } else if (diff === 1) {
    return 'Tomorrow, ' + md
  }  else {
    return moment(date).format('ddd') + ', ' + md
  }
}

export const formatshortdate = function (value) {
  let type = typeof value

  if (Array.isArray(value)) {
    if (value.length) {
      // format value as YYYYMMDD
      let date = value.join('')

      return getShortDateString(date)
    } else {
      return ""
    }
  } else {
    if (type === 'string'){
      return getShortDateString(value)
    }
  }
}

const getShortDateString = function (date) {
  let now = moment().startOf('date')
  let diff = moment(date).diff(now, 'days')

  let md = moment(date).format('MMM D')

  switch (diff) {
    case 0:
      return 'Today'
      break;
    case -1:
      return 'Yesterday'
      break;
    case 1:
      return 'Tomorrow'
      break;
    default:
      return md
  }
}

export const isexpired = function (value) {
  let type = typeof value

  if (type === 'array') {
    if (value.length) {
      // format value as YYYYMMDD
      let date = value.join('')

      return checkExpiry(date)
    } else {
      return false
    }
  } else if (type === 'string') {
    return checkExpiry(value)
  }
}

const checkExpiry = function (date) {
  let now = moment().startOf('date')
  let diff = moment(date).diff(now, 'days')

  if (diff < 0) {
    return true
  } else {
    return false
  }
}
