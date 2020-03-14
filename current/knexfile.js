module.exports  = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'monthly-bills',
            user: 'root',
            password: ''
        }
    },
    development_XXXX: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills',
            user: 'postgres',
            password: 'xxxx'
        }
    },
    test_xxxx: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills-test',
            user: 'postgres',
            password: 'xxxx'
        }
    }

};