"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Profile from "@/components/Profile";

const ProfilePage = ({params}) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    const [userPosts, setUsersPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUsersPosts(data);
        }

        if (params?.id) {
            fetchPosts();
        }
    }, [params.id])

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s collection of prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    )
}

export default ProfilePage;