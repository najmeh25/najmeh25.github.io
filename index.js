
async function fetchData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/najmeh25/najmeh25.github.io/refs/heads/main/index.json");
        allData = await response.json();  
        console.log(allData);  
        displayData(allData);  
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function searchIngredient() {
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();  
    
    console.log("Searching for: ", searchTerm);  
    
   
    if (allData.length > 0) {
        const filteredData = allData.filter(item => 
            item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
            item.name.toLowerCase().includes(searchTerm)  
        );
        
        console.log("Filtered Data: ", filteredData);  
        
        displayData(filteredData);
    }
}


function displayData(data) {
    const dataList = document.getElementById("data-list");
    dataList.innerHTML = ""; 
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


document.getElementById("search-btn").addEventListener("click", searchIngredient);
fetchData();