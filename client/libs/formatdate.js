import moment from 'moment'

export const formatdate = function (value) {
  // format value as YYYYMMDD
  let date = value.join('')

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
