export const getUserLocation = (callback, errorCallback) => {
    navigator.geolocation.getCurrentPosition((position) => {
        callback(position)
    }, (error) => {
        errorCallback(error)
    })
}