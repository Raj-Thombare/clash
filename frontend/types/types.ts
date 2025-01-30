type ClashFormType = {
    title?: string;
    description?: string;
};

type ClashFormTypeError = {
    title?: string;
    description?: string;
    expire_at?: string;
    image?: string;
}

type ClashType = {
    id: number;
    user_id: number;
    title: string;
    description: string;
    expire_at: string;
    created_at: string;
    image: string;
    clashItem: Array<ClashItem>;
    clashComments: Array<ClashComment>;
}

type ClashItemForm = {
    image: File | null
}

type ClashItem = {
    id: number;
    count: number;
    image: string;
}

type ClashComment = {
    id: number,
    comment: string;
    created_at: string
}