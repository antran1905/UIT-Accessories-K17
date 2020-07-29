var list;
                        var productArr = [];
                        getNewProduct(0, 8, 'newProduct1')
                        getNewProduct(9, 17, 'newProduct2')
                        getNewProduct(18, 26, 'newProduct3')
                        function getNewProduct(start, end, idRow) {
                            axios.get(`${host}/list_product_sort`).then((result) => {
                                let list_product = result.data.data
                                list = list_product;
                                list_product.map((item, index) => {
                                    if (index >= start && index < end) {
                                        if (item.amount > 0 && item.status[0] === 'available') {
                                            document.getElementById(idRow).innerHTML += `
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
                                            </div>
                                            `

                                        } else {
                                            //console.log("Hết sản phẩm trong kho hoặc sản phẩm không sẳn sàng");
                                            end++
                                        }
                                    }

                                })
                            })
                        }
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