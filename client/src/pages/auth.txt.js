


// ASSUMED THAT FIREBASE IS CONFIGURED IN firebase.config.js

/*
    STEP: 1
        
        // INGREDIENTS----------------------------------
        const authProvider = new GoogleAuthProvider();
        const firebaseAuth = getAuth(firebaseApp);
        //----------------------------------------------
















    STEP: 2
    
        // INSIDE SignIn.js

        // SIGN IN WITH GOOGLE FOR FIRST TIME---------------------------------------------------
        const signInWithGoogle = async()=>{
            await signInWithPopup(firebaseAuth, authProvider).then((userInfo)=>{

                //IF AUTH STATE IS TRUE IN LOCALSTORAGE
                if(userInfo){
                    setAuth(true);
                    window.localStorage.setItem('auth', 'true');
                    
                    firebaseAuth.onAuthStateChanged((userInfo)=>{

                        // IF THERE IS AN USER THAN NAVIGATE TO HOME PAGE
                        if(userInfo){
                            userInfo.getIdToken().then((token)=>{
                                console.log(token);
                            })
                            navigate('/')
                        }
                            // ELSE NAVIGATE TO SIGNIN PAGE
                            else{
                            setAuth(false);
                            navigate('/signin');
                        }
                    })
                }
            });
        }
        //--------------------------------------------------------------------------------------












    STEP: 3

        // INSIDE App.js

        // SIGN IN WITH GOOGLE-------------------------------------------------------------------
            
            const firebaseAuth = getAuth(firebaseApp);
            const [auth,setAuth] = useState(false || window.localStorage.getItem('auth') === 'true');

            useEffect(() => {
              firebaseAuth.onAuthStateChanged((userInfo)=>{

                if(userInfo){       -------------IF AUTHENTICATION STATE CHANGES FOR PARTICULAR USER THEN GET TOKEN
                  userInfo.getIdToken().then((token)=>{
                    console.log(token)
                  })
                }
                
                else{               ----------------ELSE SET FALSE TO AUTH IN LOCALSTORAGE
                  setAuth(false);
                  window.localStorage.setItem('auth', 'false');
                }
              })
            }, [])
        //--------------------------------------------------------------------------------------


*/