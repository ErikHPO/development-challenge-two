import axios from "axios";

const api = axios.create({
    baseURL: "https://hd35omzto6.execute-api.us-east-1.amazonaws.com/dev",
});

async function getAllUsers(){
    return await api.get('/users');
}

async function getUserById(id){
    return await api.get(`/user/${id}`);
}

async function createUser(user){
    return await api.post("/user", user);
}

async function updateUser(id, data){
    return await api.put(`/user/${id}`, data);
}

async function removeUser(id){
    return await api.delete(`/user/${id}`, 
    {
    }
    )

}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser

}