const expect = require('expect');
const {Users} = require('./users');


describe('Users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id:'1',
                name:'mike',
                room:'webdev'
            },
            {
                id:'2',
                name:'will',
                room:'interactive'
            },
            {
                id:'3',
                name:'Dan',
                room:'webdev'
            }
        ]
    })

    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id:'123',
            name:'waswas',
            room:'Tech room'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names from webdev', ()=>{
       var userList = users.getUserList('webdev');

        expect(userList).toEqual(['mike','Dan']);
    });

    it('should return names from interactive', ()=>{
        var userList = users.getUserList('interactive');
 
         expect(userList).toEqual(['will']);
     });

     it('should remove a user', ()=>{
        //use list data. Make sure array is same
        expect(users.users.length).toBe(3);
        var uid = '2';
        var user = users.removeUser(uid);
        expect(user.id).toBe(uid);
        expect(users.users.length).toBe(2);
     })

     it('should not remove a user', ()=>{
         //use non list data. Make sure array is same
         var uid = '1212';
         var user = users.removeUser(uid);
         expect(user).toBeUndefined();
         expect(users.users.length).toBe(3);
    })

    it('should find user', ()=>{
        //use list data. Make sure array is same
        var uid = '2';
        var user = users.getUser(uid);

        expect(user.id).toBe(uid);
   })

   it('should not find user', ()=>{
    //use non list data. Make sure return empty data
    var uid = '12';
    var user = users.getUser(uid);

    expect(user).toBeUndefined();
    })

}
)