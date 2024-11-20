import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import useFormStore from '@/store/formStore';
import Loader from '@/components/loader';
import Toast from '@/components/toast';
import { ActionTypes } from '@/types';
import useToastStore from '@/store/toastStore';

interface UserFormInputProps {
  onClose: any
}

const UserForm: React.FC<UserFormInputProps> = ({ onClose }) => {
  const { id, name: updateName, email: updateEmail } = useFormStore()

  const [name, setName] = useState(updateName);
  const [email, setEmail] = useState(updateEmail);

  const { showToast, action, errorMessage, setToastData, setShowToast } = useToastStore()

  const utils = trpc.useUtils();  // Access the TRPC utils

  const { mutate, isPending, error } = trpc.createUser.useMutation({
    onSuccess: async () => {
      setShowToast(true)
      setToastData(ActionTypes.CREATED, undefined)
      await utils.invalidate(undefined, {
        queryKey: ["getUsers"]
      });

      setName('');
      setEmail('');
      onClose();
    },
  });

  const { mutate: updateMutation, isPending: updatePending, error: updateError } = trpc.updateUser.useMutation({
    onSuccess: async () => {
      setShowToast(true)
      setToastData(ActionTypes.UPDATED, undefined)
      await utils.invalidate(undefined, {
        queryKey: ["getUsers"]
      });

      setName('');
      setEmail('');
      onClose();
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!id) {
      mutate({ name, email });
      return;
    }
    else {
      updateMutation({id, name, email});
      return;
    }
  };

  if(error || updateError) {
    onClose();
    setShowToast(true)
    setToastData(ActionTypes.ERROR, error?.message || updateError?.message)
  }

  return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
        <div className="relative top-20 p-5 border lg:mx-auto md:mx-auto sm:mx-auto ml-5 mr-5 max-w-md shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
          <h2 className='text-2xl font-semibold mb-4 text-[#2B86C5]'>
            { id ? 'Update User' : 'Add New User' }
          </h2>
          { (isPending || updatePending) && <Loader /> }
          { showToast && <Toast action={action as ActionTypes} errorMessage={errorMessage} />}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
              <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md text-black'
                  required
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md text-black'
                  required
              />
            </div>
            <div className='flex justify-between'>
              <button
                  type='submit'
                  className='mt-2 bg-[#2B86C5] hover:bg-[#7150a3] text-white font-bold py-2 px-4 rounded'
              >
                { id ? 'Update' : 'Submit' }
              </button>
              <button
                  type='button'
                  onClick={onClose}
                  className='mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserForm;
