import Hero from '../components/Home/Carousol/Hero';
import Badges from '../components/Home/Badges';
import Category from '../components/Home/Categories/Category';
import Product from '../components/Products/Product';
import DiscountSection from '../components/Home/Discount/DiscountSection';
import DiscountForm from '../components/Home/Discount/DiscountForm';

const Home = () => {
    return (
        <div>
            <Hero />
            <Badges />
            <Category />
            <DiscountSection />
            <Product />
            <DiscountForm />
        </div>
    );
};

export default Home;