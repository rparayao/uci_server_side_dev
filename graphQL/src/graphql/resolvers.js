import { getAllBooks, deleteABook, addABook } from '../services/books'
import { json } from 'express';

const resolvers = {
    getBooks: async ({}) =>{
        return getAllBooks();
    }, 
    createBook: async ({input}) =>{
        return addABook(input);
    }, 
    deleteBook: async ({ id }) => {
        console.log("about to delete: " + id);
        try {
            await deleteABook(parseFloat(id));
        } catch (err) {
            return { successful: false };
        }
        return { successful: true };
        
      },    
};

export default resolvers;