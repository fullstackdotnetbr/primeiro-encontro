import $ from 'jquery'
import _ from 'lodash'
import feedback from '../../templates/feedback.hbs'
import usuarios from '../../templates/usuarios.hbs'

export default () => {
    $.get('/api/usuario')
        .then((res) => {
            $('#usuarios').append(usuarios({ usuarios: res }))
            $('select').material_select()
        })
    $('#dar-feedback').click(() => {
        $.ajax({
        	data: JSON.stringify({ id: $('#usuarios').val(), texto: $('#feedback').val() }),
        	url: '/api/feedback',
        	method:'POST',
        	contentType: "application/json",
        })
        .then((res) => {
          $('#feedbacks').append(feedback(res))
        })
    })
}
