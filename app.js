const KEY='DATA_TASMI';
function muatTabel(){}
function simpan(){
  const h=hitung();
  const d=[nama.value,kelas.value,juz.value,h.total,h.akhir];
  let data=JSON.parse(localStorage.getItem(KEY))||[];
  data.push(d);
  localStorage.setItem(KEY,JSON.stringify(data));
  alert('Tersimpan');
}
