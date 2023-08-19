import { Role } from "./Role.model"

describe('Role', ()=>{
it('Créer une Instance', ()=>{
    const role = new Role();
    expect(role).toBeTruthy();
});

it('Initialiser Role', ()=>{
    const role = new Role();
    expect(role.id).toBeUndefined();
    expect(role.name).toBeUndefined();
})
})