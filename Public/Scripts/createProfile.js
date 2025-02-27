document.addEventListener('DOMContentLoaded', function() {
    var profilePicsInput = document.getElementById('profilePicsinput');
    var profilePics = document.getElementById('profilePics');
    var removeProfilePics = document.getElementById('removeProfilePics');

    profilePicsInput.addEventListener('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(event) {
            profilePics.src = event.target.result;
            removeProfilePics.style.display = 'block';
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    removeProfilePics.addEventListener('click', function() {
        profilePics.src = '/Uploads/image-copy.png'; 
        profilePicsInput.value = '';
        removeProfilePics.style.display = 'none';
    });

    if (!profilePics.src.includes('image-copy.png')) {
        removeProfilePics.style.display = 'block';
    }
});