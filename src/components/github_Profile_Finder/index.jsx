import axios from "axios";
import React, { useEffect, useState } from "react";

const GithubProfileFinder = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    if(username){
        axios.get(`https://api.github.com/users/${username}`).then(response=>{
            if (response.data.message === 'Not Found'){
                setUserData(null)
            }else{
                setUserData(response.data)
            }
        }).catch(error=>{
            console.log(error);
            setUserData(null)
            
        })
    }
  },[username]);


  return (
    <div>
      <div>
        <input
          placeholder="Serach by Username..."
          type="text"
          name="search-by-username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
        />
      </div>
      {userData && (
        <div>
          <h3>Name: {userData.name}</h3>
          <h3>Last Name: {userData.name}</h3>
          <p>Username: {userData.login}</p>
          <p>Bio: {userData.bio}</p>
          <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} width="200" />
        </div>
      )}
    </div>
  );
};

export default GithubProfileFinder;
