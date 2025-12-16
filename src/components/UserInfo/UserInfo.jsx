import "./UserInfo.css";

//this is the userinfo button in the navbar
const UserInfo = ({ currentUser }) => {
  const username = "Lea";
  const initial = username.charAt(0);
  const email = "leape@itu.dk";
  return (
    <div className="user-info">
      <div className="img-wrapper">
        <h6>{initial}</h6>
      </div>
      <>
        <p className="username">{username}</p>
        <p className="email">{email}</p>
      </>
    </div>
  );
};

export default UserInfo;
