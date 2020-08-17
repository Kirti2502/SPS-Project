export interface Answer {
    id: string,
    description: string,
    dateModified: string,
    name: string,
    upvotes: number,
}

export type addAnswer = Pick<
    Answer,
    'description' | 'name' | 'upvotes'
> & { userId: string, questionId: string };

export type editAnswer = addAnswer & { id: string };