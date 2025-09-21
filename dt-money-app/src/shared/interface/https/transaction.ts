export interface Transaction{
    id: number,
      value: number,
      description: string,
      categoryId: number,
      typeId: number,
      createdAt: string,
      updatedAt: string,
      deletedAt: string
      type: {
        id: number,
        name: string
      },
      category: {
        id: number,
        name: string
      },
}