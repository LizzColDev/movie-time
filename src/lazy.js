let callback =(entries) => {
    entries.forEach(element => { 
        if(element.isIntersecting){
            console.log(element.src)
        }
    })
}
let observer = new IntersectionObserver(callback)

export const registerImage = (imagen) => {
    observer.observe(imagen);
}