import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextt";
import { Users } from "../../DummyData";
import { Online } from "../Online/Online";
import "./Rightbar.css";

export const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const { currentUser } = useSelector((state) => state);

  const [follow, setFollow] = useState(
    currentUser?.followings.includes(user?._id)
  );
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/users/friends/${user._id}`
        );
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getFriends();
    }
  }, [user]);
  useEffect(() => {
    setFollow(currentUser?.followings.includes(user?._id));
  }, [currentUser, user]);
  // console.log(currentUser.followings.includes(user?._id));
  const handleFollow = async () => {
    if (follow) {
      await axios.put(`http://localhost:8080/users/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UnFollowSuccess", payload: user._id });
    } else {
      await axios.put(`http://localhost:8080/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "followSuccess", payload: user._id });
    }
    setFollow(!follow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowIcon" onClick={handleFollow}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends &&
            friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : PF + "person/images.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
