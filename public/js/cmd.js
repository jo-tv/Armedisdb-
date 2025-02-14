// تحميل الجدول مع التنسيقات من LocalStorage
window.onload = function () {
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
        const tableContainer = document.getElementById("myTable");
        tableContainer.innerHTML = savedData;

        // إعادة تعيين خاصية التعديل للخلايا
        const cells = document.querySelectorAll("#myTable td");
    }
};

// حفظ الجدول مع التنسيقات في LocalStorage
function saveTable() {
    const table = document.getElementById("myTable");
    if (!table) {
        alert("لم يتم العثور على جدول لحفظه!");
        return;
    }

    // استخراج الجدول كـ HTML كامل
    const tableHTML = table.outerHTML;

    // تخزين الجدول في LocalStorage
    localStorage.setItem("tableData", tableHTML);
    alert("تم حفظ الجدول مع التنسيقات بنجاح!");
}

// مسح بيانات الجدول من LocalStorage
function clearLocalStorage() {
    localStorage.removeItem("tableData"); // إزالة الجدول من LocalStorage
    alert("تم مسح البيانات المخزنة بنجاح!");

    // تحديث الصفحة لإعادة ضبط الجدول
    window.location.reload();
}

// دالة لتغيير قيم الخلايا
function editCell(cell) {
    const currentValue = cell.textContent; // قيمة الخلية الحالية
    const input = document.createElement("input"); // إنشاء عنصر إدخال
    input.type = "Number";
    input.value = currentValue;

    // استبدال النص بالعنصر الإدخال
    cell.textContent = "";
    cell.appendChild(input);

    // عند فقدان التركيز أو الضغط على Enter يتم الحفظ
    input.addEventListener("blur", () => {
        cell.textContent = input.value;
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            cell.textContent = input.value;
        }
    });

    // تركيز تلقائي على الحقل
    input.focus();
}
function printTable() {
    const table = document.getElementById("myTable").outerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(
        "<html><head><title>طباعة الجدول</title></head><body>"
    );
    newWindow.document.write(table);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
}

// دالة لتصدير إلى Excel

function exportExcel() {
    const title = document.getElementById("title");
    if (title.value === "") {
        alert("Veuillez nommer le fichier avant de l'enregistrer.");
        return;
    }
    const table = document.getElementById("myTable");
    const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Sheet1"
    });
    XLSX.writeFile(workbook, title.value + ".xlsx");
}

//دالة البحث
function searchTable() {
    const input = document.getElementById("query");
    const filter = input.value.toLowerCase(); // تحويل النص إلى حروف صغيرة للتسهيل
    const table = document.getElementById("myTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        // البدء من الصف الثاني لتجنب الرأس
        const cells = rows[i].getElementsByTagName("td");
        let found = false;

        // البحث في جميع الأعمدة
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }

        // إظهار أو إخفاء الصف بناءً على نتيجة البحث
        rows[i].style.display = found ? "" : "none";
    }
}
