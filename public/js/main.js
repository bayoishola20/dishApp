$(document).ready(function(){
    $('.delete-dish').on('click', function(){
        var id = $(this).data('id');
        // var name = $(this).data('name');
        var url = '/delete/'+ id;
        if(confirm(`Delete Dish?`)) {
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
});