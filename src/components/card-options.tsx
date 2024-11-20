import React, { useState, useEffect, useRef } from 'react';
import { trpc } from '@/utils/trpc';
import useFormStore from '@/store/formStore';
import useToastStore from '@/store/toastStore';
import { ActionTypes } from '@/types';
import Loader from '@/components/loader';
import useUserStore from '@/store/userStore';

interface ICardOptionProps {
    id: number,
    name: string,
    email: string,
    index: number
}

const CardOptions: React.FC<ICardOptionProps> = ({ id, name, email, index }) => {
    const [openDropdown, setOpenDropdown] = useState<null | number>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);  // Ref for the dropdown container
    const utils = trpc.useUtils();
    const { setShowForm, setFromData } = useFormStore();
    const { setToastData, setShowToast } = useToastStore()
    const { setPage } = useUserStore()

    const { mutate, isPending, error } = trpc.deleteUser.useMutation({
        onSuccess: async () => {
            setShowToast(true)
            setPage(1)
            setToastData(ActionTypes.DELETED, undefined)
            await utils.invalidate(undefined, {
                queryKey: ["getUsers"]
            });
        },
    });

    const updateHandler = (id: number, name: string, email: string) => {
        setOpenDropdown(null);
        setFromData(id, name, email);
        setShowForm(true);
    };

    const deleteHandler = (id: number) => {
        setOpenDropdown(null);
        mutate({ id });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    if(error){
        setShowToast(true)
        setToastData(ActionTypes.ERROR, error?.message)
    }

    return (
        <>
            { isPending && <Loader />}
            <div className='flex justify-end w-full' ref={dropdownRef}>
                <button
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    data-dropdown-button
                    className='text-black'
                >
                    •••
                </button>
                <div
                    className={`${openDropdown === index ? 'block' : 'hidden'} absolute right-0 mt-5 bg-white dark:text-white rounded-md shadow-lg w-48`}
                >
                    <ul>
                        <li>
                            <button
                                onClick={() => updateHandler(id, name, email)}
                                className='block px-4 w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-700'>Edit
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => deleteHandler(id)}
                                className='block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600'>Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CardOptions;
