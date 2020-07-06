import * as types from './types';

import Api from '../../Utils/Api';

import * as RootNavigation from '../../Navigation/RootNavigation';

export const Get_AllUsersBlogs = () => {
  return async dispatch => {
    console.log('Called');
    try {
      // let UsersResponse = await Api.get(`MinaSamir11/UserProfileAPi/data`);

      // let PostsResponse = await Api.get(`MinaSamir11/PostsApi/Posts`);

      let UsersResponse = await Api.get('http://192.168.1.3:4000', `/Users`);

      let PostsResponse = await Api.get('http://192.168.1.3:3000', `/Posts`);

      if (UsersResponse && PostsResponse) {
        let AllBlogs = [];

        for (var i = 0; i < PostsResponse.data.length; i++) {
          let Blog = PostsResponse.data[i];

          let user = UsersResponse.data.find(User => {
            return User._id === PostsResponse.data[i]['_id'];
          });

          Blog.Name = user.Name;

          Blog.Photo = user.Photo;

          const date1 = new Date(PostsResponse.data[i]['Date']);
          const date2 = new Date();
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          Blog.DaysLeftPost =
            diffDays - 1 < 30
              ? diffDays - 1 == 0
                ? 'Today'
                : diffDays - 1 + 'd'
              : 'Month(s) ago';

          AllBlogs.push(Blog);
        }

        AllBlogs.sort(function(a, b) {
          var dateA = new Date(a.Date),
            dateB = new Date(b.Date);
          return dateA - dateB;
        });

        dispatch(
          setBlogs({
            blogs: AllBlogs.reverse(),
            response: 200,
          }),
        );
        console.log('Dispatch');
      }
    } catch (ex) {
      dispatch(setResponseBlogs(50));
      console.log('Ex', ex);
    }
  };
};

export const AddPost = Post => {
  return async (dispatch, getState) => {
    try {
      // let response = await Api.post(`MinaSamir11/PostsApi/Posts`, Post);
      let response = await Api.post('http://192.168.1.3:3000', `/Posts`, Post);

      // we can make anthor request to GET all posts (Refresh our array of posts) even any one else add post
      if (response) {
        let temp = [...getState().Blogs.AllBlogs];

        temp.unshift({
          ...response.data,
          DaysLeftPost: 'Today',
          Name: getState().Auth.UserInfo['Name'],
          Photo: getState().Auth.UserInfo['Photo'],
        });

        dispatch(
          setBlogs({
            blogs: temp,
            response: 200,
          }),
        );
        RootNavigation.navigate('BlogsScreen');
      }
    } catch (ex) {
      console.log('Ex', ex);
      dispatch(setResponseAddPost(500));
    }
  };
};

const setBlogs = userState => {
  return {
    userData: userState,
    type: types.GET_BLOGS,
  };
};

const setResponseBlogs = response => {
  console.log('UPDATE', response);
  return {
    response: response,
    type: types.UPDATE_RESPONSE_BLOGS,
  };
};

const setResponseAddPost = response => {
  return {
    response: response,
    type: types.UPDATE_RESP_ADD_POST,
  };
};
