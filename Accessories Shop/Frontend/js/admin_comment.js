var listBill;
                        getAllComment();
                        let itemPerPage = 4;
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
                                getAllComment()
                            }
                        }
                        function nextPage() {
                            if (currentPage < totalPage) {
                                currentPage++;
                                changeClassPagi()
                                getCurrentPage()
                                changeClassPagi()
                                getAllComment()
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
                        function getAllComment() {
                            axios.get(`${host}/list_cmt`)
                                .then((result) => {
                                    var list_cmt = result.data.data;
                                    //console.log(list_cmt);
                                    var tableBody = $('#listCommentAdmin').empty();
                                    const content = list_cmt.map((item, index) => {
                                        if (index >= start && index < end) {
                                            axios.get(`${host}/get_product/${item.product_id}`).then((result) => {
                                                document.getElementById('listCommentAdmin').innerHTML += `
                                                <tr>
                                                    <td>${++index}</td>
                                                    <td>${item.name}</td>
                                                    <td>${item.email}</td>
                                                    <td>${item.info}</td>
                                                    <td>${item.rating}<i class="fas fa-star" style="color : #ffc107"></i></td>
                                                    <td> <img src="${result.data.data.image_name}" alt="Product"  style="width:30%" /></td>
                                                    <td><button class="btn btn-danger" onclick="checkDelete('${item._id}')">Xóa</button></td>
                                                </tr>
                                                `;
                                            })


                                        }


                                    });
                                })
                        }


                        function checkDelete(_id) {
                            if (confirm("Bạn có muốn xoá bình luận này ?")) {
                                deleteUser(_id)
                            }
                            else {
                                //console.log("Chọn không xoá bình luận");
                            }
                        }

                        function deleteUser(_id) {
                            var id;
                            listBill.map(item => {
                                if (item._id === _id)
                                    id = _id
                            })
                            axios.delete(`${host}/delete_cmt`, {
                                data: {
                                    id: id
                                }
                            }).then((result) => {
                                //console.log(result.data)
                                alert("Xoá cmt thành công !")
                                getAllComment()
                            })
                        }



                        function renderListPage() {
                            axios.get(`${host}/list_cmt`).then((result) => {
                                listBill = result.data.data;
                                totalPage = Math.ceil(listBill.length / itemPerPage)


                                var htmlListPage = `<li class="page-item  active"><a class="page-link" onclick="otherPage(1)">${1}</a></li>`
                                for (let i = 2; i <= totalPage; i++) {

                                    htmlListPage += `<li class="page-item"><a class="page-link" onclick="otherPage(${i})">${i}</a></li>`
                                }
                                document.getElementById('listPage').innerHTML = htmlListPage;
                                //console.log('Total page :' + totalPage);
                            })
                        }
                        function otherPage(i) {
                            currentPage = i;
                            changeClassPagi()
                            getCurrentPage()
                            getAllComment()
                        }


                        function changeClassPagi() {
                            let btnPagination = document.querySelectorAll('#listPage li');
                            $('#listPage li').removeClass('active');
                            btnPagination[currentPage - 1].classList.add('active')
                        }