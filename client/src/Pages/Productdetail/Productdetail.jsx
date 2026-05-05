import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Cartcontext/Cartcontext";
import data from "../../Data/data";
import productdetail from "./productdetail.module.css";
import { Link } from "react-router-dom";
import Props from "../../Props/Props";
import cashmethod from '../../Assets/cash-method.png'
import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import descriptionbg1 from '../../Assets/description-bg-01.jpg'
import descriptionbg2 from '../../Assets/story-bg.jpg'
import axios from 'axios'
import Relatedproducts from "../Related Products/Relatedproducts";

const ProductDetail = () => {

  const [active, setActive] = useState(null)

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState('')
  const [error, setError] = useState({})
  const [success, setSuccess] = useState('')

  const validate = () => {

    const newError = {}

    if (!name.trim()) {
      newError.name = 'Name is Required'
    }
    else if (!/^[A-Za-z ]+$/.test(name)) {
      newError.name = 'Invalid Name'
    }

    if (!email.trim()) {
      newError.email = 'Email Address is Required'
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newError.email = 'Invalid Email Address'
    }

    if (!review.trim()) {
      newError.review = 'Review is Required'
    }
    else if (!/^(?!\s*$).{10,500}$/.test(review)) {
      newError.review = 'Invalid Review'
    }

    setError(newError)
    return Object.keys(newError).length === 0

  }

  const handleSubmit = async () => {

    if (validate()) {
      setSuccess('Review Submitted Successfully 🎉')
      setName('')
      setEmail('')
      setReview('')
      try {

        const payload = {
          name :name,
          email: email,
          review: review
        }
        await axios.post(`https://jsonplaceholder.typicode.com/users`, payload)
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      setSuccess('')
    }
  }

  const { _id, category } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = data.find(
      (item) => item._id.toString() === _id
    );
    setProduct(foundProduct);

    if (foundProduct?.variants?.length > 0) {
      setSelectedVariant(foundProduct.variants[0]);
    }

    if (foundProduct) {
      const filtered = data.filter(
        (item) =>
          item.category === foundProduct.category &&
          item._id !== foundProduct._id
      );

      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    }
  }, [_id]);

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({
      id: selectedVariant._id,
      name: product.name,
      image: selectedVariant.image,
      price: Number(selectedVariant.newprice.replace("$", "")),
      quantity: quantity,
    });
  };

  const decorProducts = [2, 4, 9, 10, 11, 12, 13, 14, 15, 16];
  const officeProducts = [2, 3, 5, 6, 7, 11, 12, 13, 14, 15, 16];
  const livingroomProducts = [3, 5, 6, 8, 10, 16];
  const bedroomProducts = [1, 2, 3, 4, 5, 6];

  let availablePages = [];

  if (product) {

    if (decorProducts.includes(product._id)) {
      availablePages.push('Decor');
    }

    if (officeProducts.includes(product._id)) {
      availablePages.push('Office');
    }

    if (livingroomProducts.includes(product._id)) {
      availablePages.push('Living Room');
    }

    if (bedroomProducts.includes(product._id)) {
      availablePages.push('Bedroom');
    }

  }

  const increase = () => {
    setQuantity(quantity + 1)
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const toggle = (id) => {
    setActive(active === id ? null : id)
  }

  return (
  <>
    <div className={productdetail.container}>
      <div className={productdetail.detailleft}>
        <div className={productdetail.mainimage}>
          {selectedVariant && (
            <img src={selectedVariant.image} alt={product.name} />
          )}
        </div>
        <div className={productdetail.subimage}>
        {product.variants
          .filter((item) => item._id !== selectedVariant._id)
          .slice(0, 2)
          .map((item) => (
            <img
              key={item._id}
              src={item.image}
              alt={product.name}
              onClick={() => setSelectedVariant(item)}
            />
          ))}
      </div>
      </div>
      <div className={productdetail.detailright}>

        <div className={productdetail.pagelinks}>
          <Link to={'/'}>Home</Link>/
          <Link to={`/${category}`}>{category}</Link>/
          <span>{product.name}</span>
        </div>

        <div className={productdetail.available}>
          <h4>Available in:</h4>
          <div className={productdetail.availablepages}>
            {availablePages.map((page, index) => (
              <span key={index}>
                <Link to={`/${page}`}>
                  {page}
                </Link>
                {index !== availablePages.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        <h1>{product.name}</h1>

        {selectedVariant && (
          <div className={productdetail.price}>
            <strike style={{color : 'black'}}>{selectedVariant.oldprice}</strike>
            <span style={{color : '#e89c70'}}>{selectedVariant.newprice}</span>
            <span style={{color : 'rgb(58, 58, 58)', fontWeight : '400', fontSize : '12px', marginTop : '8px'}}>& Free Shipping</span>
          </div>
        )}

        <p>{product.description}</p>

        <div className={productdetail.productcolor}>
            {product.variants.map((item) => (
              <div key={item._id}>
                <button className={productdetail.productcolortype} onClick={() => setSelectedVariant(item)}
                  style={{ backgroundColor: item.bgcolor, cursor : 'pointer' }}></button>
              </div>
            ))}
        </div>

        {/* <div className={productdetail.variants}>
          {product.variants.map((variant) => (
            <button
              key={variant._id}
              onClick={() => setSelectedVariant(variant)}
              className={productdetail.variantBtn}
              style={{
                backgroundColor: variant.bgcolor,
                border:
                  selectedVariant?._id === variant._id
                    ? "2px solid black"
                    : "1px solid #ccc",
              }}
            ></button>
          ))}
        </div> */}

        <div className={productdetail.cartbutton}>
          <div className={productdetail.quantity}>
            <button onClick={decrease}>-</button>
            <p>{quantity}</p>
            <button onClick={increase}>+</button>
          </div>
          <div>
            <Link to={'/'}>
              <Props content={'ADD TO CART'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                  col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'6px 16px'} 
                  hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleAddToCart}
              />
            </Link>
          </div>
        </div>

        <div className={productdetail.category}>
            <p>SKU : N/A</p>
            <h6>Category : <span><Link to={`/${category}`}>{category}</Link></span></h6>
        </div>

        <div className={productdetail.checkout}>
          <fieldset>
            <legend>Guaranteed Safe Checkout</legend>
            <div className={productdetail.cashmethod}>
              <img src={cashmethod} alt='cash-method' />
            </div>
          </fieldset>
        </div>

        <div className={productdetail.shipping}>
          <p>Free shipping on orders over $50!</p>
          <div className={productdetail.bulleting}>
            <span><FaCheckCircle /> No-Risk Money Back Guarantee!</span>
            <span><FaCheckCircle /> No Hassle Refunds</span>
            <span><FaCheckCircle /> Secure Payments</span>
          </div>
        </div>

      </div>

      <div className={productdetail.main}>

        <div className={productdetail.description1} onClick={() => toggle('description1')}>
            <h2>DESCRIPTION</h2>
            <h5>{active === 'description1' ? '-' : '+'}</h5>
        </div>
        {active === 'description1' && (
          <div className={productdetail.descriptiondetails}>
            <div className={productdetail.detail1}>
              <h4>A FEW WORS ABOUT THE PRODUCTS</h4>
            </div>
            <div className={productdetail.detail2}>
              <h4>AENEAN PRETIUM, SEM VITAE GRAVIDA TINCIDUNT, JUSTO DIAM TEMPUS MAURIS.</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Proin vestibulum erat leo, id pulvinar lorem maximus sit amet. 
                Quisque mauris sem, sagittis sed blandit eu, varius a tortor. 
                Quisque aliquam ligula sed quam pulvinar, vitae ullamcorper metus imperdiet.
              </p>
            </div>
            <div className={productdetail.detail3}>
              <h4>FEATURES</h4>
              <p>
                Ut at ante diam. Vestibulum tincidunt lacus quis odio iaculis, nec iaculis ipsum hendrerit. 
                Curabitur nec fringilla sem. Nullam at diam et ligula tincidunt luctus. 
                Ut fringilla vitae orci eget suscipit. Etiam ultricies justo ac feugiat dignissim. 
                Suspendisse in ultrices massa.
              </p>
              <div className={productdetail.iconsdescription}>
                <span>
                  <FaCheck /> Etiam eu tortor tempor, malesuada
                </span>
                <span>
                  <FaCheck /> Nunc vitae erat sit amet neque varius consequat
                </span>
                <span>
                  <FaCheck /> Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
            <div className={productdetail.detail4}>
              <img src={descriptionbg1} alt='descriptionbg1' />
            </div>
            <div className={productdetail.detail5}>
              <img src={descriptionbg2} alt='descriptionbg2' />
            </div>
            <div className={productdetail.detail6}>
              <h4>CARE INSTRUCTIONS</h4>
              <div className={productdetail.iconsdescription}>
                <span>
                  <FaCheck /> Etiam eu tortor tempor, malesuada
                </span>
                <span>
                  <FaCheck /> Nunc vitae erat sit amet neque varius consequat
                </span>
                <span>
                  <FaCheck /> Vivamus lobortis posuere ante
                </span>
                <span>
                  <FaCheck /> Morbi nisi diam, cursus non ultricies non
                </span>
                <span>
                  <FaCheck /> Lorem ipsum dolor sit amet
                </span>
              </div>
              <p style={{color : '#e89c70'}}>
                <span style={{color : 'black', fontWeight : '600', fontSize : '14px'}}>NOTE : </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div className={productdetail.detail7}>
              <h4>WARRANTY</h4>
              <h3>In ex nisi, viverra in condimentum in, volutpat vel quam maximus</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Proin vestibulum erat leo, id pulvinar lorem maximus sit amet. 
                Quisque mauris sem, sagittis sed blandit eu.
              </p>
            </div>
            <div className={productdetail.detail8}>
              <div className={productdetail.iconsdescription}>
                <span>
                  <FaCheck /> Etiam eu tortor tempor, malesuada
                </span>
                <span>
                  <FaCheck /> Nunc vitae erat sit amet neque varius sit
                </span>
                <span>
                  <FaCheck /> Phasellus ut orci sit amet nibh gravida sem
                </span>
                <span>
                  <FaCheck /> Fusce convallis eget enim nec placera
                </span>
                <span>
                  <FaCheck /> Vivamus est urna, pellentesque eu luctus
                </span>
                <span>
                  <FaCheck /> Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={productdetail.description2} onClick={() => toggle('description2')}>
            <h2>ADDITIONAL INFORMATION</h2>
            <h5>{active === 'description2' ? '-' : '+'}</h5>
        </div>
        {active === 'description2' && (
          <div style={{display : 'flex', padding : '20px', gap : '3px'}}>
            <h5 style={{fontSize : '16px', fontWeight : '500'}}>Color :</h5>
            <h4 style={{fontSize : '16px', fontWeight : '400', color : 'rgb(58, 58, 58)'}}>Black, Bronze, Gold</h4>
          </div>
        )}

        <div className={productdetail.description3} onClick={() => toggle('description3')} style={{borderBottom : 'none'}}>
            <h2>REVIEWS</h2>
            <h5>{active === 'description3' ? '-' : '+'}</h5>
        </div>
        {active === 'description3' && (
          <div className={productdetail.reviews}>
            <h4>Be the first to review "{product.name}"</h4>
            <p>Your email address will not be published. Required fields are marked *</p>
            <div style={{display : 'flex', gap : '2px', alignItems : 'center'}}>
              <h4>Your Rating * </h4>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      fontSize: '22px',
                      cursor: 'pointer',
                      color: star <= (hover || rating) ? '#e89c70' : '#ccc'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className={productdetail.forminput1}>
              <label htmlFor="review">Your Review *</label>
              <textarea name="message" rows={5} value={review} onChange={(e) => setReview(e.target.value)} placeholder='Enter Your Review *'
                  className={`${productdetail.textbox} ${error.review ? productdetail.errorinput : ''}`} />
                  {error.review && (<p style={{ fontSize: '12px', color: 'red' }}>{error.review}</p>)}
            </div>
            <div className={productdetail.reviewdetail}>
              <div className={productdetail.forminput2}>
                <label htmlFor="name">Name <span style={{ color: 'red', borderBottom: 'none' }}>*</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name *'
                  className={`${productdetail.textbox} ${error.name ? productdetail.errorinput : ''}`} />
                {error.name && (<p style={{ fontSize: '12px', color: 'red' }}>{error.name}</p>)}
                {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
              </div>
              <div className={productdetail.forminput2}>
                <label htmlFor="email">Email <span style={{ color: 'red', borderBottom: 'none' }}>*</span></label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address *'
                  className={`${productdetail.textbox} ${error.email ? productdetail.errorinput : ''}`} />
                {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
              </div>
            </div>
            <div className={productdetail.remember}>
              <input type="checkbox" />
              <span>  Save my name, email, and website in this browser for the next time I comment.</span>
            </div>
            <div>
              <Props content={'SUBMIT'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                    col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                    hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
              />
            </div>
          </div>
        )}

      </div>
    </div>
    <Relatedproducts relatedProducts={relatedProducts} />
  </>
  );
};

export default ProductDetail;