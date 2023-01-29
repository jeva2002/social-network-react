import { useEffect } from 'react';
import { Contact, ContactData, CurrentUserData } from '../../types';
import { getContacts, getActiveChats } from '../handlers';
import { useDispatch } from 'react-redux';
import { setActiveChats } from '../features';
import { setContacts } from '../features/chats';

export const useSetContacts = (currentUser: CurrentUserData | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('render');
    if (currentUser) {
      getContacts(
        currentUser.contacts.map((contact: Contact) => contact.cel)
      ).then((res) => {
        dispatch(setContacts(res));
      });
    }
  }, []);
};

export const useSetActiveChats = (currentUser: CurrentUserData | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      getActiveChats(currentUser.id).then(
        (res: (ContactData | undefined)[]) => {
          dispatch(setActiveChats(res));
        }
      );
    }
  }, []);
};