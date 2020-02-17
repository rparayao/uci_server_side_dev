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
            database: 'uci-server-side2',
            user: 'postgres',
            password: 'testPassword'
        }
    }

};