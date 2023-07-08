import { useEffect, useState, ReactNode } from "react";
import { supabase } from "@utils/supabaseClient";
import { UserContext } from './UserContext';
import { User } from "@supabase/supabase-js";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUserData() {
      const userData = await supabase.auth.getUser();
      setUser(userData.data.user);
    }

    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
        {children}
    </UserContext.Provider>
  );
}
