import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Link } from 'react-router';



function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
    
  let navigate = useNavigate();
  
  
  useEffect(() => {
    if (!localStorage.getItem("accessToken")){
    navigate("/login")
    }else{

    
    axios.get("http://localhost:3001/posts", { headers: { accessToken: localStorage.getItem("accessToken") } })
      .then((response) => { 
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like => {
          return like.PostId;
        })));
      })
    }
  },[navigate]);

  const likeAPost = async (postId) => {
    await axios.post("http://localhost:3001/likes", 
      { PostId: postId }, 
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
    .then((response) => {
      setListOfPosts((listOfPosts) => 
        listOfPosts.map((post) => {
          if (post.id === postId) {
            if (response.data.liked) {
              return { ...post, Likes: [...post.Likes, { userId: response.data.userId }] };
            } else {
              return { 
                ...post, 
                Likes: post.Likes.slice(0, -1)
              };
            }
          } else {
            return post;}
          
        })
      );
      
      if (likedPosts.includes(postId)) {
        setLikedPosts(
          likedPosts.filter((id) => {
            return id != postId;
          })
        );
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    })

    
  };
  
  
  return (
    <div>
        {listOfPosts.map((value, key) => {  
        return (
        <div className="post" key={key} >
          <div className="title">{value.title}</div>
          <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText} </div>
          <div className="footer">
            <div className='username'><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
            <div className="buttons">
              <ThumbUpAltIcon
                onClick={() => {
                  likeAPost(value.id);
                }}
               className={
                  likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                }/>
                <label> {value.Likes.length} </label>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default Home