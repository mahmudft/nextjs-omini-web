import { post } from "./request.js";

export const login = (data) => post("/login", data);

export const register = (data) => post("/signup", data);

export const logOut = () => post("/logOut");
