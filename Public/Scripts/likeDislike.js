document.addEventListener('DOMContentLoaded',()=>{
    let likeButton = document.querySelector("#likebutton");
    let dislikeButton = document.querySelector("#dislikebutton");
    let likeIcon = document.querySelector('#likeIcon');
    let dislikeIcon = document.querySelector('#dislikeIcon');


    likeButton.addEventListener('click',(e)=>{
        let postId = e.currentTarget.dataset.post;
        
        likeDislike_inOne('likes',postId)
            .then(res => res.json())
            .then(data => {
                if (data.liked) {
                    likeIcon.classList.remove('fa-regular');
                    likeIcon.classList.add('fa-solid');
                } else {
                    likeIcon.classList.remove('fa-solid');
                    likeIcon.classList.add('fa-regular');
                }

                dislikeIcon.classList.remove('fa-solid');
                dislikeIcon.classList.add('fa-regular');

                likeButton.querySelector('span').innerText = `${data.liked ? 'Liked' : 'Like'} (${data.totalLike})`;
                dislikeButton.querySelector('span').innerText = `Dislike (${data.totalDisLike})`;
            
            })
            .catch(e=>{
                console.log(e);
            })

    })











    const likeDislike_inOne = (type,postId)=>{
        let headers = new Headers();
        headers.append('Accept','Application/JSON');
        headers.append('Content-Type','Application/JSON');

        let request = new Request(`/api/${type}/${postId}`,{
            headers,
            mode:'cors'
        });

        let fetchData = fetch(request);
        return fetchData;
    }



})

