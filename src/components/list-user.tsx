import useUserStore from '@/store/userStore';
import React from 'react';
import { User } from '@/types';
import CardOptions from '@/components/card-options';

export default function ListUsers() {
    const { users } = useUserStore();

    if (users?.length === 0) return <div className='text-center'>No Users Found</div>;

    return (
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user: User, index: number) => (
            <div key={user.id} className="relative bg-[#d7d9e04d] text-black rounded-lg shadow-lg p-4 flex flex-col items-center space-y-3">
                <CardOptions id={user.id} name={user.name} email={user.email} index={index}/>
              <img className='w-24 h-24 rounded-full' src={ `https://i.pravatar.cc/150?img=${ index + 1 }` }
                   alt={ `Profile of ${ user.name }` }/>
              <h5 className='text-lg font-bold'>{ user.name }</h5>
              <span className='text-sm'>{ user.email}</span>
            </div>
        ))}
      </div>
    );
}
