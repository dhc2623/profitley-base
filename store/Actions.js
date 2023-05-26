const req = require.context('.', true, /\.\/.+\/Action\.js$/);

let obj = {};

req.keys().forEach((key) => {
    const actions = req(key);
    Object.keys(actions).forEach((name) => {
        obj[name] = actions[name];
    });
});

export default obj;
