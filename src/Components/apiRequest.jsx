const apiRequest = async (url= '', optionsObj = null, errMsg = null) => {
    try {
        const res = await fetch(url, optionsObj)
        if (!res.ok) throw Error('There is a fetch request error, please reload the app.')
    } catch (err) {
        errMsg = err.message()
    } finally {
        console.log(errMsg)
    }
}


export default apiRequest;
