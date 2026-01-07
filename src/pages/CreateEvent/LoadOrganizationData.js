import Parse from "parse";

export async function returnOrgForAdminUser(currentUser) {
  const Admin = Parse.Object.extend("Admin");
  const adminQuery = new Parse.Query(Admin);
  adminQuery.equalTo("userID", currentUser);
  adminQuery.include("orgID");

  const adminRecord = await adminQuery.first();
  const org = adminRecord.get("orgID");

  if (!adminRecord || !org) {
    return { orgId: null, orgName: "Unknown organization" };
  }

  return {
    orgId: org.id,
    orgName: org.get("orgName"),
  };
}
