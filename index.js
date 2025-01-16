
async function fetchData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/najmeh25/najmeh25.github.io/refs/heads/main/index.json");
        allData = await response.json();  // داده‌ها را ذخیره می‌کنیم
        console.log(allData);  // چاپ داده‌ها برای بررسی
        displayData(allData);  // نمایش داده‌ها پس از دریافت
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// این تابع جستجو را انجام می‌دهد و غذاها را فیلتر می‌کند
function searchIngredient() {
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();  // جستجو با trim و toLowerCase
    
    console.log("Searching for: ", searchTerm);  // چاپ عبارت جستجو برای بررسی
    
    // فقط در صورتی که داده‌ها موجود باشند، فیلتر را انجام می‌دهیم
    if (allData.length > 0) {
        const filteredData = allData.filter(item => 
            item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
            item.name.toLowerCase().includes(searchTerm)  // اضافه کردن فیلتر برای نام غذا
        );
        
        console.log("Filtered Data: ", filteredData);  // چاپ داده‌های فیلتر شده
        
        displayData(filteredData);
    }
}

// نمایش داده‌ها
function displayData(data) {
    const dataList = document.getElementById("data-list");
    dataList.innerHTML = "";  // پاک کردن داده‌های قبلی قبل از نمایش جدید

    if (data.length === 0) {
        dataList.innerHTML = "<li>No results found.</li>";
    } else {
        data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${item.name}</strong> - ${item.type} - $${item.price}<br>
                Ingredients: ${item.ingredients.join(", ")}
            `;
            dataList.appendChild(listItem);
        });
    }
}

// اضافه کردن لیسنر برای دکمه جستجو
document.getElementById("search-btn").addEventListener("click", searchIngredient);

// بارگذاری داده‌ها هنگام بارگذاری صفحه
fetchData();