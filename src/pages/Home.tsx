import { useEffect, useState } from "react";
import { getUser } from "../api";
import { toast } from "react-toastify";
import "./../assets/styles/HomePage.scss";
import { useAuth } from "../providers/AuthProvider";

export interface UserState {
  email: string;
  id: string;
  username: string;
}

const Home = () => {
  const [userData, setUserData] = useState<null | UserState>(null);
  const { logOut } = useAuth();

  const fetchUser = async () => {
    const storedUser = sessionStorage.getItem("user") || "";
    if (storedUser) {
      const { password, username } = JSON.parse(storedUser);
      const data = await getUser(username, password);
      setUserData(data);
    } else {
      toast.info("Please refresh page");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="home-page">
      <div className="head">
        <div>{userData ? <div>{userData.email}</div> : <div>Loading user data...</div>}</div>
        <button onClick={logOut}>Logout</button>
      </div>
      <div className="content">content</div>
    </div>
  );
};

export default Home;
