import { ItemsRepository } from "./ItemsRepository";

export class ItemRepositoryMemory implements ItemsRepository {
    async getItems(): Promise<any> {
        return ([ 
            {
                description:"item 1",
                price: 1000
            }
        ])
    }
}