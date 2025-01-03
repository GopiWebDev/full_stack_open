const typeDefs = `#graphql
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        title: String!,
        published: Int!,  
        author: Author!,
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!,
        bookCount: Int!
        born: Int
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    
    type Mutation{
        addBook(
            title: String!,
            author: authorInput!,
            published: Int!,
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!,
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    input authorInput {
        name: String!
    }

    type Subscription {
        bookAdded: Book!
    }
`

export default typeDefs
