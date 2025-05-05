window.onload = ()=>{
    let likeButton = document.querySelector(".like-btn");
    let dislikeButton = document.querySelector(".dislike-btn");

    likeButton.onclick = (e) =>{
        let headers = new Headers();
        headers.append('Accept','Application/JSON');

        let request = new Request(`/api/likes/${e.currentTarget.dataset.post}`,{
            method:"POST",
            headers,
            mode:'cors',
        });

        fetch(request)
            .then(res => res.json())
            .then(data =>{
                if(data.liked){
                    console.log(data)
                    e.target.parentElement.innerHTML = `<span>
                                                            <p>${data.totalLike}</p>
                                                            <i class="fa-solid fa-thumbs-up"></i> Liked
                                                        </span>`;
                }
                else{
                    e.target.parentElement.innerHTML = `<span>
                                                            <p>${data.totalLike}</p>
                                                            <i class="fa-regular fa-thumbs-up"></i> Like
                                                        </span>`;
                }
            })
            .catch(e=>{
                console.log(e);
                
            })

    }


    dislikeButton.onclick = (e) =>{
        console.log("disliked btn clicked",e);
    }
}