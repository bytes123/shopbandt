import Flickity from "react-flickity-component";
import "./flickity.css";

const flickityOptions = {
  initialIndex: 1,
  pageDots: true,
  freeScroll: true,
  wrapAround: true,
  autoPlay: 1500,
};

function Carousel({ sliders, address }) {
  return (
    <Flickity
      className={"carousel"} // default ''
      elementType={"div"} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {sliders.map((item, index) => {
        return (
          <div className="sliderImg_wrap" key={index}>
            <img
              src={require(`../../public/SlidersImages/Slider${address}/${item}`)}
            />
          </div>
        );
      })}
    </Flickity>
  );
}

export default Carousel;
