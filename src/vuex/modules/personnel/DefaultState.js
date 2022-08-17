const defaultState = {
    utilisateur:[],
    affectation:[],
    permission:[],
    on_line_user:[],
    role:[],

    user: localStorage.getItem('user'),
    profile_user:[],
    token:'',
    isLoggedIn: !!localStorage.getItem('token'),
    loadingAffectation:false,
    loadingUser:false,
    
}

export default defaultState;