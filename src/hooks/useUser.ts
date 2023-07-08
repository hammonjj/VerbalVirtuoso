import { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';

export default function useUser() {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context.user;
    // const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     async function getUserData() {
    //         const userData = await supabase.auth.getUser();
    //         setUser(userData.data.user);
    //     }

    //     getUserData();
    // }, []);

    // return user;
}