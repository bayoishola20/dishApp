$(document).ready(function(){
    //delete recipe
    $('.delete-dish').on('click', function(){
        var id = $(this).data('id');
        var name = $(this).data('name');
        var url = '/delete/'+ id;
        if(confirm("You are about to delete: " + name.toUpperCase())) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting dish...');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    });

    //edit recipe
    $('.edit-dish').on('click', function(){
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-name').val($(this).data('name'));
        $('#edit-form-ingredients').val($(this).data('ingredients'));
        $('#edit-form-directions').val($(this).data('directions'));
        $('#edit-form-time').val($(this).data('time'));
    });
});