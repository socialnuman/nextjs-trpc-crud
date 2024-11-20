import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fullMessage = "W\eelcome to User Management Made in NextJS 14 with TRPC using Postgres and Prisma.";
        let index = 0;
        const typeWriter = setInterval(() => {
            if (index < fullMessage.length) {
                setWelcomeMessage(prev => prev + fullMessage.charAt(index));
                index++;
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    router.push('/user');
                }, 1000);
            }
        }, 50);

        return () => clearInterval(typeWriter);
    }, [router]);

    return (
        <div className="h-screen flex justify-center items-center text-black">
            <h1 className="text-[3rem] text-center font-semibold">
                {welcomeMessage}
            </h1>
        </div>
    );
};

export default Index;
