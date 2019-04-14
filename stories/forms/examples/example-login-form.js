export default {
    id: 'loginForm',
    title: 'Login Form',
    sections: [
        {
            id: 'loginSection',
            title: 'Login Section',
            subsections: [
                {
                    id: 'loginSubsection',
                    title: 'Login',
                    subtitle: 'Please enter your credentials',
                    fields: [
                        {
                            id: 'username',
                            title: 'Username',
                            type: 'string'
                        },
                        {
                            id: 'password',
                            title: 'Password',
                            type: 'string'
                        },
                        {
                            id: 'rememberMe',
                            title: 'Remember me',
                            type: 'boolean'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        password: {
            component: {
                type: 'password'
            }
        }
    }
};
