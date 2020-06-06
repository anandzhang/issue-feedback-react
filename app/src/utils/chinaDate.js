import moment from 'moment'
import 'moment/locale/zh-cn'

const chinaDate = date => moment(date).locale('zh-cn')

export default chinaDate
