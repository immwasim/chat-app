//const _ = require('lodash');

[
    {
        id: '',
        name: '',
        room: ''
    }
]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(roomName);

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id, name, room
        };
        this.users.push(user);

        return user;
    }

    removeUser(id) {
        var user = this.users.filter((user)=>user.id === id)[0];
        if(user){
            this.users = this.users.filter((u)=>{
                return u.id !== id
            })
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user)=>user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user)=>{
            return user.room === room
        })
        var names = users.map((user)=>{
            return user.name
        })
        
        return names;
    }
}

module.exports = { Users };