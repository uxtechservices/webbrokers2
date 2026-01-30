export const getToken = (): string | null => {
    try {
        return localStorage.getItem('access-token');
    } catch (error) {
        return null;
    }
}
export const setToken = (token: string): boolean => {
    try {
        localStorage.setItem('access-token', token);
        return true
    } catch (error) {
        return false;
    }
}
export const removeToken = (): boolean => {
    try {
        localStorage.removeItem('access-token');
        return true;
    } catch (error) {
        return false;
    }
}
export const setUserData = (user: any): boolean => {
    try {
        localStorage.setItem('user-data', JSON.stringify(user));
        return true
    } catch (error) {
        return false;
    }
}
export const getUserData = (): string | null => {
    try {
        const data = localStorage.getItem('user-data')
        if(data != null){
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        return null;
    }
}
export const removeUserData = (): boolean => {
    try {
        localStorage.removeItem('user-token');
        return true;
    } catch (error) {
        return false;
    }
}