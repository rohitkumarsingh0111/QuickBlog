import ImageKit from "imagekit";


var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKT_URL_ENDPOINT
})

export default imagekit;