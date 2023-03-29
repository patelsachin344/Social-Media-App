import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextt";
import { Users } from "../../DummyData";
import { getFriends } from "../../redux/Friends/action";
import { Online } from "../Online/Online";
import "./Rightbar.css";

export const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const [follow, setFollow] = useState(
    currentUser?.followings?.includes(user?._id)
  );
  // console.log(currentUser.user);
  useEffect(() => {
    if (user) {
      dispatch(getFriends(user._id));
    } else {
      dispatch(getFriends(currentUser?._id));
    }
  }, [user?._id]);
  useEffect(() => {
    setFollow(currentUser?.followings?.includes(user?._id));
  }, [currentUser, user]);
  // console.log(currentUser?.followings?.includes(user?._id));
  const handleFollow = async () => {
    if (follow) {
      await axios.put(`http://localhost:8080/users/${user._id}/unfollow`, {
        userId: currentUser?._id,
      });
    } else {
      await axios.put(`http://localhost:8080/users/${user._id}/follow`, {
        userId: currentUser?._id,
      });
    }
    setFollow(!follow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Sachin</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends &&
            friends.map((friend) => (
              <Online key={friend.username} friend={friend} />
            ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser?.username && (
          <button className="rightbarFollowIcon" onClick={handleFollow}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User's information</h4>
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
        <h4 className="rightbarTitle">User's friends</h4>
        <div className="rightbarFollowings">
          {friends &&
            friends.map((friend) => (
              <Link
                to={"/friendsprofile/" + friend.username}
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
