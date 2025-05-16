document.addEventListener('DOMContentLoaded',()=>{
    const Comment = document.getElementById('comment');
    const commentHold = document.querySelector('.comment-hold');
    

    Comment.addEventListener('keypress',(e)=>{
        if(e.key === "Enter"){
            if(e.target.value){
                let postId = Comment.dataset.post;
                let dataBody = {
                    body:e.target.value
                }
                let req = createCommentRequest('POST','comments',postId,dataBody);
                fetch(req)
                    .then(res=>res.json())
                    .then(data=>{
                        let commentElement = createComment(data.comment);
                        commentHold.insertBefore(commentElement,commentHold.children[0]);
                        Comment.value = "";
                    })
                    .catch(e=>{
                        console.log(e)
                    })
            }else{
                console.log("Please Enter a valid comment");
            }
        }
    })

})


const createComment = (comment)=>{
    let innerHTML = `
        <img 
            src="${comment.user.profilePics}"
        />
        <div class="media-body">
            <p>${comment.body}</p>
            <div>
                <input type="text" placeholder="Press Enter to reply" name="reply" 
                data-comment=${comment._id}
                />
                </div>
        </div>
    `
    
    let div = document.createElement("div");
    div.className = 'media-border'
    div.innerHTML = innerHTML;
    
    return div
}


const createCommentRequest = (method,type,postId,body)=>{
        let headers = new Headers();
        headers.append('Accept','Application/JSON');
        headers.append('Content-Type','Application/JSON');

        let request = new Request(`/api/${type}/${postId}`,{
            method,
            headers,
            body:body? JSON.stringify(body): '',
        });

        return request; 
    }   