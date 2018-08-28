const expect = require('expect');
var { generateMessage } = require('./message');

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