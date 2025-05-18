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
                        console.log('error occours when try to comment in a post __ '+e)
                    })
            }else{
                console.log("Please Enter a valid comment");
            }
        }
    })





commentHold.addEventListener("keypress",(e)=>{
    if(commentHold.hasChildNodes(e.target)){
        if(e.key==='Enter'){
            let commentId = e.target.dataset.comment;
            let value = e.target.value;


            if(value){
                let dataBody = {
                    body:e.target.value
                }

                let req = createCommentRequest('POST','comments/reply',commentId,dataBody);
                fetch(req)
                    .then(res=>res.json())
                    .then(data=>{
                        let replyElement = createReplyElement(data.reply);
                        let parentElement = e.target.parentElement;
                        parentElement.previousElementSibling.appendChild(replyElement);

                    })
                    .catch(e=>{
                        console.log('error occurs when try to reply __ '+e)
                    })
            }else{
                alert('Please Enter a valid Reply');
            }
        }
    }
})



})




const createComment = (comment)=>{
    let innerHTML = `
        <div class = "media" >
            <img 
                src="/Public/${comment.user.profilePics}"
            />
            <div class="media-body">
                <p>${comment.body}</p>
                <div>
                    <input type="text" placeholder="Press Enter to reply" name="reply" 
                    data-comment=${comment._id}
                    />
                    </div>
            </div>
        </div>  
    `
    
    let div = document.createElement("div");
    div.className = 'media'
    div.innerHTML = innerHTML;
    
    return div.firstElementChild;
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




const createReplyElement=(reply)=>{
    let innerHTML = `
        <div class="media-reply">
            <img style = "width:40px;" src='/Public/${reply.profilePics}' />
            <div class="media-body">
                <p>${reply.body}</p>
            </div>
        </div>  
    `

    let div = document.createElement('div');
    div.className = 'media-reply';
    div.innerHTML = innerHTML;

    return div.firstElementChild;
}