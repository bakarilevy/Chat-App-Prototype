import {create} from "zustand";

export const useAuthStore = create((set)=>({
    authUser: {name: "John Doe", _id:123, age:25},
    isLoggedIn: false,
    login: () => {
        set({isLoggedIn: true});
    }
}));