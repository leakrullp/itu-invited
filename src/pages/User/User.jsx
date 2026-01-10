import "./User.css";
import { Button, InputField } from "../../components";
import UserSettings from "./UserSettings";
import { useOrgForAdmin } from "../CreateEvent/useOrgForAdmin";
import Parse from "parse";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const User = ({ currentUser }) => {
  const username = currentUser.get("username");
  const email = currentUser.get("email");
  const { orgId, orgName } = useOrgForAdmin(currentUser);
  console.log("username", username);
  console.log("email", email);
  console.log("orgName", useOrgForAdmin(currentUser));

  const [newOrgName, setNewOrgName] = useState("");

  useEffect(() => {
    if (orgName) setNewOrgName(orgName);
  }, [orgName]);

  async function updateOrgName() {
    try {
      if (!orgId) throw new Error("Missing orgId");
      const name = newOrgName.trim();
      if (!name) throw new Error("Organization name cannot be empty");

      const Organization = Parse.Object.extend("Organization");

      const org = Organization.createWithoutData(orgId);
      org.set("orgName", name);

      const saved = await org.save();
      toast.success(`Your organization's name is changed to "${name}"`, {
        theme: "colored",
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Failed to update organization name. Please try again.", {
        theme: "colored",
        autoClose: 5000,
      });
    }
  }

  return (
    <>
      <user-container>
        <div className="user-container">
          <h1>Settings: </h1>

          <div className="orgName">
            <InputField
              type="text"
              label="Organization Name:"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
            />
            <Button onClick={updateOrgName}>Update</Button>
          </div>

          <br></br>

          <div className="user-info-line">
            <h3>Currently logged in as :</h3>
            <p>{currentUser.role}</p>
          </div>

          <div className="user-info-line">
            <h3>Username:</h3>
            <p>{username}</p>
          </div>

          <div className="user-info-line">
            <h3>Email:</h3>
            <p>{email}</p>
          </div>
        </div>
      </user-container>
    </>
  );
};
