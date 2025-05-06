document.addEventListener('DOMContentLoaded',()=>{
    let likeButton = document.querySelectorAll(".like-btn");
    let dislikeButton = document.querySelectorAll(".dislike-btn");

    likeButton.forEach(singleLikeButton =>{ 
        singleLikeButton.onclick = (e) =>{
        let headers = new Headers();
        headers.append('Accept','Application/JSON');

        let request = new Request(`/api/likes/${e.currentTarget.dataset.post}`,{
            method:"POST",
            headers,
        });

        fetch(request)
            .then(res => res.json())    
            .then(data =>{
                
                let likesContentElement = e.target.querySelector('span');
                let likesCountElement = e.target.querySelector('p');
                let iconElement = e.currentTarget;
                console.log(likesCountElement,iconElement,likesCountElement);


                if(data.liked && !data.disliked){
                    likesCountElement.innerText = data.totalLike ;
                    likesContentElement.innerText = 'Liked';
                }else{
                    
                }

                
            })
            .catch(er=> {
                console.log(er);

            })
        }

    })



    dislikeButton.forEach(singleDislikeButton =>{
        singleDislikeButton.onclick = (e)=>{

            let header = new Headers();
            header.append('Accept','Application/JSON');

            let request = new Request(`/api/dislikes/${e.currentTarget.dataset.post}`,{
                method:"POST",
                header,
            })

            
            fetch(request)
                .then(res => res.json())
                .then(data => {

                    
                    
                    dislikeCountElement.innerText = data.totalDisLike;

                    if(data.disliked){
                        iconElement.classList.remove('fa-regular');
                        iconElement.classList.add('fa-solid');
                        dislikeContent.innerText = "Disliked";
                    }else{
                        iconElement.classList.remove('fa-solid');
                        iconElement.classList.add('fa-regular');
                        dislikeContent.innerText = "Dislike";
                    }

                    if(data.disliked === false && dislikeBtn){
                        likeIcon.classList.remove('fa-solid');
                        likeIcon.classList.add('fa-regular');
                        likeContent.innerText = "Like";
                        likesCountElement.innerText = data.totalLike;
                    }
                })
                .catch(er => {
                    console.log(er);
                })


        }
    })


})