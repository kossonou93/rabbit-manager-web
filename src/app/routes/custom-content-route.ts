import { Routes } from "@angular/router";

export const custom_content : Routes = [
    {
        path: '',
        loadChildren: () => import('../protected/protected.module').then(map => map.ProtectedModule),
    }
]