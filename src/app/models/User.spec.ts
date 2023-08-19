import { User } from "./User.model";

describe('User', ()=>{
    it('Créer une Instance', ()=>{
        const user = new User();
        expect(user).toBeTruthy();
    });

    it('Initialiser User', ()=>{
        const user = new User();
        expect(user.id).toBeUndefined();
        expect(user.email).toBeUndefined();
        expect(user.name).toBeUndefined();
        expect(user.username).toBeUndefined();
        expect(user.password).toBeUndefined();
        expect(user.roles).toBeUndefined();
    })
})