import Connection from "../src/Connection"

test(`deve retornar dados do banco de dados`, async () => {
    const connection = new Connection()
    const items = await connection.query("select * from item",[])
    expect(items).toHaveLength(3)
})