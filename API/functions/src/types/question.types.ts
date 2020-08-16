interface Answer {
    id: string,
    description: string,
    dateCreated: string,
    dateModified: string,
    name: string,
    upvotes: number,
}

export interface Question {
    id: string,
    userId: string,
    description: string,
    dateCreated: string,
    dateModified: string,
    name: string,
    upvotes: number,
    tags: string[],
    answers: Answer[]
}

export type addQuestion = Pick<
    Question,
    'description' | 'name' | 'upvotes' | 'tags' | 'answers' | 'userId'
>;

export type editQuestion = addQuestion & { id: string };