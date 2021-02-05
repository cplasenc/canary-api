//@desc     Log request to console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protovol}://${req.get('host')}${req.originalUrl}`);
    next();
};

modeule.exports = logger;