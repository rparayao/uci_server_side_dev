import { getBillItem, deleteBillItem, addBillItem } from '../services/bills'
import { sendResetEmail } from '../email'
import { compareHashed } from '../auth';
import {
    createUser,
    getUserByUsername
  } from '../services/users';

const convertUserFromDatabase = user => {
    user.displayName = user.display_name;
    delete user.display_name;
    return user;
  }
  

const resolvers = {
    getBills: async ({}) =>{
        return getBillItem();
    }, 
    createBill: async ({input}) =>{
        return addBillItem(input);
    }, 
    deleteBill: async ({ id }) => {
        console.log("about to delete: " + id);
        try {
            await deleteBillItem(parseFloat(id));
        } catch (err) {
            return { successful: false };
        }
        return { successful: true };
        
      },

    //NEW      
    login: async ({ loginInput: { username, password } }, { session }) => {
        const user = await getUserByUsername(username);
        const matches = await compareHashed(password, user.password);
        session.user = matches ? convertUserFromDatabase(user) : null;
        return session.user;
    },

    logout: async (args, { session }) => {
       delete session.user
       return { successful: true };
    },

    signup: async ({ user }, { session }) => {
        session.user = convertUserFromDatabase(await createUser(user));
        return session.user;
    }
    //NEW          
};

export default resolvers;