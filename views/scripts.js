
console.log('asd')
console.log($("#requestStatusSelect"))
$(function () {

    $("#requestStatusSelect").on(
        "change",
        function (e) {
            let resourceId = this.getAttribute('data-res-id')

            $.post("changeStatus/"+resourceId, { status: this.value } );
        }
    );
});