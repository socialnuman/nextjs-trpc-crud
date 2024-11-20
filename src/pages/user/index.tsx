import React, { useEffect, useState } from 'react';
import ListUsers from '@/components/list-user';
import UserForm from '@/components/user-form';
import useUserStore from '@/store/userStore';
import { trpc } from '@/utils/trpc';
import useFormStore from '@/store/formStore';
import CardHeader from '@/components/card-header';
import Loader from '@/components/loader';
import Toast from '@/components/toast';
import { ActionTypes } from '@/types';
import useToastStore from '@/store/toastStore';
import Pagination from '@/components/pagination';

const Index = () => {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
    const { showForm, setShowForm, setFromData } = useFormStore()
    const { showToast, action, errorMessage, setToastData, setShowToast } = useToastStore()
    const { setUsers, page, setTotalUsers, setPage } = useUserStore();
    const { data, isPending, isLoading, error, refetch } = trpc.getUsers.useQuery({ limit: 6, page, searchText: debouncedSearchText });

    const handleCloseForm = () => {
        setShowForm(false);
        setFromData(null, '', '')
    };

    useEffect(() => {
        if (data) {
            setUsers(data.data.users);
            setTotalUsers(data?.results)
        }
    }, [data, setUsers]);

    useEffect(() => {
        const timerId = setTimeout( async () => {
            setPage(1)
            setDebouncedSearchText(searchText);
            await refetch();
        }, 500); // 500ms debounce period

        return () => clearTimeout(timerId);
    }, [searchText, refetch]);

    if(error) {
        setShowToast(true)
        setToastData(ActionTypes.ERROR, error?.message)
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 mt-5">
            <h1 className="text-[2rem] text-black text-center font-bold mb-8">User Management</h1>
            <div className="flex flex-col justify-between mb-4 gap-0 ml-auto">
                <CardHeader searchText={searchText} setSearchText={setSearchText} />
                { showToast && <Toast errorMessage={errorMessage} action={action as ActionTypes} /> }
                { (isPending || isLoading) ? <Loader /> : <ListUsers />}
            </div>
            {showForm && <UserForm onClose={handleCloseForm}/>}
            <Pagination />
        </main>
    );
};

export default Index;
