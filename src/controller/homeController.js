const handleWebTestApi = (req, res, next) => {
    return res.json({
        status: true,
        message: "success",
        data: "helloword"
    });
};

module.exports = {
    handleWebTestApi
};