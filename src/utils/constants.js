export const HOST = import.meta.env.VITE_SERVER_URL;

export const API = `${HOST}/api`;

export const AUTH_ROUTE = `${API}/auth`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const VERIFY_EMAIL_ROUTE = `${AUTH_ROUTE}/verify-email`;
export const SETUP_PROFILE_ROUTE = `${AUTH_ROUTE}/setup-profile`;
export const USER_INFO_ROUTE = `${AUTH_ROUTE}/user-info`;

export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

export const CONTACTS_ROUTE = `${API}/contacts`;
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/search`;
export const GET_CONTACTS_FOR_DM_ROUTE = `${CONTACTS_ROUTE}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/get-all-contacts`;

export const MESSAGES_ROUTE = `${API}/messages`;
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTE}/upload-file`;

export const CHANNELS_ROUTE = `${API}/channels`;
export const CREATE_CHANNEL_ROUTE = `${CHANNELS_ROUTE}/create-channel`;
export const GET_USER_CHANNELS_ROUTE = `${CHANNELS_ROUTE}/get-user-channels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNELS_ROUTE}/get-channel-messages`;