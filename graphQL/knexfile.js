module.exports  = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'book_list',
            user: 'root',
            password: ''
        }
    },
    development_X: {
        client: 'postgresql',
        connection: {
            database: 'book-list',
            user: 'postgres',
            password: 'xxxxxx'
        }
    },
    test: {
        client_X: 'postgresql',
        connection: {
            database: 'book-list-test',
            user: 'postgres',
            password: 'xxxxxx'
        }
    }

};