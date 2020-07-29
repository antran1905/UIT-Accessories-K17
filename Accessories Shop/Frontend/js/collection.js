var list;
        getAllProductPerPageCollection();
        let itemPerPage = 16;
        let currentPage = 1;
        let start = 0;
        let end = itemPerPage;
        let totalPage;
        renderListPage();
        getCurrentPage();

        function prePage() {
            if (currentPage >= 2) {
                currentPage--;
                changeClassPagi()
                getCurrentPage()
                changeClassPagi()
                getAllProductPerPageCollection()
            }
        }
        function nextPage() {
            
            if (currentPage < totalPage) {
                currentPage++;
                changeClassPagi()
                getCurrentPage()
                changeClassPagi()
                getAllProductPerPageCollection()                
            }

            console.log(currentPage,totalPage);
        }

        function getCurrentPage() {
            start = (currentPage - 1) * itemPerPage;
            end = currentPage * itemPerPage;
            if (currentPage === totalPage) {
                $('#liNext').addClass('disabled')
            }
            else {
                $('#liNext').removeClass('disabled')
            }
            if (currentPage > 1) {
                $('#liPre').removeClass("disabled")
            } else {
                $('#liPre').addClass("disabled")
            }
            console.log(currentPage);
        }


        function renderListPage() {
            if (!select) {
                axios.get(`${host}/list_product`).then((result) => {
                    list = result.data.data;
                    totalPage = Math.ceil(list.length / itemPerPage)
                    var htmlListPage = `<li class="page-item  active"><a class="page-link" onclick="otherPage(1)">${1}</a></li>`
                    for (let i = 2; i <= totalPage; i++) {

                        htmlListPage += `<li class="page-item"><a class="page-link" onclick="otherPage(${i})">${i}</a></li>`
                    }
                    document.getElementById('listPage').innerHTML = htmlListPage;
                    console.log('Total page :' + totalPage);
                })

            }
            else {
                axios.get(`${host}/list_product`).then((result) => {
                    list = result.data.data;
                    var arrProduct = [];
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].kind.toUpperCase() === select) {
                            arrProduct.push(list[i]);
                        }
                    }
                    totalPage = Math.ceil(arrProduct.length / itemPerPage)
                    var htmlListPage = `<li class="page-item  active"><a class="page-link" onclick="otherPage(1)">${1}</a></li>`
                    for (let i = 2; i <= totalPage; i++) {

                        htmlListPage += `<li class="page-item"><a class="page-link" onclick="otherPage(${i})">${i}</a></li>`
                    }
                    document.getElementById('listPage').innerHTML = htmlListPage;
                    //console.log('Total page :' + totalPage);
                })

            }



        }
        function otherPage(i) {
            currentPage = i;
            changeClassPagi()
            getCurrentPage()
            getAllProductPerPageCollection()
        }


        function changeClassPagi() {
            let btnPagination = document.querySelectorAll('#listPage li');
            $('#listPage li').removeClass('active');
            btnPagination[currentPage - 1].classList.add('active')
        }

        function getAllProductPerPageCollection() {
            var select = localStorage.getItem('menuItem');
            axios.get(`${host}/list_product`)
                .then((result) => {
                    var list_product = result.data.data;
                    var tableBody = $('#api').empty();
                    list = list_product;
                    //console.log(select);
                    if (!select) {
                        list_product.map((item, index) => {
                            if (index >= start && index < end) {
                                if (item.amount > 0 && item.status[0] === 'available') {
                                    // 26/6 FORMAT PRICE
                                    var tempPrice = item.price.toLocaleString(
                                        'en-US', { minimumFractionDigits: 0 }
                                    );

                                    document.getElementById('api').innerHTML += `
                                        <div class="col-sm-3 pd-30">
                                            <div class="product-inner">
                                                <div class="parent2">
                                                    <a href="./detail.html"  onclick="getIDtoDetail('${item._id}')">
                                                        <img class="img-responsive" src="${item.image_name}">
                                                    </>
                                                </div>
                                                <div class="product-info">
                                                    <div class="product-name">
                                                        <a title="${item.name}" href="./detail.html" tabindex="0" onclick="getIDtoDetail('${item._id}')">
                                                            ${item.name}
                                                        </a>
                                                    </div>
                                                    <span class="price">
                                                        ${item.price}$
                                                    </span>
                                                </div>
                                                <!-- group button -->
                                                <div class="group-button">
                                                    <div class="add-to-wishlist tooltip-1">
                                                        <span class="tooltiptext">Login to use Wishlist</span>
                                                        <a href="/account/login">
                                                            <i class="far fa-heart"></i>
                                                        </a>
                                                    </div>
                                                    <div class="view-details tooltip-1">
                                                        <span class="tooltiptext">View details</span>
                                                        <a href="./detail.html" onclick="getIDtoDetail('${item._id}')">
                                                            <i class="fas fa-search"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-to-cart tooltip-1" >
                                                        <span class="tooltiptext">Add to Cart</span>
                                                            <button name="add" class="add-to-cart-btn" onclick="addtocart('${item._id}')">
                                                                <i class="fas fa-shopping-bag"></i>
                                                            </button>
                                                    </div>
                                                </div>
                                                <!-- group button -->
                                            </div>
                                        </div>`;
                                }
                                else {
                                    ////console.log("San pham khong san sang")
                                }
                            }
                        });
                    }
                    else {
                        var arrProduct = [];
                        for (let i = 0; i < list_product.length; i++) {
                            if (list_product[i].kind.toUpperCase() === select) {
                                arrProduct.push(list_product[i]);
                            }
                        }
                        if (arrProduct.length !== 0) {
                            arrProduct.map((item, index) => {
                                if (index >= start && index < end) {
                                    if (item.amount > 0 && item.status[0] === 'available') {
                                        // 26/6 FORMAT PRICE
                                        var tempPrice = item.price.toLocaleString(
                                            'en-US', { minimumFractionDigits: 0 }
                                        );

                                        document.getElementById('api').innerHTML += `
                                        <div class="col-sm-3 pd-30">
                                            <div class="product-inner">
                                                <div class="parent2">
                                                    <a href="#">
                                                        <img class="img-responsive" src="${item.image_name}">
                                                    </a>
                                                </div>
                                                <div class="product-info">
                                                    <div class="product-name">
                                                        <a title="${item.name}" href="./detail.html" onclick="getIDtoDetail('${item._id}')" tabindex="0">
                                                            ${item.name}
                                                        </a>
                                                    </div>
                                                    <span class="price">
                                                        ${item.price}$
                                                    </span>
                                                </div>
                                                <!-- group button -->
                                                <div class="group-button">
                                                    <div class="add-to-wishlist tooltip-1">
                                                        <span class="tooltiptext">Login to use Wishlist</span>
                                                        <a href="/account/login">
                                                            <i class="far fa-heart"></i>
                                                        </a>
                                                    </div>
                                                    <div class="view-details tooltip-1">
                                                        <span class="tooltiptext">View details</span>
                                                        <a href="./detail.html" onclick="getIDtoDetail('${item._id}')">
                                                            <i class="fas fa-search"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-to-cart tooltip-1" >
                                                        <span class="tooltiptext">Add to Cart</span>
                                                            <button name="add" class="add-to-cart-btn" onclick="addtocart('${item._id}')">
                                                                <i class="fas fa-shopping-bag"></i>
                                                            </button>
                                                    </div>
                                                </div>
                                                <!-- group button -->
                                            </div>
                                        </div>`;
                                    }
                                    else {
                                        // //console.log("San pham khong san sang")
                                    }
                                }
                            });
                        }
                        else {
                            document.getElementById('api').innerHTML = `<div class="noResult" style="font-size: 2rem; margin: auto;">No Result</div>`;
                        }
                    }
                    

                })
        }



        var productArr = [];


        function addtocart(id) {
            tata.success('Successfully', 'Add to cart', {
                position: 'tr',
                closeBtn: true,
                duration: 1000,
                progress: true

            });
            var productbyid = list.find(item => {
                return item._id === id;
            });
            productbyid.count = 1;
            var lcStr = JSON.parse(localStorage.getItem('productCart'));
            if (lcStr) {
                productArr = lcStr;
            }
            if (lcStr !== null) {
                var flag = -1;
                for (let i = 0; i < lcStr.length; i++) {
                    if (productbyid._id === lcStr[i]._id) {
                        productbyid.count = lcStr[i].count;
                        flag = i;
                    }
                }
                if (flag == -1) {
                    productbyid.count = 1;
                }
            }
            if (productArr.length === 0) {
                productArr.push(productbyid);
            }
            else {
                var a = -1;
                for (let i = 0; i < productArr.length; i++) {
                    if (productArr[i]._id === productbyid._id) {
                        productArr[i].count++;
                        a = i;
                        break;
                    }
                }
                if (a == -1) {
                    productArr.push(productbyid);
                }
                else {
                    a = -1;
                }
            }
            document.getElementById('countproduct').innerHTML = productArr.length;
            localStorage.setItem('productCart', JSON.stringify(productArr));
        }
        function getIDtoDetail(id) {
            var idDetail = list.find(item => {
                return item._id === id;
            });
            localStorage.setItem('productDetail', JSON.stringify(idDetail));
        }