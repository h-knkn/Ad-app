import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    signOutAction,
    signInAction
} from "./actions";
import {push} from 'connected-react-router'


const usersRef = db.collection('users')

const isValidEmailFormat = (email) => {
    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    return regex.test(email)
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                .then(snapshot =>{
                    const data = snapshot.data()

                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))
                }) 
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if(username === '' || email === ''|| password ==='' || confirmPassword === '') {
            alert('必須項目が未入力です。');
            return false
        }
        if(!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。もう1度お試しください。')
            return false
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                // dispatch(showLoadingAction("Sign up..."))
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        customer_id: "",
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        // payment_method_id: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    };

                    usersRef.doc(uid).set(userInitialData).then(async () => {
                        // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        // await sendThankYouMail({
                        //     email: email,
                        //     userId: uid,
                        //     username: username,
                        // });
                        dispatch(push('/'))
                        // dispatch(hideLoadingAction())
                    })
                }
            }).catch((error) => {
                alert('アカウント登録に失敗しました。もう1度お試しください。')
                throw new Error(error)
            })
    }
}


export const signIn = (email, password) => {
    return async (dispatch) => {

        if(email === ''|| password ==='') {
            alert('必須項目が未入力です。');
            return false
        }
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const userState = result.user

                if(userState) {
                    const uid = userState.uid

                    db.collection('users').doc(uid).get()
                    .then(snapshot =>{
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: data.uid,
                            username: data.username
                        }))
                        dispatch(push('/'))
                    })
                }
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
        .then(() => {
            console.log("hello");
            dispatch(signOutAction());
            dispatch(push('/signin'))
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ""){
            alert("メールアドレスを入力してください")
            return false
        }
        if (!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('登録されていないメールアドレスです。もう一度ご確認ください。')
                })
        }
    }
}