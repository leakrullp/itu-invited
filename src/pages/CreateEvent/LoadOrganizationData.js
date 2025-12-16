import Parse from "parse";

async function returnOrgNameForAdminUser(currentUser) {
  const Admin = Parse.Object.extend("Admin");
  const adminQuery = new Parse.Query(Admin);

  adminQuery.equalTo("userID", currentUser);
  adminQuery.include("orgID");

  const adminRecord = await adminQuery.first();

  if (!adminRecord) return null;

  const org = adminRecord.get("orgID");
  return org.get("orgName");
}

async function returnOrgIdForAdminUser(currentUser) {
  const Admin = Parse.Object.extend("Admin");
  const adminQuery = new Parse.Query(Admin);

  adminQuery.equalTo("userID", currentUser);
  adminQuery.include("orgID");

  const adminRecord = await adminQuery.first();

  if (!adminRecord) return null;

  const org = adminRecord.get("orgID");
  return org.id;
}

export { returnOrgNameForAdminUser, returnOrgIdForAdminUser };
