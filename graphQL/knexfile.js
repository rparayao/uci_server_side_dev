module.exports  = {
    development_x: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'book_list',
            user: 'root',
            password: ''
        }
    },
    development: {
        client: 'postgresql',
        connection: {
            database: 'book-list',
            user: 'postgres',
            password: 'xxx'
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            database: 'book-list-test',
            user: 'postgres',
            password: 'xxx'
        }
    }

};