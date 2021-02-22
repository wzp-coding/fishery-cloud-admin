export default function (date) {
    if (!date) return ''
    date = date.toString()
    const d = new Date(date)
    const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
    return times
}