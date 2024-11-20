import React from 'react';
import useFormStore from '@/store/formStore';

const CardHeader : React.FC<any> = ({ searchText, setSearchText }) => {
    const { setShowForm } = useFormStore()
    const handleOpenForm = () => setShowForm(true);

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row md:flex-row sm:flex-row justify-between items-center gap-4">
                <input
                    type="search"
                    className="blockmd:w-fit lg:w-fit w-full max-w-[15rem] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search User..."
                    value={ searchText }
                    onChange={ (e) => setSearchText(e.target.value) }
                />
                <button
                    onClick={ handleOpenForm }
                    className='self-center md:self-end max-w-[15rem] lg:self-end md:w-fit lg:w-fit w-full top-0 bg-[#fefefee6] text-black py-2 px-4 rounded hover:bg-[#2B86C5] transition ease-in-out duration-150'
                >
                    Add New User
                </button>
            </div>

        </>
    )
}

export default CardHeader
