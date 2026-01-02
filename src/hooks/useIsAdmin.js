import { useEffect, useState } from "react";
import Parse from "parse";

export default function useIsAdmin() {
  const [state, setState] = useState({ loading: true, isAdmin: false });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const user = Parse.User.current();

      if (!user) {
        if (!cancelled) {
          setState({ loading: false, isAdmin: false });
        }
        return;
      }

      const Admin = Parse.Object.extend("Admin");
      const q = new Parse.Query(Admin);
      q.equalTo("userID", user);

      const adminRecord = await q.first();

      if (!cancelled) {
        setState({ loading: false, isAdmin: Boolean(adminRecord) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
