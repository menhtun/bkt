import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import productsData from './db.json';

const ProductList = () => {
    const [products, setProducts] = useState(productsData.products);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        maSanPham: '',
        tenSanPham: '',
        theLoai: '',
        soLuong: '',
        gia: '',
        ngayNhap: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const sortedProducts = products.sort((a, b) =>
        a.maSanPham.localeCompare(b.maSanPham)
    );

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const newProductData = {
            ...newProduct,
            stt: products.length + 1,
            gia: parseFloat(newProduct.gia),
        };
        setProducts(prev => [...prev, newProductData]);

        handleClose();

        setNewProduct({
            maSanPham: '',
            tenSanPham: '',
            theLoai: '',
            soLuong: '',
            gia: '',
            ngayNhap: ''
        });
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const filteredProducts = sortedProducts.filter(product => {
        const matchesName = product.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.theLoai === selectedCategory : true;
        return matchesName && matchesCategory;
    });

    return (
        <div className="container mt-4">
            <div className="text-center">

                <h2 >Danh Sách Sản Phẩm</h2>
            </div>
            <Button variant="primary" onClick={handleShow}>Thêm Mới</Button>

            <div className="mt-3 mb-3 row">
                <div className="col-md-6">
                    <Form.Group controlId="formSearch">
                        <Form.Label>Tìm Kiếm Theo Tên Sản Phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group controlId="formCategory">
                        <Form.Label>Chọn Thể Loại</Form.Label>
                        <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Tất cả thể loại</option>
                            {productsData.categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Sản Phẩm</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Thể Loại</th>
                            <th>Số Lượng</th>
                            <th>Giá</th>
                            <th>Ngày Nhập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.stt}>
                                <td>{product.stt}</td>
                                <td>{product.maSanPham}</td>
                                <td>{product.tenSanPham}</td>
                                <td>{product.theLoai}</td>
                                <td>{product.soLuong}</td>
                                <td>{product.gia.toLocaleString()} VNĐ</td>
                                <td>{formatDate(product.ngayNhap)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="alert alert-warning mt-3">Không có kết quả</div>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Mới Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMaSanPham">
                            <Form.Label>Mã Sản Phẩm</Form.Label>
                            <Form.Control type="text" name="maSanPham" value={newProduct.maSanPham} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formTenSanPham">
                            <Form.Label>Tên Sản Phẩm</Form.Label>
                            <Form.Control type="text" name="tenSanPham" value={newProduct.tenSanPham} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formTheLoai">
                            <Form.Label>Thể Loại</Form.Label>
                            <Form.Control as="select" name="theLoai" value={newProduct.theLoai} onChange={handleChange} required>
                                <option value="">Chọn thể loại</option>
                                {productsData.categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSoLuong">
                            <Form.Label>Số Lượng</Form.Label>
                            <Form.Control type="number" name="soLuong" value={newProduct.soLuong} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formGia">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number" name="gia" value={newProduct.gia} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formNgayNhap">
                            <Form.Label>Ngày Nhập</Form.Label>
                            <Form.Control type="date" name="ngayNhap" value={newProduct.ngayNhap} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Thêm Sản Phẩm
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductList;