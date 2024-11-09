import { useState, useEffect } from "react";
import ChatTile from "./ChatTile";
import Label from "./Label";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";

const AllChats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const { getToken } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch("http://localhost:3000/api/v1/recents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  
  return (
    <div>
      <div>
        <Search />

        <Label />
      </div>
      {loading || error? (
        "Loading..."
      ) : (
        
        <div className="">
         
          <ul>
            {data.data.map((d) => (
              <li key={d.id}>
                <Link to={`/chat/${d.id}`}>
                  <ChatTile
                  name={d.first_name + " " + d.last_name}
                  id={d.id}
                  img={d.profile_image_url}
                  />
                  </Link>
                  </li>
  
            ))}
          </ul>
          <ul>
            {data.data2.map((d) => (
              <li key={d._id}>
                <Link to={`/chat/${d._id}`}>
                  <ChatTile
                    name={d.GroupName}
                    id={d._id}
                    img={d.profile_image_url}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllChats;
