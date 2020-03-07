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
    development_xx: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills',
            user: 'postgres',
            password: 'Remi2000'
        }
    },
    test: {
        client_xx: 'postgresql',
        connection: {
            database: 'monthly-bills-test',
            user: 'postgres',
            password: 'Remi2000'
        }
    }

};