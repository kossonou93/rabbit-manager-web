import { Rabbit } from "./Rabbit.model"

describe('Rabbit', ()=>{
    it('Créer Rabbit', ()=>{
        const rabbit = new Rabbit();
        expect(rabbit).toBeTruthy();
    });

    it('Initialiser Rabbit', ()=>{
        const rabbit = new Rabbit();
        expect(rabbit.id).toBeUndefined();
        expect(rabbit.name).toBeUndefined();
        expect(rabbit.imagePath).toBeUndefined();
        expect(rabbit.status).toBeUndefined();
    })
})