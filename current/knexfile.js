module.exports  = {
    development_test: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'budget_tracker',
            user: 'root',
            password: ''
        }
    },
    development: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills',
            user: 'postgres',
            password: 'Remi2000'
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills-test',
            user: 'postgres',
            password: 'Remi2000'
        }
    }

};