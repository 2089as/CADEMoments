import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, FETCH_POST, START_LOADING, END_LOADING,COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [], post: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };  // Not action.payload.data
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        };
      
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};
