import $ from 'jquery'
import _ from 'lodash'
import dependantField from '../../templates/dependant-expense.field.hbs'
export default () => {
    $('.modal-trigger').leanModal()
    $('select').material_select()
}