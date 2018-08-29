const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message objects', () =>{
        //store res in variable
        var from = 'Jim';
        var text = 'a message';
        var message = generateMessage(from, text);
        //assert from match
        //assert text match
        //assert createdAt is a number
        expect(typeof (message.createdAt)).toBe('number');
        expect(message).toMatchObject(
            {
                from,
                text
            })
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () =>{
        //store res in variable
        var from = 'Jim';
        var latitude = 1;
        var longitude = 2;
        var url = 'https://www.google.com/maps/@1,2';
        
        var message = generateLocationMessage(from, latitude, longitude);
  
        expect(typeof (message.createdAt)).toBe('number');
        expect(message).toMatchObject(
            {
                from,
                url
            })
    })
})