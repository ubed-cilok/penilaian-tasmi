/* =========================
   STORAGE CONFIG
========================= */
const STORAGE_KEY = "DATA_TASMI_PWA";

/* =========================
   HELPER
========================= */
function ambilData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function simpanData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* =========================
   LOAD TABEL
========================= */
function muatTabel() {
  const data = ambilData();
  let html = "";

  data.forEach((r, i) => {
    html += `
      <tr>
        <td>${r[0]}</td>
        <td>${r[1]}</td>
        <td>${r[7]}</td>
        <td>${r[8]}</td>
        <td><b>${r[10]}</b></td>
        <td>
          <button class="btn-small" style="background:#ef4444;color:#fff"
            onclick="unduhPDF(${i})">PDF</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("isiTabel").innerHTML = html;
}

/* =========================
   SIMPAN DATA
========================= */
function simpan() {
  const h = hitung();

  const d = [
    nama.value,
    kelas.value,
    juz.value,
    [...document.querySelectorAll(".ktp")].map(i => i.value || 0).join(","),
    [...document.querySelectorAll(".ksp")].map(i => i.value || 0).join(","),
    h.tErr,
    h.sErr,
    h.nT,
    h.nS,
    h.total,
    h.akhir
  ];

  if (!d[0]) return alert("Nama wajib diisi!");

  const data = ambilData();
  data.push(d);
  simpanData(data);

  alert("Data tersimpan (Offline)");
  resetForm();
  muatTabel();
}

/* =========================
   PDF (client-side)
========================= */
function unduhPDF(index) {
  const r = ambilData()[index];

  const isi = `
Nama : ${r[0]}
Kelas : ${r[1]}
Nilai Tahfizh : ${r[7]}
Nilai Tahsin : ${r[8]}
Nilai Akhir : ${r[10]}
`;

  const blob = new Blob([isi], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Nilai_${r[0]}.txt`;
  a.click();
}

/* =========================
   EXCEL EXPORT (TETAP)
========================= */
function exportSemuaExcel() {
  const data = ambilData();
  const ws = XLSX.utils.aoa_to_sheet([
    ["Nama","Kelas","Juz","Hal","KesTaf","KesTas","ErrTaf","ErrTas","NilaiTaf","NilaiTas","Akhir"],
    ...data
  ]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Tasmi");
  XLSX.writeFile(wb, "Data_Tasmi.xlsx");
}
