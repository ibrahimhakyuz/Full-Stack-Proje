import { useParams } from "react-router"
import axios from 'axios'
import { useEffect, useState, useContext } from "react";
import PageNotFound from "./PageNotFound"; 
import { useNavigate } from 'react-router'

import { AuthContext } from '../helpers/AuthContext'



function Profile() {

    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListfOfPosts] = useState([]);

    let navigate = useNavigate();

    const {authState} = useContext(AuthContext);
    


    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`)
        .then((response) => {
            setListfOfPosts(response.data)
        })
    },[id])

    return (
        username === "" ? (
            <PageNotFound />
          ) : (
            <div className="profilePageContainer">
              <div className="basicInfo">
                <h1>Username: {username}</h1>
                {authState.username === username && 
                <button onClick={() => {navigate("/changepassword")}}>Change My Password</button>}
              </div>
              <div className="listOfPosts">
                {listOfPosts.map((value, key) => {  
                    return (
                    <div className="post" key={key} >
                      <div className="title">{value.title}</div>
                      <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText} </div>
                      <div className="footer">
                        <div className="username">{value.username} </div>
                        <div className="buttons"><label> {value.Likes.length} </label> </div>
                      </div>
                    </div>
                    )
                  })}
              </div>
            </div>
          )
    )
}

export default Profile