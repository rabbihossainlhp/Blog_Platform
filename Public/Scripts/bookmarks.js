window.onload = ()=>{
    let bookmarks = document.getElementsByClassName("bookmarks-icon");
    [...bookmarks].forEach(bookmark =>{
        bookmark.style.cursor = "pointer";
        bookmark.addEventListener('click',(e)=>{
            let target = e.target.parentElement;

            let headers = new Headers();
            headers.append('Accept','Application/JSON');

            let request = new Request(`/api/bookmarks/${target.dataset.post}`,{
                method:"GET",
                headers,
                mode:'cors'
            });
    
            fetch(request)
                .then(res=>res.json())
                .then(data => {
                    if(data.bookmark){
                        target.innerHTML = '<i class="fa-solid fa-bookmark"></i>'  
                    }else{
                        target.innerHTML = '<i class="fa-regular fa-bookmark"></i> ' 
                    }
                })
                .catch(e=>{
                    console.log(e.response.data);
                    alert(e.response.data.errorMessage)
                })
        })
    })
}