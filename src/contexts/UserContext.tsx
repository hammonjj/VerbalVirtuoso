import { createContext } from "react";
import { User } from '@supabase/supabase-js'

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
