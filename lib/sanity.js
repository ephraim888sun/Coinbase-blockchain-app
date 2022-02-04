import sanityClient from "@sanity/client";

export const client = sanityClient( {
    projectId: 'bp3ckv8r',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skDa2P13KlO7pkcrSX7JOik8FwxPMwtx3j9dbmPrOaSUwLV6rNJRrhds1vB8UgH2pP0IdVvXJlhoMqMQXrT0T6V38WvmTM5BVsPibJ8GIyrKsa4zoOMjQiSI4bD55eh4zHXmQszVUUqjEjgfFPDzXHTWhsZwJQPrn9KnwGf8YOO8B2laaDzD',
    useCdn: false,
})