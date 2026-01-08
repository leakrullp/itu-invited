import { useEffect, useState } from "react";
import Parse from "parse";

const cacheKey = (userId) => `userIsAdmin:${userId}`;

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

      // read cache before querying db
      const cached = sessionStorage.getItem(cacheKey(user.id));
      if (cached !== null) {
        if (!cancelled)
          setState({ loading: false, isAdmin: Boolean(cached === "true") });
        return;
      }

      // query if admin status is unknown
      try {
        const query = new Parse.Query("Admin");
        query.equalTo("userID", user);
        query.select([]);
        const adminRecord = await query.first();

        const isAdmin = Boolean(adminRecord);
        sessionStorage.setItem(cacheKey(user.id), String(isAdmin));

        if (!cancelled) setState({ loading: false, isAdmin });
      } catch (e) {
        console.log(e.message);
        if (!cancelled) setState({ loading: false, isAdmin: false });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
