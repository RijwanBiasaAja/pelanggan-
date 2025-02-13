import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDies7HBA_N8xfk_8DJlM-EFbi_GTXDJpI",
  authDomain: "insan-cemerlang-996a1.firebaseapp.com",
  projectId: "insan-cemerlang-996a1",
  storageBucket: "insan-cemerlang-996a1.appspot.com",
  messagingSenderId: "137591161633",
  appId: "1:137591161633:web:e89f54d3cf2a29d9fdb460",
  measurementId: "G-B5KFGBXLMV"
};

//fungsi ambil daftar pelanggan
export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      nohape: dokumen.data().nohape
    })
  })

  return hasilkueri;
}
// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// fungsi menambah data pelanggan
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
      nama: nama,
      alamat: alamat,
      nohape: nohape
    })
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data pelanggan")
  } catch (error) {
    // menampilkan pesan gagal
    console.console.log("gagal menyimpan data pelanggan")
  }
  
}
    
  export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan", id))
}


export async function ubahPelanggan(id, namabaru, alamatbaru, nohapebaru) {
  await updateDoc(
    doc(basisdata, "pelanggan", id), { nama: namabaru, alamat: alamatbaru, nohape: nohapebaru }
  )

}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pelanggan", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}