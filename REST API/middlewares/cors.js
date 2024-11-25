export const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
};