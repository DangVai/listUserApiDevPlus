const API_URL = 'https://jsonplaceholder.typicode.com/users';
const ORIGINAL_USERS_KEY = 'originalUsers';
const ADDED_USERS_KEY = 'addedUsers';

export const api = {
    
    getAll: async () => {
        let originalUsers = JSON.parse(localStorage.getItem(ORIGINAL_USERS_KEY));
        if (!originalUsers || originalUsers.length === 0) {
            const res = await fetch(API_URL);
            originalUsers = await res.json();
            localStorage.setItem(ORIGINAL_USERS_KEY, JSON.stringify(originalUsers));
        }
        const addedUsers = JSON.parse(localStorage.getItem(ADDED_USERS_KEY)) || [];
        return [...originalUsers, ...addedUsers];
    },

    getOne: async (id) => {
        const users = await api.getAll();
        return users.find(user => user.id == id);
    },

    create: async (data) => {
        const addedUsers = JSON.parse(localStorage.getItem(ADDED_USERS_KEY)) || [];
        const allUsers = await api.getAll();
        const newId = Math.max(...allUsers.map(u => u.id)) + 1;
        const newUser = { ...data, id: newId };
        addedUsers.push(newUser);
        localStorage.setItem(ADDED_USERS_KEY, JSON.stringify(addedUsers));
        return newUser;
    },

    update: async (id, data) => {
        const originalUsers = JSON.parse(localStorage.getItem(ORIGINAL_USERS_KEY)) || [];
        const addedUsers = JSON.parse(localStorage.getItem(ADDED_USERS_KEY)) || [];
        let user = addedUsers.find(u => u.id == id);
        let isOriginal = false;
        if (!user) {
            user = originalUsers.find(u => u.id == id);
            isOriginal = true;
        }
        if (user) {
            Object.assign(user, data);
            if (isOriginal) {
                localStorage.setItem(ORIGINAL_USERS_KEY, JSON.stringify(originalUsers));
            } else {
                localStorage.setItem(ADDED_USERS_KEY, JSON.stringify(addedUsers));
            }
            return user;
        }
        throw new Error('User not found');
    },

    delete: async (id) => {
        const originalUsers = JSON.parse(localStorage.getItem(ORIGINAL_USERS_KEY)) || [];
        const addedUsers = JSON.parse(localStorage.getItem(ADDED_USERS_KEY)) || [];
        const filteredOriginal = originalUsers.filter(u => u.id != id);
        const filteredAdded = addedUsers.filter(u => u.id != id);
        localStorage.setItem(ORIGINAL_USERS_KEY, JSON.stringify(filteredOriginal));
        localStorage.setItem(ADDED_USERS_KEY, JSON.stringify(filteredAdded));
        return true;
    }
};
