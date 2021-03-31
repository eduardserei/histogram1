import { gql } from 'apollo-boost';

export const GET_ALL_POSTS = gql`
    {
        allPosts(count: 100) {
            createdAt
        }
    }
`