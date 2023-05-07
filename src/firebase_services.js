// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, ref, get, set, onValue, update, child } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1e2N44wWFCaz1IQDzz_AfXDfasFsS6Ac",
  authDomain: "unihub-a1a66.firebaseapp.com",
  databaseURL: "https://unihub-a1a66-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unihub-a1a66",
  storageBucket: "unihub-a1a66.appspot.com",
  messagingSenderId: "26189389271",
  appId: "1:26189389271:web:3b53beeccbeef5295e7f92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()
const db = getDatabase()

// add-service functions

export function writeToDatabase() {
  const serviceName = document.querySelector("#service-name-input").value
  const serviceDesc = document.querySelector("#service-desc-input").value
  const priceBasic = document.querySelector("#basic").value
  const priceStandard = document.querySelector("#standard").value
  const pricePremium = document.querySelector("#premium").value
  const dbRef = ref(db)


  get(child(dbRef, `counter`)).then((snapshot) => {
    let count = Number(snapshot.val())
    count++

    const reference = ref(db, `products/${count}`)


    const fileItem = document.querySelector("#image_input").files[0]
    const metadata = {
      contentType: fileItem.type
    }
    const imageRef = sref(storage, `products/#${count}`)
    uploadBytes(imageRef, fileItem, metadata).then((snapshot) => {
      console.log("Uploaded image.")
      getDownloadURL(imageRef).then((url) => {
        set(reference, {
          imgURL: url,
          id: count,
          serviceName: serviceName,
          serviceDesc: serviceDesc,
          priceBasic: priceBasic,
          priceStandard: priceStandard,
          pricePremium: pricePremium
        })
        console.log("Items written in database.")
        update(ref(db, `/`), { counter: count })
        console.log("Counter updated.")
      })
    })
  })
}

//services functions


export function addItems() {
  get(child(ref(db), "products")).then((snapshot) => {
    snapshot.forEach(childSnapshot => {
      const current = childSnapshot.val()

      const container = document.createElement("a")
      container.setAttribute("id", `product-${current.id}`)
      container.setAttribute("class", "service-item-container")
      container.setAttribute("href", "buy-services.html")

      const image = document.createElement("img")
      image.setAttribute("id", `service-img-${current.id}`)
      image.setAttribute("src", current.imgURL)

      const descContainer = document.createElement("div")
      descContainer.setAttribute("class", "description-container")

      const descTitle = document.createElement("div")
      descTitle.setAttribute("class", "description-title")

      const headerTitle = document.createElement("h3")
      headerTitle.setAttribute("class", "desc-title")
      headerTitle.innerHTML = current.serviceName

      const author = document.createElement("p")
      author.setAttribute("id", "author-id")

      const priceContainer = document.createElement("div")
      priceContainer.setAttribute("class", "price")

      const price = document.createElement("p")
      price.setAttribute("id", "price")
      price.innerHTML = `Starts at PHP ${current.priceBasic}`;

      descTitle.appendChild(headerTitle)
      descTitle.appendChild(author)
      priceContainer.appendChild(price)
      descContainer.appendChild(descTitle)
      descContainer.appendChild(priceContainer)
      container.appendChild(image)
      container.appendChild(descContainer)

      container.addEventListener('click', () => {
        localStorage.setItem("prodRef", current.id)
      })

      const main = document.querySelector(".services-container")
      main.appendChild(container)
    })
  })

}

//buy-services function

export function readFromDatabase(id) {
  const basicBtn = document.getElementById('basic-btn');
  const standardBtn = document.getElementById('standard-btn');
  const premiumBtn = document.getElementById('premium-btn');
  const typeContainer = document.querySelector('.type-container');
  const priceContainer = document.querySelector('.price-container');


  const img = document.querySelector("#disp-img")
  const desc = document.querySelector("#desc")
  const price = document.querySelector("#price")
  const dbRef = ref(db, `products/`)

  get(child(dbRef, id)).then((snapshot) => {
    const productJson = snapshot.val()
    img.src = productJson.imgURL
    let priceList = [productJson.priceBasic, productJson.priceStandard, productJson.pricePremium]
    desc.innerHTML = productJson.serviceDesc

    basicBtn.addEventListener('click', () => {
      basicBtn.classList.add('box-shadow');
      standardBtn.classList.remove('box-shadow');
      premiumBtn.classList.remove('box-shadow');
      typeContainer.querySelector('p').textContent = 'Basic';
      priceContainer.querySelector('p').textContent = `PHP ${priceList[0]}`;
    })

    standardBtn.addEventListener('click', () => {
      basicBtn.classList.remove('box-shadow');
      standardBtn.classList.add('box-shadow');
      premiumBtn.classList.remove('box-shadow');
      typeContainer.querySelector('p').textContent = 'Standard';
      priceContainer.querySelector('p').textContent = `PHP ${priceList[1]}`;
    })

    premiumBtn.addEventListener('click', () => {
      typeContainer.querySelector('p').textContent = 'Premium';
      priceContainer.querySelector('p').textContent = `PHP ${priceList[2]}`;
      basicBtn.classList.remove('box-shadow');
      standardBtn.classList.remove('box-shadow');
      premiumBtn.classList.add('box-shadow');
    })

  })

}