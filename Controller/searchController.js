//dependencies..
const Post = require('../Models/Post');

exports.searchResultGetController = async (req,res,next)=>{
    let term = req.query.term;
    let page = parseInt(req.query.page) || 1;
    let itemPerPage = 10;
    
    try{
        let posts = await Post.find({
            $text:{
                $search:term
            }
        }).populate('author')
          .skip((itemPerPage * page)-itemPerPage)
          .limit(itemPerPage)


        let totalPosts = await Post.countDocuments({
            $text:{
                $search:term
            }
        });

        let totalPages = Math.ceil(totalPosts / itemPerPage);


        res.render("Pages/explorar/search", {
            title: `Search results for ${term}`,
            totalPosts,
            totalPages,
            currentPage: page,
            searchTerm: term,
            posts,
            user:req.user || null,
            bookmarks: req.user ? req.user.bookmarks || [] : []
        })
    
    }catch(e){
        next(e);
    }


}