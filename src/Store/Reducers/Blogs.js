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
    case types.UPDATE_RESP_ADD_POST: {
      return {
        ...state,
        StatusAddPostResponse: action.response,
      };
    }
    case types.UPDATE_RESPONSE_BLOGS: {
      return {
        ...state,
        StatusBlogResponse: action.response,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
