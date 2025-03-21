document.addEventListener('DOMContentLoaded', function() {
    var profilePicsInput = document.getElementById('profilePicsinput');
    var profilePics = document.getElementById('profilePics');
    var removeProfilePics = document.getElementById('removeProfilePics');
    let submitBtn = document.querySelector('.createProfileBtn');
    let photo_add_btn = document.querySelector('#addBtn');

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

    // Handle profilePics send 
    submitBtn.addEventListener('click', (event) => {
        const formData = new FormData();
        fetch('http://localhost:5050/dashboard/edit-profile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.profilePics) {
                profilePics.src = `/${data.profilePics}`;
                console.log('added pp')
            }
        })
        .catch(e => console.log('error on formdata photo', e));
    });

    photo_add_btn.addEventListener('click', (e) => {   
        const formData = new FormData();
        formData.append('profilePics', profilePicsInput.files[0]);
        fetch('/uploads/profilepics', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.profilePics) {
                profilePics.src = `/${data.profilePics}`;
                console.log('updated pp')
            }
        })
        .catch(e => console.log('error on formdata photo', e));
    });
});     