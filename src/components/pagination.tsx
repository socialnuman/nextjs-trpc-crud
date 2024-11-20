import useUserStore from '@/store/userStore';
import React from 'react';

const Pagination = () => {
    const { totalUsers, setPage, page} = useUserStore()
    const totalPages = Math.ceil((totalUsers || 1) / 6)

    const nextHandler = () => {
        if(totalPages > page) {
            setPage(page + 1)
        }
    }

    const backHandler = () => {
        if(page > 1) {
            setPage(page - 1)
        }
    }

    return (
        <div className={"flex flex-col md:flex-row lg:flex-row bottom-0 gap-2 justify-center items-center"}>
            <button
                className={`self-center cursor-pointer md:self-end max-w-[15rem] lg:self-end w-[7rem] top-0 ${page <= 1 ? 'bg-[#ffffff78]' : 'bg-[#fefefee6]' } text-black py-2 px-4 rounded transition ease-in-out duration-150`}
                disabled={page <= 1}
                onClick={()=> backHandler()}
            >
                Previous
            </button>

            <button
                className={`self-center cursor-pointer md:self-end max-w-[15rem] lg:self-end w-[7rem] top-0 ${page >= totalPages ? 'bg-[#ffffff78]' : 'bg-[#fefefee6]' } text-black py-2 px-4 rounded transition ease-in-out duration-150`}
                disabled={page >= totalPages}
                onClick={()=> nextHandler()}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
