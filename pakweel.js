const createFiltersCheckboxes = () => {
    for (let [index, filter] of filters.entries()) {
        var accordion = document.createElement('div');
        var div = document.createElement('div');
        var button = document.createElement('button');
        var formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check ' + filter.class;
        formCheckDiv.id = 'form-check-' + index;
        accordion.className = 'accordion-item';
        accordion.id = 'accordion-' + index;
        button.className = 'accordion-button h2';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', '#panelsStayOpen-collapse-' + index);
        button.setAttribute('aria-controls', 'panelsStayOpen-collapse-' + index);
        button.textContent = filter.label;
        div.className = 'accordion-collapse collapse ';
        div.id = 'panelsStayOpen-collapse-' + index;
        document.getElementById('filters').appendChild(accordion);
        document.getElementById('accordion-' + index).appendChild(button);
        document.getElementById('accordion-' + index).appendChild(div);
        if (filter.isSearchable) {
            var input = document.createElement('input');
            input.type = 'text';
            input.id = 'search_' + filter.label.split(' ').join('_').toLowerCase();
            input.className = 'form-control shadow-none mt-2';
            input.placeholder = filter.placeholder;
            input.setAttribute('onkeyup', filter.searchEvent);
            document.getElementById('panelsStayOpen-collapse-' + index).appendChild(input);
        }
        document.getElementById('panelsStayOpen-collapse-' + index).appendChild(formCheckDiv);
        if (filter.items && filter.items.length) {
            createCheckboxes(filter.label, index, filter.items);
        }
    }
};

const searchColor = (label) => {
    let index = filters.findIndex(item => item.label === label);
    let text = document.getElementById('search_color').value.toLowerCase();
    let result = [];
    result = colors.filter((item) => item.toLowerCase().includes(text));
    createCheckboxes(label, index, result);
}

const searchMake = (label) => {
    let index = filters.findIndex(item => item.label === label);
    let text = document.getElementById('search_make').value.toLowerCase();
    let result = [];
    result = makes.filter((item) => item.toLowerCase().includes(text));
    createCheckboxes(label, index, result);
}
const searchCity = (label) => {
    let index = filters.findIndex(item => item.label === label);
    let text = document.getElementById('search_city').value.toLowerCase();
    let result = [];
    result = registeredIn.filter((item) => item.toLowerCase().includes(text));
    createCheckboxes(label, index, result);
}

const searchRegisteredIn = (label) => {
    let index = filters.findIndex(item => item.label === label);
    let text = document.getElementById('search_registered_in').value.toLowerCase();
    let result = [];
    result = registeredIn.filter((item) => item.toLowerCase().includes(text));
    createCheckboxes(label, index, result);
}
const searchModelCategory = (label) => {
    let index = filters.findIndex(item => item.label === label);
    let text = document.getElementById('search_model_category').value.toLowerCase();
    let result = [];
    result = modelCategory.filter((item) => item.toLowerCase().includes(text));
    createCheckboxes(label, index, result);
}

const createCheckboxes = (filter, index, arr) => {
    document.getElementById('form-check-' + index).innerHTML = '';
    let Elements = document.createDocumentFragment();
    for (let [index1, item] of arr.entries()) {
        var checkbox = document.createElement("input");
        var label = document.createElement("label");
        var br = document.createElement("br");
        checkbox.id = filter.charAt(0) + '_' + item.toLowerCase();
        checkbox.name = filter.split(' ').join('_').toLowerCase();
        checkbox.className = 'form-check-input me-2';
        checkbox.value = item.toLowerCase();
        checkbox.type = 'checkbox';
        checkbox.setAttribute('onclick', "getCheckedFilters()")
        label.htmlFor = filter.charAt(0) + '_' + item.toLowerCase();
        label.className = 'form-check-label';
        label.textContent = item.replace(/\b(\w)/g, s => s.toUpperCase());
        Elements.appendChild(checkbox);
        Elements.appendChild(label);
        Elements.appendChild(br);
    }
    if (!arr.length) {
        var div = document.createElement('div');
        div.className = 'text-center pt-2';
        div.textContent = 'Sorry No Result Found';
        Elements.appendChild(div);
    }
    document.getElementById('form-check-' + index).appendChild(Elements);
}
let checkedFilters = [];
const getCheckedFilters = () => {
    var checkboxes = document.querySelectorAll('input[type="checkbox"');
    checkboxes.forEach((item) => {
        if (item.checked) {
            checkedFilters[item.name] = { filter: item.value, selected: item.checked }
        }
    })
    selectedFilterResult(checkedFilters);
}
let selectedFilterResult = (arr) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let result = [];
    data.filter((item) => {
        if (arr['city'] && item.city === arr['city'].filter) {
            result.push(item);
        }
        if (arr['province'] && item.province === arr['province'].filter) {
            result.push(item);
        }
        if (arr['make'] && item.make === arr['make'].filter) {
            result.push(item);
        }
        if (arr['registered_in'] && item.registered_in === arr['registered_in'].filter) {
            result.push(item);
        }
        if (arr['trusted_cars'] && item.certification === arr['trusted_cars'].filter) {
            result.push(item);
        }
        if (arr['transmission'] && item.transmission === arr['transmission'].filter) {
            result.push(item);
        }
        if (arr['color'] && item.color === arr['color'].filter) {
            result.push(item);
        }
        if (arr['engine_type'] && item.engine_type === arr['engine_type'].filter) {
            result.push(item);
        }
        if (arr['assembly'] && item.assembly === arr['assembly'].filter) {
            result.push(item);
        }
        if (arr['model_category'] && item.model_category === arr['model_category'].filter) {
            result.push(item);
        }
        if (arr['seller_type'] && item.seller_type === arr['seller_type'].filter) {
            result.push(item);
        }
    })
    showListData([...new Set(result)], checkedFilters);
}

const createSelectOptions = () => {
    for (let make of makes) {
        var option = document.createElement('option');
        option.textContent = make;
        option.value = make.toLowerCase();
        document.getElementById('make_data_list').appendChild(option);
    }
    for (let r of registeredIn) {
        var option = document.createElement('option');
        option.textContent = r;
        option.value = r.toLowerCase();
        document.getElementById('registered_in_data_list').appendChild(option);
    }
    for (let city of registeredIn) {
        var option = document.createElement('option');
        option.textContent = city;
        option.value = city.toLowerCase();
        document.getElementById('city_data_list').appendChild(option);
    }
    for (let province of provinces) {
        var option = document.createElement('option');
        option.textContent = province;
        option.value = province.toLowerCase();
        document.getElementById('province_data_list').appendChild(option);
    }
    for (let c of trustedCars) {
        var option = document.createElement('option');
        option.textContent = c;
        option.value = c.toLowerCase();
        document.getElementById('certification_data_list').appendChild(option);
    }
    for (let t of transmission) {
        var option = document.createElement('option');
        option.textContent = t;
        option.value = t.toLowerCase();
        document.getElementById('transmission_data_list').appendChild(option);
    }
    for (let item of engineTypes) {
        var option = document.createElement('option');
        option.textContent = item;
        option.value = item.toLowerCase();
        document.getElementById('engine_type_data_list').appendChild(option);
    }
    for (let item of colors) {
        var option = document.createElement('option');
        option.textContent = item;
        option.value = item.toLowerCase();
        document.getElementById('color_data_list').appendChild(option);
    }
    for (let item of assembly) {
        var option = document.createElement('option');
        option.textContent = item;
        option.value = item.toLowerCase();
        document.getElementById('assembly_data_list').appendChild(option);
    }
    for (let item of modelCategory) {
        var option = document.createElement('option');
        option.textContent = item;
        option.value = item.toLowerCase();
        document.getElementById('model_category_data_list').appendChild(option);
    }
    for (let item of sellerType) {
        var option = document.createElement('option');
        option.textContent = item;
        option.value = item.toLowerCase();
        document.getElementById('seller_type_data_list').appendChild(option);
    }
}
let add = () => {
    let array = [];
    let data = {
        car_name: document.getElementById('car_name').value ?? '',
        make: document.querySelector('.js-example-basic-single').value ?? '',
        engine_capacity: document.getElementById('engine_cc').value ?? '',
        model_year: document.getElementById('model_year').value ?? '',
        price: document.getElementById('price').value ?? '',
        mileage: document.getElementById('mileage').value ?? '',
        registered_in: document.querySelector('.registered-in-select2').value ?? '',
        city: document.querySelector('.city-select2').value ?? '',
        province: document.querySelector('.province-select2').value ?? '',
        certification: document.querySelector('.certification-select2').value ?? '',
        transmission: document.querySelector('.transmission-select2').value ?? '',
        engine_type: document.querySelector('.engine-type-select2').value ?? '',
        color: document.querySelector('.color-select2').value ?? '',
        assembly: document.querySelector('.assembly-select2').value ?? '',
        model_category: document.querySelector('.model-category-select2').value ?? '',
        seller_type: document.querySelector('.seller-type-select2').value ?? '',
        is_featured: document.querySelector('#is_featured').checked ?? '',
        pictures: [] ?? [],
    }

    var files = document.getElementById('pictures').files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
        if (!f.type.match('image.*')) {
            return;
        }
        // data.pictures.push(URL.createObjectURL(f));
        var reader = new FileReader();
        reader.onload = (e) => {
            data.pictures.push(e.target.result);
        }
        reader.readAsDataURL(f);
    });
    // return console.log(data);

    if (localStorage.getItem('data') !== '' && localStorage.getItem('data') !== null) {
        array = JSON.parse(localStorage.getItem('data'));
    } else {
        array = [];
    }
    let validated = validateForm(data);
    if (validated) {
        setTimeout(() => {
            array.push(data);
            localStorage.setItem('data', JSON.stringify(array));
        },100);
    }
}

let validateForm = (data) => {
    if (
        data.car_name !== '' &&
        data.make !== 'Select Make' &&
        data.engine_capacity !== '' &&
        data.model_year !== '' &&
        data.price !== '' &&
        data.mileage !== '' &&
        data.registered_in !== 'Select Registered City' &&
        data.city !== 'Select City' &&
        data.province !== 'Select Province' &&
        data.certification !== 'Select Certification' &&
        data.transmission !== 'Select Transmission' &&
        data.engine_type !== 'Select Engine Type' &&
        data.color !== 'Select Color' &&
        data.assembly !== 'Select Assembly' &&
        data.model_category !== 'Select Model Category' &&
        data.seller_type !== 'Select Seller Type'
        // data.pictures.length
    ) {
        return true;
    }
    else {
        alert('please fill all the fields');
        return false;
    }
}
let engineTypes = [
    'CNG',
    'Diesel',
    'Electric',
    'Hybrid',
    'Lpg',
    'Petrol',
];
let makes = [
    'Toyota',
    'Suzuki',
    'Honda',
    'Daihatsu',
    'Adam',
    'Alfa Romeo',
    'Audi',
    'Austin',
    'BAIC',
    'BMW',
    'Bentley',
    'Buick',
    'Cadillac',
    'Changan',
    'Chery',
    'Chevrolet',
    'Chrysler',
    'Citroen',
    'Classic Cars',
    'DFSK',
    'Daehan',
    'Daewoo',
    'Datsun',
    'Dodge',
    'FAW',
    'Fiat',
    'Ford',
    'GMC',
    'Geely',
    'Haval',
    'Hino',
    'Hummer',
    'Hyundai',
    'Isuzu',
    'JAC1',
    'JMC',
    'JW Forland',
    'Jaguar',
    'Jeep',
    'KIA',
    'Land Rover',
    'Lexus',
    'MG',
    'MINI',
    'Master',
    'Mazda',
    'Mercedes Benz',
    'Mitsubishi',
    'Mushtaq',
    'Nissan',
    'Opel',
    'Others',
    'Peugeot',
    'Porsche',
    'Prince',
    'Proton',
    'Range Rover',
    'Rinco',
    'Skoda',
    'Sogo',
    'SsangYong',
    'Subaru',
    'Tesla',
    'United',
    'Volkswagen',
    'Volvo',
    'Willys',
    'ZOTYE',

];
let colors = [
    'Air yellow',
    'Angori',
    'Aqua Blue',
    'Aqua Green',
    'BLACK',
    'BLUE',
    'Beige',
    'Black',
    'Blue',
    'Bronze',
    'Brown',
    'Burgundy',
    'GREY',
    'Gold',
    'Golden',
    'Green',
    'Grey',
    'Gun Metalic',
    'Gun Metallic',
    'Gun Mettalic',
    'Gun metalic',
    'Gun metallic',
    'Indigo',
    'MAGNETA',
    'MAROON',
    'Magenta',
    'Magneta',
    'Maroon',
    'Metallic',
    'Metallic Grey',
    'Metallic grey',
    'Modern Steel',
    'Navy',
    'Olive Green',
    'Orange',
    'PEARL WHITE',
    'Pearl Black',
    'Pearl White',
    'Pearl white',
    'Pink',
    'Purple',
    'RED WINE',
    'Red',
    'Red Wine',
    'Red vine',
    'Red wine',
    'Rose Gold',
    'Rose Metallic',
    'Rose Mist',
    'Rose Pink',
    'Rose metallic',
    'SILVER',
    'Shalimar Rose',
    'Silver',
    'Sky Blue',
    'Sky blue',
    'Smoke Green',
    'Strong Blue',
    'TURQOUISE',
    'Trim',
    'Turquoise',
    'UNLISTED',
    'Unlisted',
    'Urban Titanium',
    'Urban titanium',
    'WHITE',
    'White',
    'Wine Red',
    'Yellow',
    'black',
    'bottle green',
    'dark green',
    'electric blue',
    'golden',
    'gun metalic',
    'gun metallic',
    'ice blue',
    'levinder',
    'light blue',
    'light green',
    'metallic',
    'olive green',
    'pearl white',
    'red wine',
    'rich espresso',
    'rose gold',
    'rose mist',
    'sea green',
    'shimmering green',
    'silver',
    'sky blue',
    'smoke green',
    'urban tatanium',
    'urban titanium',
];
let trustedCars = [
    'PakWheels Inspected',
    'PakWheels Certified',
    'Auction Sheet Verified',
    'Managed by PakWheels',

];
let provinces = [
    'Punjab',
    'Sindh',
    'KPK',
    'Balochistan',
    'Azad Kashmir',
];

let registeredIn = [
    'Karachi',
    'Quetta',
    'Islamabad',
    'Peshawar',
    'Rawalpindi',
    'Lahore',
    'Abbottabad',
    'Adda jahan khan',
    'Adda shaiwala',
    'Arifwala',
    'Attock',
    'Badin',
    'Bahawalnagar',
    'Bahawalpur',
    'Balakot',
    'Bannu',
    'Bat khela',
    'Batang',
    'Bhakkar',
    'Bhalwal',
    'Bhimber',
    'Buner',
    'Burewala',
    'Chakwal',
    'Charsadda',
    'Chenab Nagar',
    'Chichawatni',
    'Chiniot',
    'Chishtian',
    'D.G.Khan',
    'Dera ismail khan',
    'Dir',
    'Faisalabad',
    'Farooqabad',
    'Gilgit',
    'Gojra',
    'Gujar Khan',
    'Gujranwala',
    'Gujrat',
    'Hafizabad',
    'Haripur',
    'Haroonabad',
    'Hasilpur',
    'Hub-Balochistan',
    'Hyderabad',
    'Iskandarabad',
    'Jhang',
    'Jhelum',
    'Karak',
    'Kashmir',
    'Kasur',
    'Khanewal',
    'Khushab',
    'Khuzdar',
    'Kohat',
    'Kotli Ak',
    'Lakki marwat',
    'Larkana',
    'Lasbela',
    'Layyah',
    'Lower Dir',
    'Malakand Agency',
    'Mandi bahauddin',
    'Mansehra',
    'Mardan',
    'Mian Wali',
    'Mirpur A.K',
    'Mirpur khas',
    'Multan',
    'Muzaffar Gargh',
    'Muzaffarabad1',
    'Narowal',
    'Nawabshah',
    'Nowshera',
    'Nowshera cantt',
    'Okara',
    'Other',
    'Pak pattan sharif',
    'Pattoki',
    'Pindi Bhattian',
    'Rahim Yar Khan',
    'Rajanpur',
    'Sadiqabad',
    'Sahiwal',
    'Sargodha',
    'Sheikhupura',
    'Sialkot',
    'Sibi',
    'Skardu',
    'Sukkur',
    'Swabi',
    'Swat',
    'Tando Allah Yar',
    'Taxila',
    'Toba Tek Singh',
    'Un-Registered',
    'Vehari',
    'Wah cantt',
    'Wazirabad',
];

let transmission = [
    'Automatic',
    'Manual'
];
let assembly = [
    'Local',
    'Imported'
];

let modelCategory = [
    'Big',
    'Small',
    'Luxury',
    'Old',
    'Family Cars',
    'Low Mileage',
    'Low Priced',
    'Jeep',
    'Cheap',
    'Commercial',
    'Carry Daba ',
    'Electric',
    'Exotic',
    'Modified',
    'Sports',
    'Custom Auction',
    'Duplicate Book',
    'Duplicate File',
    'Amnesty Scheme',
    'Duplicate Number Plate',
    'Army Auction Jeep',
    'Urgent',
    'Police Auction',
    'Superdari',
    'Bank Auction',
];
let sellerType = [
    'Individuals',
    'Dealers'
];
let filters = [
    {
        label: 'City',
        class: 'accordion-height ms-3',
        isSearchable: true,
        placeholder: 'e.g. Lahore',
        searchEvent: 'searchCity("City")',
        items: [...registeredIn]
    },
    {
        label: 'Province',
        class: 'ms-3',
        items: [...provinces]
    },
    {
        label: 'Make',
        class: 'accordion-height ms-3',
        isSearchable: true,
        placeholder: 'e.g. Toyota',
        searchEvent: 'searchMake("Make")',
        items: [...makes]
    },
    {
        label: 'Registered In',
        class: 'accordion-height ms-3',
        isSearchable: true,
        placeholder: 'e.g, Lahore',
        searchEvent: 'searchRegisteredIn("Registered In")',
        items: [...registeredIn]
    },
    {
        label: 'Trusted Cars',
        class: 'ms-3',
        items: [...trustedCars]
    },
    {
        label: 'Transmission',
        class: 'ms-3',
        items: [...transmission]
    },
    {
        label: 'Color',
        class: 'accordion-height ms-3',
        isSearchable: true,
        placeholder: 'e.g, White',
        searchEvent: 'searchColor("Color")',
        items: [...colors]
    },
    {
        label: 'Engine Type',
        class: 'ms-3',
        items: [...engineTypes]
    },
    {
        label: 'Assembly',
        class: 'ms-3',
        items: [...assembly]
    },
    {
        label: 'Model Category',
        class: 'accordion-height ms-3',
        isSearchable: true,
        placeholder: 'e.g, Family Car',
        searchEvent: 'searchModelCategory("Model Category")',
        items: [...modelCategory]
    },
    {
        label: 'Seller Type',
        class: 'ms-3',
        items: [...sellerType]
    },
    {
        label: 'Picture Availability',
        class: 'ms-3',
        items: ['With Pictures']
    },
    {
        label: 'Ad Type',
        class: 'ms-3',
        items: ['Featured Ads']
    },
];