import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import SelectedMenus from "../SelectedMenus/SelectedMenus";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Pizza Potpourri Palace | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <SelectedMenus></SelectedMenus>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
