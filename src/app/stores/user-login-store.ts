import { makeAutoObservable } from 'mobx';
import UserApi from '@api/user/user.api';

import { RefreshTokenResponce, UserLoginResponce } from '@/models/user/user.model';

export default class UserLoginStore {
    private timeoutHandler: NodeJS.Timeout = null;

    private static tokenStorageName = 'token';

    private static dateStorageName = 'expireAt';

    public userLoginResponce?: UserLoginResponce;

    private callback?:()=>void;

    public constructor() {
        makeAutoObservable(this);
    }

    private static getExpiredDate():Date {
        return new Date(localStorage.getItem(UserLoginStore.dateStorageName)!);
    }

    private static setExpiredDate(date: string):void {
        localStorage.setItem(UserLoginStore.dateStorageName, date);
    }

    public static getToken() {
        return localStorage.getItem(UserLoginStore.tokenStorageName);
    }

    public static setToken(newToken:string) {
        return localStorage.setItem(UserLoginStore.tokenStorageName, newToken);
    }

    private static clearToken() {
        localStorage.removeItem(UserLoginStore.tokenStorageName);
    }

    public setCallback(func:()=>void) {
        this.callback = func;
    }

    public static get isLoggedIn():boolean {
        return UserLoginStore.getExpiredDate() > new Date(Date.now() + 2 * 60000);
    }

    public clearUserData() {
        if (this.timeoutHandler) {
            clearTimeout(this.timeoutHandler);
        }
        localStorage.removeItem(UserLoginStore.tokenStorageName);
        localStorage.removeItem(UserLoginStore.dateStorageName);
    }

    public logout() {
        this.clearUserData();
    }

    public setUserLoginResponce(user:UserLoginResponce, func:()=>void) {
        UserLoginStore.setExpiredDate(user.expireAt.toDateString());
        const expireForSeconds = (new Date(user.expireAt)).getTime() - new Date().getTime();
        this.setCallback(func);
        this.userLoginResponce = user;
        UserLoginStore.setToken(user.token);
        if (expireForSeconds > 10000) {
            this.timeoutHandler = setTimeout(() => {
                if (this.callback) {
                    this.callback();
                }
            }, expireForSeconds - 10000);
        }
    }

    public refreshToken = ():Promise<RefreshTokenResponce> => (
        UserApi.refreshToken({ token: UserLoginStore.getToken() ?? '' })
            .then((refreshToken) => {
                const expireForSeconds = (new Date(refreshToken.expireAt)).getTime() - new Date().getTime();
                this.timeoutHandler = setTimeout(() => {
                    if (this.callback) {
                        this.callback();
                    }
                }, expireForSeconds);
                return refreshToken;
            }));
}
