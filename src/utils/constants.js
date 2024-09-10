export const HOST = import.meta.env.VITE_SERVER_URL;

export const API = `${HOST}/api`;

export const AUTH_ROUTE = `${API}/auth`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const VERIFY_EMAIL_ROUTE = `${AUTH_ROUTE}/verify-email`;
export const SETUP_PROFILE_ROUTE = `${AUTH_ROUTE}/setup-profile`;
export const USER_INFO_ROUTE = `${AUTH_ROUTE}/user-info`;

export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

export const colors = [
    "bg-[#712C4A57] text-[#FF006E] border-[1px] border-[#FF006FAA]",
    "bg-[#FFD60A2A] text-[#FFD60A] border-[1px] border-[#FFD60ABB]",
    "bg-[#06D6A02A] text-[#06D6A0] border-[1px] border-[#06D6A0BB]",
    "bg-[#4CC9F02A] text-[#4CC9F0] border-[1px] border-[#4CC9F0BB]",
];

export const getColor = (color) => {
    if(color >= 0 && color < colors.length) {
        return colors[color];
    }
    return colors[0];
}