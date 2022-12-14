export const setAuthData = (data) => {
    clearLocalStorage("user")
    localStorage.setItem("user", JSON.stringify(data))
  
}

export const getAuthData = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user?.bearer;


    if(user === "undefined"){
        user = null
    }

    if(user?.bearer === "undefined"){
        token = null
    }
    return {
        "user": user,
        "token": token,
    }
}
   
   
export const clearLocalStorage = (items) =>{
    let keys = []
    if(items === undefined){
        keys = Object.keys(localStorage)
    }else {
        keys = items.split(",")
    }

    for(let i = 0;i < keys.length;i++){
        localStorage.removeItem(keys[i])
    }
}