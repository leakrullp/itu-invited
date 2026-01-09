import Parse from "parse";

export async function returnOrgForAdminUser(currentUser) {
  const Admin = Parse.Object.extend("Admin");
  const adminQuery = new Parse.Query(Admin);
  adminQuery.equalTo("userID", currentUser);
  adminQuery.include("orgID");

  try {
    const adminRecord = await adminQuery.first();
    // if not permission to read Admin class (not admin)
    if (!adminRecord) {
      return { orgId: null, orgName: "Unknown organization" };
    }

    const org = adminRecord.get("orgID");
    // if in Admin table but does not have an attached orgID
    if (!org) {
      return { orgId: null, orgName: "Unknown organization" };
    }
    // if admin
    return {
      orgId: org.id,
      orgName: org.get("orgName"),
    };
  } catch (error) {
    if (error.code === 119 || error.message === "unauthorized") {
      // Not admin
      return { orgId: null, orgName: "Unknown organization" };
    }

    // if error
    throw error;
  }
}
