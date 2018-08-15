// export default {
// var myUnits;
var myUnits = {
    formatDate : function (val) {
        var dates = new Date(val)
        var newDate = dates.getFullYear() + '-' + ((dates.getMonth() + 1) >= 10 ? (dates.getMonth() + 1) : '0' + (dates.getMonth() + 1)) + '-' + (dates.getDate() >= 10 ? dates.getDate() : '0' + dates.getDate()) + ' ' + (dates.getHours() >= 10 ? dates.getHours() : '0' + dates.getHours()) + ':' + (dates.getMinutes() >= 10 ? dates.getMinutes() : '0' + dates.getMinutes()) + ':' + (dates.getSeconds() >= 10 ? dates.getSeconds() : '0' + dates.getSeconds());
        return newDate;
    }

}
// }

module.exports = myUnits;