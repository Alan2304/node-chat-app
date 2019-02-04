const expect = require('expect');

//Import isRealString
const {isRealString} = require('./validation');

//isRealString
    //Should reject non-string values
    //should reject string with only spaces
    //Should allow string with non-space characters

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var res = isRealString('   Alan    ');
        expect(res).toBe(true);
    });

})