import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  followUser,
  getFriends,
  unfollowUser,
} from "../../redux/Friends/action";
import { Online } from "../Online/Online";
import "./Rightbar.css";

export const Rightbar = ({ user }) => {
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
      dispatch(unfollowUser(currentUser?._id, user._id));
    } else {
      dispatch(followUser(currentUser?._id, user._id));
    }
    setFollow(!follow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={`https://res.cloudinary.com/deje6buuz/image/upload/v1680505715/gift_krcldu.png`}
            alt=""
          />
          <span className="birthdayText">
            <b>Sachin</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src={`https://res.cloudinary.com/deje6buuz/image/upload/v1680505730/ad_av2lyi.png`}
          alt=""
        />
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
                        : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
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
