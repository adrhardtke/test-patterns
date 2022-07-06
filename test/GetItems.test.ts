import GetItems from "../src/GetItems"
import { ItemRepositoryMemory } from "../src/ItemRepositoryMemory"
import ItemsRepositoryDB from "../src/ItemsRepositoryDB"
import sinon from "sinon"

test("deve obter os itens", async () => {
    const itemsRepository = new ItemsRepositoryDB()
    const getItems = new GetItems(itemsRepository)
    const items = await getItems.execute()
    expect(items).toHaveLength(3)
    expect(items[0].description).toBe("guitarra")
    expect(items[0].price).toBe(1000)
})

test("deve obter os itens com um repository fake", async () => {
    const itemsRepository = new ItemRepositoryMemory()
    const getItems = new GetItems(itemsRepository)
    const items = await getItems.execute()
    expect(items).toHaveLength(3)
    expect(items[0].description).toBe("guitarra")
    expect(items[0].price).toBe(1000)
})

test("deve obter os itens com um stub", async () => {
    const itemsRepository = new ItemsRepositoryDB()
    sinon.stub(itemsRepository, "getItems").returns(Promise.resolve([{description: "item1", price: 1000}]))
    const getItems = new GetItems(itemsRepository)
    const items = await getItems.execute()
    expect(items).toHaveLength(1)
    expect(items[0].description).toBe("item1")
    expect(items[0].price).toBe(1000)
    sinon.restore()
})

test("deve obter os itens com um spy", async () => {
    const itemsRepository = new ItemsRepositoryDB()
    const spy = sinon.spy(itemsRepository, "getItems")
    const getItems = new GetItems(itemsRepository)
    const items = await getItems.execute()
    expect(items).toHaveLength(1)
    expect(items[0].description).toBe("item1")
    expect(items[0].price).toBe(1000)
    sinon.assert.calledOnce(spy)
    sinon.restore()
})

test("deve obter os itens com mock", async () => {
    const itemsRepository = new ItemsRepositoryDB()
    const getItems = new GetItems(itemsRepository)
    const mock = sinon.mock(getItems)
    mock.expects("execute").returns(Promise.resolve([{description: "item1", price: 1000}]))
    await getItems.execute()
    mock.verify() // ira verificar se o mock foi chamado
    sinon.restore()
})


/**
 * fake: houve toda uma implementaçao da classe, e por conta da inversao de dependencia e do polimorfismo
 * foi possivel fazer a troca das classes. alem disso, o fake tem vida propria... poderia ter criado outros
 * metodos, eventualmente ate uma implementacao
 * 
 * stub: apenas sobreescreveu o metodo getItems para retornar algo fixado e que queriamos
 * 
 * spy: usado quando queremos ver se algo foi chamado
 * 
 * mock: envolve todo o objeto e define nele e faz a verificaçao do todo
 */