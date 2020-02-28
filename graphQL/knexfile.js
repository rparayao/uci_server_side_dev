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
    development_x: {
        client: 'postgresql',
        connection: {
            database: 'book-list',
            user: 'postgres',
            password: 'Remi2000'
        }
    },
    test_x: {
        client: 'postgresql',
        connection: {
            database: 'book-list-test',
            user: 'postgres',
            password: 'Remi2000'
        }
    }

};