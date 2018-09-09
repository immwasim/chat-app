const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
    it('should reject non string values', () =>{
        var str = 98;

        var boolIsRealString = isRealString(str);
        expect(typeof (boolIsRealString)).toBe('boolean');
        expect(boolIsRealString).toBe(false);
    })
    it('should reject strings with only spaces', () =>{
        var str = '     ';

        var boolIsRealString = isRealString(str);
        expect(typeof (boolIsRealString)).toBe('boolean');
        expect(boolIsRealString).toBe(false);
        
    })
    it('should alow strings with non-space characters', () =>{
        var str = '  fdf ';

        var boolIsRealString = isRealString(str);
        expect(typeof (boolIsRealString)).toBe('boolean');
        expect(boolIsRealString).toBe(true);
    })
})