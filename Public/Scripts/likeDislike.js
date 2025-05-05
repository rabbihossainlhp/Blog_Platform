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

                let buttonContent = e.currentTarget.querySelector("span");
                let currentLlikes = parseInt(buttonContent.querySelector("p").innerText);
                let isLike = buttonContent.querySelector("i").classList.contains("fa-solid");

                if(isLike){
                    buttonContent.innerHTML = `<span>
                                                    <p>${currentLlikes - 1}</p>
                                                    <i class="fa-regular fa-thumbs-up"></i> Like
                                                </span>`
                }else{
                    buttonContent.innerHTML = `<span>
                                                    <p>${currentLlikes + 1}</p>
                                                    <i class="fa-solid fa-thumbs-up"></i> Liked
                                                </span>`
                }
                

                if(data.liked){
                    console.log(data)
                    buttonContent.innerHTML = `<span>
                                                    <p>${data.totalLike}</p>
                                                    <i class="fa-solid fa-thumbs-up"></i> Liked
                                                </span>`
                }
                else{
                    buttonContent.innerHTML = `<span>
                                                    <p>${data.totalLike}</p>
                                                    <i class="fa-regular fa-thumbs-up"></i> Like
                                                </span>`
                }
            })
            .catch(er=> {
                console.log(er);

            })
        }

    })


})