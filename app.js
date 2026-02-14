function exportPDF(){
  const data = `Nama: ${nama.value}
Kelas: ${kelas.value}
Juz: ${juz.value}
Total: ${total.innerText}
Akhir: ${akhir.innerText}`;

  const blob = new Blob([data], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Nilai_${nama.value||'santri'}.pdf`;
  a.click();

  resetForm();
}
