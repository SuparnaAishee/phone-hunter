// toggle spinner
const getSpinner = (control) => {
  document.getElementById("spinner").style.display = control;
};
// toggle main section
const main = (control) => {
  document.getElementById("main").style.display = control;
};


// Getting phone
const getPhone = () => {
  // getting input value
  const searchResult = document.getElementById("search-result");
  const searchValue = searchResult.value.toLowerCase();
  // handle if searchbox is empty//
  if (searchValue == "") {
    alert("please write something ");
  } else {
    // fetching  url
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => showResult(data.data));
    getSpinner("block");
    main("none");
  }
  searchResult.value = "";
};
// show phones
const showResult = (phones) => {
  const divcontainer = document.getElementById("container");
  divcontainer.textContent = "";
  const detail = (document.getElementById("details").textContent = "");
  // handle if no phone found
  if (phones.length === 0) {
    alert("no result found");
    getSpinner("none");
  } else {
    phones?.slice(0, 20).forEach((phone) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="col">
            <div class="col">
    <div class="card h-50 w-70 card-design border border-success">
      <img src="${phone.image}" alt="${phone.phone_name}" class="card-img-top img-fluid"
        style="height: 370px;  border-radius: 10px" alt="...">
      <div class="card-body">
        <table class="table">
          <tbody class="text-start">
            <tr>
              <th>Phone Name</th>
              <th>:</th>
              <th>${phone.phone_name}</th>
            </tr>
            <tr>
              <th>Brand</th>
              <th>:</th>
              <th>${phone.brand}</th>
            </tr>
            <tr>
              <th>Phone slug</th>
              <th>:</th>
              <th>${phone.slug}</th>
            </tr>

          </tbody>

        </table>
        <div class="d-flex justify-content-center align-items-center">
          <button onclick='showMore("${phone.slug}")' class=" secondary btn btn details-btn">Details</button>
        </div>


      </div>
    </div>
  </div>
          </div>
    `;

      divcontainer.appendChild(div);
    });
    getSpinner("none");
    main("block");
  }
};
// getting id
const showMore = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => detail(data.data));
};
// showing more results by id
const detail = (id) => {
  console.log(id);
  const detail = document.getElementById("details");
  detail.textContent = "";

  const detailDiv = document.createElement("div");
  detailDiv.classList.add("seePhonepushDetails");
  detailDiv.innerHTML = `
  <div class="card flex-lg-row ">
  <div class="d-flex align-items-center justify-content-center"> <img style="width:30rem;" src="${
    id.image
  }" class="card-img-top img-fluid" alt="..."></div>
   <div class="card-body">
    <h5 class="card-title"><b>Brand:</b> ${id.brand}</h5>
    <p class="card-text"><b>Model:</b> ${id.name}</p>
  
   <ul class="list-group list-group-flush">
   <li class="list-group-item"><p><b>Release:</b> ${
     id.releaseDate ? id.releaseDate : "not available"
   }</p></li>
    <li class="list-group-item"><p><b>Chipset:</b> ${
      id.mainFeatures?.chipSet ? id.mainFeatures?.chipSet : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>Display:</b> ${
      id.mainFeatures?.displaySize
        ? id.mainFeatures?.displaySize
        : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>Storage:</b> ${
      id.mainFeatures?.memory ? id.mainFeatures?.memory : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>Sensors:</b> ${
      id.mainFeatures.sensors
    }</p></li>
    <li class="list-group-item"><p><b>Wifi:</b> ${
      id.others?.WLAN ? id.others?.WLAN : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>Bluetooth:</b> ${
      id.others?.Bluetooth ? id.others?.Bluetooth : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>Radio:</b> ${
      id.others?.Radio ? id.others?.Radio : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>NFC:</b> ${
      id.others?.NFC ? id.others?.NFC : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>GPS:</b> ${
      id.others?.GPS ? id.others?.GPS : "no information"
    }</p></li>
    <li class="list-group-item"><p><b>USB:</b> ${
      id.others?.USB ? id.others?.USB : "no information"
    }</p></li>
     </ul>
  </div>
</div>
  
  `;
  detail.appendChild(detailDiv);
};
