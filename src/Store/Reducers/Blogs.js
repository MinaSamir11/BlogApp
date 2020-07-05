import * as types from '../Actions/types';

import initialState from './initialState';

export default function(state = initialState.Blogs, action) {
  switch (action.type) {
    case types.GET_BLOGS: {
      return {
        ...state,
        AllBlogs: action.userData.blogs,
        StatusBlogResponse: action.userData.response,
      };
    }
    case types.UPDATE_RESPONSE: {
      return {
        ...state,
        StatusAddPostResponse: action.response,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
