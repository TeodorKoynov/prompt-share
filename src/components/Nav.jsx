"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

import logo from '../../public/assets/images/logo.svg';

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const initProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        initProviders();
    }, [])

    return (
        <nav className={"flex-between w-full mb-16 pt-3"}>
            <Link href={"/"} className={"flex gap-2 flex-center"}>
                <Image
                    src={logo}
                    alt={"PromptShare Logo"}
                    width={30}
                    height={30}
                    className={"object-contain"}
                />
                <p className={"logo_text"}>PromptShare</p>
            </Link>

            <div className={"sm:flex hidden"}>
                {session?.user ? (
                    <div className={"flex gap-3 md:gap-5"}>
                        <Link
                            href={"/create-prompt"}
                            className={"black_btn"}
                        >
                            Create Post
                        </Link>

                        <button
                            type={"button"}
                            onClick={() => signOut({callbackUrl: '/'})}
                            className={"outline_btn"}
                        >
                            Sign Out
                        </button>

                        <Link href={"/profile"}>
                            <Image
                                src={session?.user.image }
                                width={37}
                                height={37}
                                className={"rounded-full"}
                                alt={"profile"}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider, index) => (
                            <div key={provider.name}>
                                <button
                                    type={"button"}
                                    onClick={() => signIn(provider.id)}
                                    className={"black_btn"}
                                >
                                    Sign In
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/*Mobile Nav*/}

            <div className={"sm:hidden flex relative"}>
                {session?.user ? (
                    <div className={"flex"}>
                        <Image
                            src={session?.user.image}
                            alt={"profile"}
                            width={37}
                            height={37}
                            className={"rounded-full object-contain cursor-pointer"}
                            onClick={() => setToggleDropdown((prevToggle) => !prevToggle)}
                        />

                        {toggleDropdown && (
                            <div className={"dropdown drop-shadow"}>
                                <Link
                                    href={"/profile"}
                                    className={"dropdown_link"}
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href={"/create-prompt"}
                                    className={"dropdown_link"}
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type={"button"}
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className={"mt-5 w-full black_btn"}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider, index) => (
                            <div key={provider.name}>
                                <button
                                    type={"button"}
                                    onClick={() => signIn(provider.id)}
                                    className={"black_btn"}
                                >
                                    Sign In
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav;