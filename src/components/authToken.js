const authToken=()=>{
    const token=localStorage.getItem('token');
    if(token!==null)
    {
        const config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        return config;
    }
}

export default authToken;