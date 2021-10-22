import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (date) => {
    if(!date) {
        return ''
    }
    else
    {
    return moment(date).format('LLL')
    }
})