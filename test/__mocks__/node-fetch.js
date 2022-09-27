const fetch = jest.fn(() => Promise.resolve(
    {
        status:200,
        message: 'ok',
    }
));

module.exports = fetch;