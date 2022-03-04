export default function authHeader() {
    //console.log(JSON.parse(localStorage.getItem('token')))
      let user = JSON.parse(localStorage.getItem('token'));
         
      if (user) {
        return { Authorization: 'Bearer ' + user };
      } else {
        return {};
      }
    }