import { Routes } from "@angular/router";

export const full_content: Routes = [
    {
        path: '',
        loadChildren: () => import('../public/public.module').then(map => map.PublicModule),
    }
]