import { get } from 'lodash';
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from '../Utils/Jwt.Utils';
import { reIssueAccessToken } from '../Service/Session.Service'; 

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    const refreshToken = get(req, 'headers.x-refresh', '').replace(/^Bearer\s/, '');

    if (!accessToken) {
        return next();
    }
    
    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken) {
        
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
            res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
        }

        const result = verifyJwt(newAccessToken as string);

        
        res.locals.user = result.decoded;
        return next();

    }

    return next();

}

export default deserializeUser;