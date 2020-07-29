var searchKey = localStorage.getItem('searchKey');
        var url = `${host}/find_key?name=`;
        var url_Search = url + searchKey;
        var list;
        getAllProductSearch();
        let itemPerPage = 8;
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
                getAllProductSearch()
            }
        }
        function nextPage() {
            if (currentPage < totalPage) {
                currentPage++;
                changeClassPagi()
                getCurrentPage()
                getAllProductSearch()
                ////console.log('currentPage : ', currentPage);

            }
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

        }


        function otherPage(i) {
            currentPage = i;
            changeClassPagi()
            getCurrentPage()
            getAllProductSearch()
        }


        function changeClassPagi() {
            let btnPagination = document.querySelectorAll('#listPage li');
            $('#listPage li').removeClass('active');
            btnPagination[currentPage - 1].classList.add('active')
        }
        function renderListPage() {
            axios.get(`${url_Search}`).then((result) => {
                list = result.data.data;
                totalPage = Math.ceil(list.length / itemPerPage)
                var htmlListPage = `<li class="page-item  active"><a class="page-link" onclick="otherPage(1)">${1}</a></li>`
                for (let i = 2; i <= totalPage; i++) {

                    htmlListPage += `<li class="page-item"><a class="page-link" onclick="otherPage(${i})">${i}</a></li>`
                }
                document.getElementById('listPage').innerHTML = htmlListPage;
            })
            
        }
        function getAllProductSearch() {
            if (searchKey) {
                axios.get(`${url_Search}`)
                    .then((result) => {
                        var list_search = result.data.data;
                        if (result.data.result == "failed") {
                            document.getElementById('api').innerHTML = `<div class="noResult" style="font-size: 2rem; margin: auto;">No Result</div>`;
                        }
                        else {
                            $('#api').empty();
                            list_search.map((item, index) => {
                                if (index >= start && index < end) {
                                    ////console.log(item);
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
                                    </div>`
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        ////console.log(err);
                    })
            }
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