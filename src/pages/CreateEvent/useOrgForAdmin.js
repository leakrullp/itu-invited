import { useEffect, useState } from "react";
import { returnOrgForAdminUser } from "./LoadOrganizationData";

export function useOrgForAdmin(currentUser) {
  const [orgId, setOrgId] = useState(null);
  const [orgName, setOrgName] = useState("Unknown organization");

  useEffect(() => {
    let cancelled = false;

    async function loadOrg() {
      if (!currentUser) return;

      try {
        const { orgId, orgName } = await returnOrgForAdminUser(currentUser);
        if (!cancelled) {
          setOrgId(orgId);
          setOrgName(orgName);
        }
      } catch (err) {
        console.error("Failed to load organization", err);
        if (!cancelled) {
          setOrgId(null);
          setOrgName("Unknown organization");
        }
      }
    }

    loadOrg();
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  return { orgId, orgName };
}
