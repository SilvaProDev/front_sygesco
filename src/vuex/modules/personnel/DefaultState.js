const defaultState = {
    utilisateur:[],
    affectation:[],
    permission:[],
    role:[],

    user: localStorage.getItem('user'),
    profile_user:[],
    token:'',
    isLoggedIn: !!localStorage.getItem('token'),
    loadingAffectation:false,
    loadingUser:false,
    
}

export default defaultState;